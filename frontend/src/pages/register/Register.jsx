import "./Register.sass";
import register from "../../styles/forms";
import { Flex, Form, Input, ConfigProvider, Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import registrar from "../../services/create/user";
const Register = () => {
  const registrarse = (values) => {
    registrar(values);
  };

  const registroError = () => {};
  return (
    <ConfigProvider theme={register}>
      <div className="register">
        <Flex
          className="header-register"
          justify="flex-start"
          align="center"
          wrap
        >
          <h1>FastBoard</h1>
        </Flex>
        <div className="content-register">
          <Flex
            className="block-register"
            justify="center"
            align="center"
            vertical
            wrap
          >
            <h1>Registrarse</h1>
            <Form
              className="form-register"
              name="register"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={registrarse}
              onFinishFailed={registroError}
              autoComplete="off"
            >
              <Flex gap="large" wrap>
                <Form.Item
                  label="Nombre"
                  name="name"
                  rules={[
                    { required: true, message: "Por favor ingresa tu nombre!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Apellido"
                  name="lastName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor ingresa tu apellido!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Flex>
              <Flex gap="middle" justify="flex-start" vertical wrap>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      type: "email",
                      required: true,
                      message: "Por favor ingresa tu email!",
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
                      message: "Por favor ingresa tu contraseña!",
                    },
                    {
                      min: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="Confirmar contraseña"
                  name="confirmPassword"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Por favor confirma tu contraseña!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value && value !== getFieldValue("password")) {
                          return Promise.reject(
                            "Las contraseñas no coinciden!"
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Flex>

              <Flex justify="center" align="center" wrap>
                <Form.Item>
                  <Button
                    className="button-register"
                    block
                    type="primary"
                    htmlType="submit"
                  >
                    Registrarse
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
            <div className="separador">
                <span>o</span>
            </div>
            <div className="google">
                <Button
                    className="button-google"
                    block
                    type="primary"
                    icon={<GoogleOutlined />}
                >
                    Registrarse con Google
                </Button>
            </div>
            <Flex justify="center" align="center" wrap>
              <p>
                ¿Ya tienes una cuenta?{" "}
                <a href="/inicio-sesion">Iniciar sesión</a>
              </p>
            </Flex>
          </Flex>
        </div>
      </div>
    </ConfigProvider>
  );
};
export default Register;
