import { List, Button, Flex } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

import "./TareaComponent.sass";

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

  return (
    <List itemLayout="vertical">
      <List.Item className="tarea" key={id}>
        <List.Item.Meta
          className="meta-tarea"
          title={nombre}
          description={"Fecha de fin: " + fecha_fin}
        />
        <Flex className="flex-botones-tarea" gap="small" wrap>
          <Button  type="primary">
            <EditOutlined />
          </Button>
          <Button color="danger" variant="outline">
            <DeleteOutlined />
          </Button>
        </Flex>
      </List.Item>
      <div></div>
    </List>
  );
};

export default TareaComponent;
