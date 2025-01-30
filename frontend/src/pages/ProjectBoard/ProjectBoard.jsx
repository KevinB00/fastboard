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
import { useParams } from "react-router";
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
  return (
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
          <Flex className="flex-listas" justify="center" align="center" wrap>
              {listas.length > 0 ? (
                listas.map((lista) => (
                  <CardLista
                    key={lista.id}
                    id={lista.id}
                    nombre={lista.nombre}
                  />
                ))
              ) : (
                  <h1>Aún no hay listas en este proyecto</h1>
              )}
          </Flex>
        </Content>
      </ConfigProvider>
    </Layout>
  );
};

export default ProjectBoard;
