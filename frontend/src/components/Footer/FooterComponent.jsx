import "./FooterComponent.sass";
import { Flex, Form, Button, Input } from "antd";
import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";

const FooterComponent = () => {
  const validarMensajes = {
    required: "${label} es requerido",
    types: {
      email: "El email no es valido",
    },
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <div className="footer" id="contacto">
      <Flex
        className="flex-footer"
        justify="space-around"
        align="center"
        wrap
      >
        <Flex gap={50} justify="space-around" align="center" wrap vertical>
          <h1>FastBoard</h1>
          <Flex className="flex-form" align="center" wrap>
            <Form
              name="feedback"
              layout="vertical"
              onFinish={onFinish}
              validateMessages={validarMensajes}
            >
              <Form.Item
                className="form-item"
                name="email"
                label="Email"
                rules={[{ type: "email", required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                className="form-item"
                name="feedback"
                label="Feedback"
                rules={[{ required: true }]}
              >
                <Input.TextArea showCount rows={4} cols={40} maxLength={200} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit">Enviar</Button>
              </Form.Item>
            </Form>
          </Flex>
        </Flex>
        <Flex wrap justify="center" align="center" vertical gap={20}>
          <h2>Enlaces de interés</h2>
          <ul className="ul-footer">
            <li>Blog</li>
            <li>Comunidad</li>
            <li>Soporte</li>
          </ul>
          <Flex className="redes" align="center" gap={20} wrap>
            <GithubOutlined className="icon-redes" />
            <LinkedinOutlined className="icon-redes" />
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

export default FooterComponent;
