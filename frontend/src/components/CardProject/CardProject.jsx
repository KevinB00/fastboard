import "./CardProject.sass"
import { Card } from "antd";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
export const CardProject = ({ id, title, description, usuariocreador }) => {
  CardProject.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    usuariocreador: PropTypes.number
  }
  const navigate = useNavigate();
  const [creador, setCreador] = useState("");
  useEffect(() => {
    const nombreCreador = async () => {
      try {
        const response = await axios.get(`/api/auth/${usuariocreador}`);
        setCreador(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    nombreCreador();
  }, [])

  return (
    <Card onClick={() => navigate(`/project/${id}`)} className="card-projects">
      <Card.Meta
        title={title}
        description={description}
      >
      </Card.Meta>
      <p className="creador">Creador: {creador}</p>
    </Card>
  )
}

export default CardProject;