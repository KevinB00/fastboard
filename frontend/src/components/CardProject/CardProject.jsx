import "./CardProject.sass";
import { Button, Card, ConfigProvider, Form, Input, Modal, message } from "antd";
import { StarFilled, StarOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
export const CardProject = ({ id, title, description, usuariocreador, marcado }) => {
  CardProject.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    usuariocreador: PropTypes.number,
    marcado: PropTypes.bool,
  };
  const navigate = useNavigate();
  const [creador, setCreador] = useState("");
  const [proyectoMarcado, setMarcado] = useState(marcado);
  const [eliminar, setEliminar] = useState(false);
  const [deleteProject] = Form.useForm();

  useEffect(() => {
    const nombreCreador = async () => {
      try {
        const response = await axios.get(`/api/auth/${usuariocreador}`);
        setCreador(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    nombreCreador();
  }, []);

  const modalEliminar = () => {
    setEliminar(true);
  }
  const cancelar = () => {
    setEliminar(false);
  }
  const marcar = async () => {
    try {
      const response = await axios.put(
        `/api/projects/marcado/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMarcado(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const comprobar = async () => {
    const titulo = deleteProject.getFieldValue("tituloProyecto");
    if (titulo === title) {
      try {
        const response = await axios.delete(`/api/projects/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setEliminar(false);
        message.success("Proyecto eliminado correctamente.");
      } catch (error) {
        message.error("Error al eliminar el proyecto.");
        console.log(error);
      }
    } else {
      message.error("El título no coincide con el del proyecto.");
    }
  }
  return (
  <ConfigProvider
    theme={{
      components: {
        Button: {
          defaultHoverColor: "#ff0000"
        }
      }
    }}>
      <Card
        className="card-projects"
        actions={[
          <Button
            key="marcarProyecto"
            id="proyectoMarcado"
            onClick={marcar}
            icon={proyectoMarcado ? <StarFilled /> : <StarOutlined />}
          />,
          <Button
            key= "eliminar"
            id="eliminar"
            onClick={modalEliminar}
            icon={<DeleteOutlined />}
          />,
        ]}
      >
        <Card.Meta
          onClick={() => navigate(`/project/${id}`)}
          title={title}
          description={description}
        ></Card.Meta>
        <p className="creador">Creador: {creador}</p>
      </Card>
      <Modal
        open={eliminar}
        title="Eliminar Proyecto"
        onOk={comprobar}
        onCancel={cancelar}
        >
          <p>Escribe el título del proyecto para eliminarlo: </p>
          <Form form={deleteProject} layout="vertical">
            <Form.Item
              name="tituloProyecto"
              rules={[
                {
                  required: true,
                  message: "Por favor, introduce el título del proyecto.",
                },
              ]}
            >
              <Input placeholder="Título del proyecto" />
            </Form.Item>
          </Form>
        </Modal>
    </ConfigProvider>
  );
};

export default CardProject;
