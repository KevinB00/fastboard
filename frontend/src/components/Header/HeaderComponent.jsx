import { Layout, Flex, Anchor, Button } from "antd";
import { Link } from "react-router";
import "./HeaderComponent.sass";

const { Header } = Layout;
const HeaderComponent = () => {
  return (
    <Header className="header">
      <Flex className="flex-header" justify="space-between" align="center">
        <h1>FastBoard</h1>
        <Flex wrap align="center" gap={70}>
          <Anchor
            direction="horizontal"
            items={[
              {
                key: "inicio",
                title: "Soluciones",
                href: "#soluciones",
              },
              {
                key: "recursos",
                title: "Recursos",
                href: "#recursos",
              },
              {
                key: "contacto",
                title: "Contacto",
                href: "#contacto",
              },
            ]}
          />
          <Flex gap="small" align="center">
            <Link to="/inicio-sesion">
              <Button type="primary">Iniciar sesión</Button>
            </Link>
            <Button type="dashed">Registrarse</Button>
          </Flex>
        </Flex>
      </Flex>
    </Header>
  );
};
export default HeaderComponent;
