import "./Inicio.sass";
import {
  LineChartOutlined,
  ProjectOutlined,
  ScheduleOutlined,
  WechatOutlined,
  FolderOpenFilled,
  SettingOutlined,
  GithubOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Flex, Card, List, Tree } from "antd";
import HeaderComponent from "../../components/Header/HeaderComponent";
import FooterComponent from "../../components/Footer/FooterComponent";

const treeHerramientas = [
  {
    title: "Frontend",
    key: "frontend",
    children: [
      {
        title: "React",
        key: "react",
      },
      {
        title: "Ant Design",
        key: "ant-design",
      },
      {
        title: "Sass",
        key: "sass",
      },
    ],
  },
  {
    title: "Backend",
    key: "backend",
    children: [
      {
        title: "Spring Boot",
        key: "spring-boot",
      },
      {
        title: "Java",
        key: "java",
      },
      {
        title: "PostgreSQL",
        key: "postgresql",
      },
    ],
  },
];

function Inicio() {
  return (
    <Layout>
      <HeaderComponent />
      <div className="portada">
        <Flex className="flex-portada" justify="center" align="center" vertical>
          <h1>FastBoard</h1>
          <p>Crea tus propios proyectos de forma rápida y sencilla</p>
        </Flex>
      </div>
      <div className="soluciones" id="soluciones">
        <Flex
          wrap
          className="flex-soluciones"
          justify="space-around"
          align="center"
        >
          <Card
            title="Productivo"
            className="card-solucion"
            extra={<LineChartOutlined className="icon-solucion" />}
            style={{ width: 300 }}
          >
            <p>
              Podrás crear y gestionar tus proyectos con facilidad y rapidez
            </p>
          </Card>
          <Card
            title="Espacios de trabajo"
            className="card-espacios"
            extra={<ProjectOutlined className="icon-solucion" />}
            style={{ width: 300 }}
          >
            <p>
              Cada proyecto tiene su panel dónde podras gestionar sus tareas de
              manera sencilla e intuitiva
            </p>
          </Card>
          <Card
            title="Panel de seguimiento"
            className="card-panel"
            extra={<ScheduleOutlined className="icon-solucion" />}
            style={{ width: 300 }}
          >
            <p>
              Cada tarea tiene su panel de seguimiento donde podras ver el
              avance y progresos
            </p>
          </Card>
        </Flex>
        <Flex
          wrap
          className="flex-colaboradores"
          justify="space-around"
          align="center"
        >
          <Card
            title="Colaboradores"
            className="card-colaboradores"
            extra={<WechatOutlined className="icon-colaboradores" />}
          >
            <p>
              Podrás compartir tus proyectos añadiendo a personas a tu equipo,
              ademas podrás recibir notificaciones de tus tareas, mensajes y
              progresos que realizen otras personas en tu proyecto
            </p>
          </Card>
        </Flex>
      </div>
      <div className="recursos" id="recursos">
        <Flex
          wrap
          className="flex-recursos"
          justify="space-around"
          align="center"
          gap={50}
          vertical
        >
          <h1>Recursos</h1>

          <List
            className="list-recursos"
            itemLayout="horizontal"
            dataSource={[
              "Documentación",
              "Herramientas utilizadas",
              "Repositorio",
            ]}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item}
                  avatar={
                    item === "Documentación" ? (
                      <FolderOpenFilled className="icon-recursos" />
                    ) : item === "Herramientas utilizadas" ? (
                      <SettingOutlined className="icon-recursos" />
                    ) : (
                      <GithubOutlined className="icon-recursos" />
                    )
                  }
                  description={
                    item === "Documentación" ? (
                      <a href="#" target="_blank">
                        Visitar
                      </a>
                    ) : item === "Herramientas utilizadas" ? (
                      <Tree
                        className="tree-recursos"
                        showLine
                        switcherIcon={<DownOutlined />}
                        treeData={treeHerramientas}
                      ></Tree>
                    ) : (
                      <a
                        href="https://github.com/KevinB00/fastboard.git"
                        target="_blank"
                      >
                        Visitar
                      </a>
                    )
                  }
                />
              </List.Item>
            )}
          />
        </Flex>
      </div>
      <FooterComponent />
    </Layout>
  );
}

export default Inicio;
