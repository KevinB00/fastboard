import { Content, Header } from "antd/es/layout/layout";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import "./ProjectBoard.sass";
import {
  Avatar,
  Button,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Layout,
  message,
  Modal,
} from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { DndContext, useSensor, useSensors, MouseSensor, TouchSensor } from "@dnd-kit/core";
import boardProyecto from "../../styles/boardProyecto";
import modalCrearProyecto from "../../styles/modalCrearProyecto";
import CardLista from "../../components/CardLista/CardLista";
const ProjectBoard = () => {
  const [nombreProyecto, setNombreProyecto] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listas, setListas] = useState([]);
  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      delay: 2000,
      tolerance: 5,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 2000,
      tolerance: 5,
    },
  });
  const sensors = useSensors(mouseSensor, touchSensor);
  

  const fetchListas = async () => {
    try {
      const response = await axios.get(`/api/projects/listas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setListas(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchDatosProyecto = async () => {
      try {
        const response = await axios.get(`/api/projects/project/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setNombreProyecto(response.data.titulo);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDatosProyecto();
    fetchListas();
  }, [id]);

  const handCrearLista = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(
        "/api/projects/lista/create",
        {
          nombre: values.nombre,
          idProyecto: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      try {
        const responseLista = await axios.get(`/api/projects/listas/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setListas(responseLista.data);
      } catch (error) {
        console.log(error);
      }
      console.log(response.data);
      setConfirmLoading(true);
      setTimeout(() => {
        if (response.data === "error") {
          message.error("Error al crear la lista");
          setConfirmLoading(false);
          setOpen(false);
          form.resetFields();
        } else {
          message.success("Lista creada exitosamente");
          setConfirmLoading(false);
          setOpen(false);
          form.resetFields();
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    console.log(active.id, over.id);
    if (active.id !== over.id) {
      try {
        await axios.put(
          `/api/tareas/${active.id}`,
          {
            listaid: over.id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          }
        );
        setListas([]);
        fetchListas();
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Layout className="layout-board">
        <Header className="header">
          <Flex
            className="flex-header-board"
            justify="space-between"
            align="center"
            wrap
          >
            <LeftOutlined
              className="return-icon"
              size={{
                xs: 24,
                sm: 32,
                md: 30,
                lg: 34,
                xl: 40,
                xxl: 40,
              }}
              onClick={() => navigate("/landing-user")}
            />
            <h1>{nombreProyecto}</h1>
            <Avatar
              className="perfil-icon"
              size={{
                xs: 24,
                sm: 32,
                md: 30,
                lg: 34,
                xl: 40,
                xxl: 40,
              }}
              icon={<UserOutlined />}
            />
          </Flex>
        </Header>
        <ConfigProvider theme={boardProyecto}>
          <Content className="content-board">
            <Flex className="flex-board" justify="flex-end" align="center">
              <Button
                onClick={() => setOpen(true)}
                className="crear-lista"
                type="primary"
              >
                Crear lista
              </Button>
            </Flex>
            <Modal
              title="Crear lista"
              open={open}
              onOk={handCrearLista}
              confirmLoading={confirmLoading}
              onCancel={handleCancel}
            >
              <ConfigProvider theme={modalCrearProyecto}>
                <Form form={form} layout="vertical" onFinish={handCrearLista}>
                  <Form.Item
                    label="Nombre de la lista"
                    name="nombre"
                    rules={[
                      {
                        required: true,
                        message: "Por favor ingrese un título",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </Modal>
            <Flex
              className="flex-listas"
              justify="center"
              align="center"
              gap="large"
            >
              {listas.length > 0 ? (
                listas.map((lista) => (
                  <CardLista
                    key={lista.id}
                    id={lista.id}
                    nombre={lista.nombre}
                  />
                ))): (
                  <></>
              )}
            </Flex>
          </Content>
        </ConfigProvider>
      </Layout>
    </DndContext>
  );
};

export default ProjectBoard;
