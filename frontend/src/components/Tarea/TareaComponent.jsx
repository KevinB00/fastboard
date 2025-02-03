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
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import modalCrearProyecto from "../../styles/modalCrearProyecto";

import "./TareaComponent.sass";
import { useState, useEffect } from "react";
import axios from "axios";

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
  const [newStep] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    const fetchSteps = async () => {
      try {
        const response = await axios.get(`/api/pasos/tarea/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSteps(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSteps();
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
      setSteps([...steps, response.data]);
      newStep.resetFields();
      message.success("Paso creado exitosamente");
      setOpenStep(false);
    } catch (error) {
      console.log(error);
      message.warning("Por favor complete todos los campos obligatorios");
    }
  };

  const estadoTarea = async (current) => {
    try {
      const response = await axios.put(
        `/api/pasos/estado/${steps[current].id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setCurrent(current);
      steps[current].hecho = response.data;
    } catch (error) {
      console.log(error);
      message.error("Error al completar el paso");
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
        onCancel={() => setOpen(false)}
        title={nombre}
        footer={null}
      >
        <Flex
          className="flex-modal-tarea"
          justify="space-around"
          align="center"
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
      </Modal>
    </List>
  );
};

export default TareaComponent;
