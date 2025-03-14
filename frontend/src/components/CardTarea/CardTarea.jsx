import PropTypes from "prop-types";
import "./CardTarea.sass";

export const CardTarea = ({id, titulo, descripcion, fechaFin, etiquetas}) => {
CardTarea.propTypes = {
    id: PropTypes.number,
    titulo: PropTypes.string,
    descripcion: PropTypes.string,
    fechaFin: PropTypes.string,
    etiquetas: PropTypes.array
}

return (
    <div className="card-tarea">
        <h3>{titulo}</h3>
        <p>{descripcion}</p>
        <p>{fechaFin}</p>
        <div className="etiquetas">
            {etiquetas.map((etiqueta) => (
                <p key={etiqueta.id}>{etiqueta.nombre}</p>
            ))}
        </div>
    </div>
)


}
export default CardTarea;