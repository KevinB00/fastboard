import { Layout, Flex, Anchor, Button } from "antd";
import "./HeaderComponent.sass";

const { Header } = Layout;
export const HeaderComponent = () => {

  return (
      <Header className="header">
        <Flex className="flex-header" justify="space-between" align="center">
            <h1>FastBoard</h1>
            <Flex align="center" gap={70}>
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
                <Button type="primary">Iniciar sesión</Button>
                <Button type="dashed">Registrarse</Button>
              </Flex>
            </Flex>
        </Flex>
      </Header>
  );
};
