import { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Flex,
  Avatar,
  Modal,
  Form,
  Input,
  DatePicker,
  ConfigProvider,
  message,
} from "antd";
import {
  ProjectOutlined,
  PushpinOutlined,
  StarOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Sider, Header, Content } = Layout;
import CardProject from "../../components/CardProject/CardProject";
import "./LandingUser.sass";
import axios from "axios";
import modalCrearProyecto from "../../styles/modalCrearProyecto";
import createProject from "../../services/projects/create";

const LandingUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/projects/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProjects();
  }, []);

  const showFormulario = () => {
    setOpen(true);
  };

  const handCrearProyecto = async () => {
    try {
      const values = await form.validateFields();
      const response = await createProject(values);
      setConfirmLoading(true);
      setTimeout(() => {
        if (response === "error") {
          message.error("Error al crear el proyecto");
          setConfirmLoading(false);
          setOpen(false);
          form.resetFields();
        } else {
          setProjects([...projects, response]);
          message.success("Proyecto creado exitosamente");
          setConfirmLoading(false);
          setOpen(false);
          form.resetFields();
        }
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
  };
  return (
    <Layout className="layout-user">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h1>FastBoard</h1>
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <ProjectOutlined />,
              label: "Proyectos",
            },
            {
              key: "2",
              icon: <PushpinOutlined />,
              label: "Tareas",
            },
            {
              key: "3",
              icon: <StarOutlined />,
              label: "Marcados",
            },
            {
              key: "4",
              icon: <TeamOutlined />,
              label: "Colaboradores",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header className="header-layout">
          <Flex
            className="flex-header-layout"
            align="center"
            justify="space-between"
          >
            <Button
              className="btn-collapse"
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />
            <Avatar
              className="avatar"
              size={{
                xs: 24,
                sm: 32,
                md: 30,
                lg: 34,
                xl: 40,
                xxl: 40,
              }}
              icon={<UserOutlined />}
            />
          </Flex>
        </Header>
        <Content
          className="content-layout"
          style={{
            backgroundColor: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
            borderRadius: 10,
            color: "#000",
          }}
        >
          <Flex align="center" justify="flex-end" wrap>
            <Button type="primary" onClick={showFormulario}>
              Crear proyecto
            </Button>
            <ConfigProvider theme={modalCrearProyecto}>
              <Modal
                title="Crear proyecto"
                open={open}
                onOk={handCrearProyecto}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okButtonProps={{ form: "form_crear_proyecto", key: "submit" }}
              >
                <Form
                  form={form}
                  id="form_crear_proyecto"
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 14 }}
                  layout="horizontal"
                  name="form_crear_proyecto"
                >
                  <Form.Item
                    label="Título"
                    name="title"
                    rules={[
                      { required: true, message: "El título es obligatorio" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Descripción" name="description">
                    <Input />
                  </Form.Item>
                  <Form.Item label="FechaFin" name="fechaFin">
                    <DatePicker format={"YYYY-MM-DD"} />
                  </Form.Item>
                </Form>
              </Modal>
            </ConfigProvider>
          </Flex>
          <div className="project-list">
            {projects.length > 0 ? (
              projects.map((project) => (
                <CardProject
                  key={project.id}
                  id={project.id}
                  title={project.titulo}
                  description={project.descripcion}
                  usuariocreador={project.usuariocreador}
                />
              ))
            ) : (
              <p>No hay proyectos creados</p>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default LandingUser;
