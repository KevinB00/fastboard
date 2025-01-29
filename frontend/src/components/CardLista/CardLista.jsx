import { Card } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import "./CardLista.sass";

const CardLista = () => {
  return (
    <Card
      className="card-lista"
      title="Listas"
      extra={
        <PlusSquareOutlined
          className="icon-lista"
          onClick={() => {}}
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
    ></Card>
  );
};

export default CardLista;
