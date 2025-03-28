import "./CardProject.sass";
import { Button, Card } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";
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

  return (
    <Card
      className="card-projects"
      actions={[
        <Button
          key={id}
          id="proyectoMarcado"
          onClick={marcar}
          icon={proyectoMarcado ? <StarFilled /> : <StarOutlined />}
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
  );
};

export default CardProject;
