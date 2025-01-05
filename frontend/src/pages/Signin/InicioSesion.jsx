import "./InicioSesion.sass";
import iniciosesion from "../../styles/signin";
import { GoogleOutlined } from "@ant-design/icons";
import { Link } from "react-router";
import { Flex, Form, Input, Checkbox, Button, ConfigProvider } from "antd";
const InicioSesion = () => {
  const iniciarSesion = () => {};
  const iniciarSesionError = () => {};
  return (
    <ConfigProvider theme={iniciosesion}>
      <div className="inicio-sesion">
        <Flex
          className="header-inicio-sesion"
          justify="flex-start"
          align="center"
        >
          <h1>FastBoard</h1>
        </Flex>
        <div className="content-inicio-sesion">
          <Flex
            className="block-inicio-sesion"
            justify="center"
            align="center"
            vertical
            wrap
          >
            <h1>Inicio de sesión</h1>
            <Form
              className="form-inicio-sesion"
              name="inicio-sesion"
              labelCol={{ span: 8 }}
              initialValues={{ remember: true }}
              onFinish={iniciarSesion}
              onFinishFailed={iniciarSesionError}
              autoComplete="off"
            >
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su email",
                  },
                ]}
              >
                <Input placeholder="example@email.com" />
              </Form.Item>
              <Form.Item
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor ingrese su contraseña",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Recuerdame</Checkbox>
              </Form.Item>
              <Form.Item>
                <Link to="/landing-user">
                  <Button size="large" type="primary" htmlType="submit">
                    Iniciar sesión
                  </Button>
                </Link>
              </Form.Item>
            </Form>
            <div className="separador">
              <span>o</span>
            </div>
            <div className="google">
              <Button className="btn-google" size="large" type="primary">
                <GoogleOutlined />
              </Button>
            </div>
          </Flex>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default InicioSesion;
