import "./Inicio.sass";
import { Layout, Flex, Card } from "antd";
import { HeaderComponent } from "../../components/HeaderComponent";

function Inicio() {

  return (
      <Layout>
        <HeaderComponent />
        <div className="portada">
          <Flex className="flex-portada" justify="center" align="center" vertical>
          <h1>FastBoard</h1>
          <p>Crea tus propios proyectos de forma rápida y sencilla</p>
          </Flex>
          <div className="soluciones">
            <Flex className="flex-soluciones" justify="space-around" align="center">
              <Card
                title="Solución 1"
                className="card-solucion"
                style={{ width: 300 }}
              >
                <p>Descripción de la solución 1</p>
              </Card>
              <Card
                title="Solución 2"
                className="card-solucion"
                style={{ width: 300 }}
              >
                <p>Descripción de la solución 2</p>
              </Card>
              <Card
                title="Solución 3"
                className="card-solucion"
                style={{ width: 300 }}
              >
                <p>Descripción de la solución 3</p>
              </Card>
            </Flex>
          </div>
        </div>
      </Layout>

  );
}

export default Inicio;
