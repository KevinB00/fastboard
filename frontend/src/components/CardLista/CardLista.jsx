import {
  Card,
  DatePicker,
  Form,
  Input,
  Modal,
  ConfigProvider,
  Tag,
  message,
} from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import "./CardLista.sass";
import axios from "axios";
import modalCrearProyecto from "../../styles/modalCrearProyecto";
import { useState } from "react";

const CardLista = ({ id, nombre }) => {
  CardLista.propTypes = {
    id: PropTypes.number,
    nombre: PropTypes.string,
  };

  const [open, setOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [form] = Form.useForm();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (tag) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handCrearTarea = async () => {
    try {
      const values = await form.validateFields();
      const response = await axios.post(
        "/api/projects/tarea/create",
        {
          nombre: values.tarea,
          descripcion: values.descripcion,
          fechaInicio: values.fechaInicio,
          fechaFin: values.fechaFin,
          etiquetas: values.etiquetas,
          idLista: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      message.success("Tarea creada exitosamente");
      setOpen(false);
      form.resetFields();
    } catch (error) {
      message.warning("Por favor complete todos los campos obligatorios");
      console.log(error);
    }
  };

  return (
    <Card
      className="card-lista"
      title={nombre}
      extra={
        <PlusSquareOutlined
          className="icon-lista"
          onClick={() => setOpen(true)}
          size={{
            xs: 24,
            sm: 32,
            md: 40,
            lg: 64,
            xl: 80,
            xxl: 100,
          }}
        />
      }
    >
      <Modal
        title="Crear tarea"
        open={open}
        onOk={handCrearTarea}
        onCancel={() => {
          setOpen(false);
          form.resetFields();
        }}
      >
        <ConfigProvider theme={modalCrearProyecto}>
          <Form
            name="nueva-tarea"
            layout="vertical"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Form.Item
              label="Nombre de la tarea"
              name="tarea"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese el nombre de la tarea",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Descripción de la tarea"
              name="descripcion"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Fecha de inicio"
              name="fechaInicio"
              rules={[
                {
                  required: false,
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} />
            </Form.Item>
            <Form.Item
              label="Fecha de finalización"
              name="fechaFin"
              rules={[
                {
                  required: true,
                  message: "Por favor ingrese la fecha de finalización",
                },
              ]}
            >
              <DatePicker format={"YYYY-MM-DD"} />
            </Form.Item>
            <Form.Item
              label="Etiquetas"
              name="etiquetas"
              rules={[
                {
                  required: false,
                  max: 5,
                },
              ]}
            >
              <Input
                value={inputValue}
                onChange={handleInputChange}
                onPressEnter={handleAddTag}
                placeholder="Introduce una etiqueta"
              />
              {tags.map((tag, index) => (
                <Tag key={index} closable onClose={() => handleRemoveTag(tag)}>
                  {tag}
                </Tag>
              ))}
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </Card>
  );
};

export default CardLista;
