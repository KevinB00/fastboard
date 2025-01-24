import "./CardProject.sass"
import { Card } from "antd";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";
export const CardProject = ({ id, title, description, creador }) => {
  CardProject.propTypes = {
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    creador: PropTypes.string
  }
  const navigate = useNavigate();
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