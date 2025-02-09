import {
  List,
  Button,
  Flex,
  Modal,
  Steps,
  Form,
  Input,
  ConfigProvider,
  DatePicker,
  message,
  Tag,
  Divider,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import modalCrearProyecto from "../../styles/modalCrearProyecto";

import "./TareaComponent.sass";
import { useState, useEffect } from "react";
import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const TareaComponent = ({
  id,
  descripcion,
  etiquetas,
  fecha_fin,
  fecha_inicio,
  listaid,
  nombre,
}) => {
  TareaComponent.propTypes = {
    id: PropTypes.number,
    descripcion: PropTypes.string,
    etiquetas: PropTypes.array,
    fecha_fin: PropTypes.string,
    fecha_inicio: PropTypes.string,
    listaid: PropTypes.number,
    nombre: PropTypes.string,
  };

  const [open, setOpen] = useState(false);
  const [openStep, setOpenStep] = useState(false);
  const [openComentarios, setOpenComentarios] = useState(false);
  const [newStep] = Form.useForm();
  const [newComentario] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([]);
  const [comentarios, setComentarios] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get(`/api/pasos/tarea/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSteps(response.data);
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].hecho === false) {
            setCurrent(i);
            break;
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchComentarios = async () => {
      try {
        const response = await axios.get(`/api/comentarios/tarea/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setComentarios(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSteps();
    fetchComentarios();
  }, []);

  const handNewStep = async () => {
    try {
      const values = await newStep.validateFields();
      const response = await axios.post(
        "/api/pasos/create",
        {
          nombre: values.nombre,
          fecha_prevista: values.fecha_prevista,
          tareaid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // Reemplazar array steps por response.data
      setSteps(response.data);
      newStep.resetFields();
      message.success("Paso creado exitosamente");
      setOpenStep(false);
    } catch (error) {
      console.log(error);
      message.warning("Por favor complete todos los campos obligatorios");
    }
  };

  const eliminarPasoActual = async () => {
    try {
      const response = await axios.delete(
        `/api/pasos/delete/${steps[current].id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setSteps(response.data);
      message.success("Paso eliminado exitosamente");
    } catch (error) {
      console.log(error);
      message.warning("No se a podido eliminar el paso");
    }
  };

  const estadoTarea = async (current) => {
    setCurrent(current);
  };

  const handUpdateTarea = async () => {
    try {
      const response = await axios.put(
        `/api/pasos/estado/${id}`,
        {
          idHecho: current,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("Tarea actualizada exitosamente");
      setOpen(false);
    } catch (error) {
      console.log(error);
      message.warning("No se a podido actualizar la tarea");
      setOpen(false);
    }
  };

  const handNewComentario = async () => {
    try {
      const values = await newComentario.validateFields();
      const response = await axios.post(
        "/api/comentarios/create",
        {
          comentario: values.comentario,
          email: localStorage.getItem("email"),
          tareaid: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("Comentario creado exitosamente");
      newComentario.resetFields();
      setOpenComentarios(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <List itemLayout="vertical">
      <List.Item className="tarea" key={id}>
        <List.Item.Meta
          className="meta-tarea"
          title={nombre}
          description={"Fecha de fin: " + fecha_fin}
        />
        <Flex className="flex-botones-tarea" gap="small" wrap>
          <Button onClick={() => setOpen(true)} type="primary">
            <EditOutlined />
          </Button>
          <Button color="danger" variant="outline">
            <DeleteOutlined />
          </Button>
        </Flex>
      </List.Item>
      <div></div>

      <Modal
        open={open}
        onCancel={handUpdateTarea}
        title={nombre}
        footer={null}
      >
        <Flex
          className="flex-modal-tarea"
          justify="space-around"
          align="center"
          gap="large"
          vertical
        >
          <h3>Steps</h3>
          <Flex justify="space-between" gap="large">
            <Steps
              progressDot
              current={current}
              onChange={estadoTarea}
              items={steps.map((step) => ({
                key: step.id,
                title: step.nombre,
                description: step.fecha_prevista,
              }))}
              direction="vertical"
              size="small"
            />
            <Button
              onClick={() => setOpenStep(true)}
              type="primary"
              shape="circle"
            >
              <PlusCircleOutlined />
            </Button>
            <Button
              color="danger"
              variant="outline"
              shape="circle"
              onClick={eliminarPasoActual}
            >
              <DeleteOutlined />
            </Button>
          </Flex>
          <Flex justify="space-between" gap="large">
            <div className="descripcion">
              <h3>Descripción</h3>
              <p>{descripcion}</p>
            </div>
            <div className="etiquetas">
              <h3>Etiquetas</h3>
              {etiquetas.map((etiqueta) => (
                <Tag>{etiqueta}</Tag>
              ))}
            </div>
          </Flex>
          <Flex className="flex-comentarios" justify="center" gap="large">
            <h3>Comentarios</h3>
            <Button
              type="primary"
              onClick={() => setOpenComentarios(true)}
              ghost
            >
              <SendOutlined />
            </Button>
          </Flex>
          <Flex className="flex-comentarios-tarea" justify="space-between" gap="middle" vertical>
            {comentarios.map((comentario) => (
              <>
                <p>{comentario.email}</p>
                <hr style={{opacity: 0.3}} />
                <p>{comentario.comentario}</p>
              </>
            ))}
          </Flex>
        </Flex>
        <Modal
          open={openStep}
          onOk={handNewStep}
          onCancel={() => {
            setOpenStep(false);
            newStep.resetFields();
          }}
          title="Añadir paso"
        >
          <ConfigProvider theme={modalCrearProyecto}>
            <Form form={newStep} layout="vertical">
              <Form.Item
                label="Nombre"
                name="nombre"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Fecha prevista"
                name="fecha_prevista"
                rules={[{ required: true }]}
              >
                <DatePicker format={"YYYY-MM-DD"} />
              </Form.Item>
            </Form>
          </ConfigProvider>
        </Modal>
        <Modal
          open={openComentarios}
          onOk={handNewComentario}
          onCancel={() => {
            setOpenComentarios(false);
            newComentario.resetFields();
          }}
          title="Comentarios"
        >
          <ConfigProvider theme={modalCrearProyecto}>
            <Form form={newComentario} layout="vertical">
              <Form.Item
                label="Comentario"
                name="comentario"
                rules={[{ required: true }]}
              >
                <TextArea />
              </Form.Item>
            </Form>
          </ConfigProvider>
        </Modal>
      </Modal>
    </List>
  );
};

export default TareaComponent;
