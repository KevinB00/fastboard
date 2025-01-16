import "./InicioSesion.sass";
import iniciosesion from "../../styles/forms";
import { GoogleOutlined } from "@ant-design/icons";
import { Flex, Form, Input, Checkbox, Button, ConfigProvider, Alert } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import usuario from "../../services/create/user";
const InicioSesion = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const iniciarSesion = (values) => {
    usuario(values, "login")
      .then((response) => {
        if (response === "success") {
          navigate("/landing-user"); // Si se registro correctamente, se redirige a la pantalla de inicio de usuario
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        setError(true);
      })

  };
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
            <Alert style={{ display: error ? "block" : "none"}} type="warning" message="Error de inicio de sesión, por favor revisa tus credenciales" />
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
              <Flex vertical wrap>
                <Form.Item
                  label="Correo"
                  name="email"
                  rules={[
                    {
                      type: "email",
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
              </Flex>

              <Form.Item>
                  <Button size="large" type="primary" htmlType="submit">
                    Iniciar sesión
                  </Button>
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
