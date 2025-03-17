import PropTypes from "prop-types";
import { Card, Tag } from "antd";
import { useNavigate } from "react-router";
import "./CardTarea.sass";

export const CardTarea = ({id, titulo, descripcion, fechaFin, etiquetas}) => {
CardTarea.propTypes = {
    id: PropTypes.number,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    fechaFin: PropTypes.string,
    etiquetas: PropTypes.array
}

const navigate = useNavigate();
const handOpenTarea = () => {

    navigate(`/project/`)
}
return (
    <Card onClick={handOpenTarea} className="card-tarea">
        <Card.Meta
            title={titulo}
            description={descripcion}
        />
        <p>{fechaFin}</p>
        <div className="etiquetas">
            {etiquetas.map(element => (
                <Tag key={element}>{element}</Tag>
            ))}
        </div>
    </Card>
)


}
export default CardTarea;