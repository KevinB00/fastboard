import { useEffect, useState } from "react";
import { Layout, Menu, Button, Flex, Avatar } from "antd";
import {
  HomeOutlined,
  ProjectOutlined,
  PushpinOutlined,
  StarOutlined,
  TeamOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
const { Sider, Header, Content } = Layout;
import  CardProject  from "../../components/CardProject/CardProject";
import "./LandingUser.sass";
import axios from "axios";
const LandingUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try{
        const token = localStorage.getItem("token");
        const response = await axios.get(`/api/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjects(response.data);
      }catch(error){
        console.log(error);
      }
    };
    fetchProjects();
        }, []);
      
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
                icon: <HomeOutlined />,
                label: "Inicio",
              },
              {
                key: "2",
                icon: <ProjectOutlined />,
                label: "Proyectos",
              },
              {
                key: "3",
                icon: <PushpinOutlined />,
                label: "Tareas",
              },
              {
                key: "4",
                icon: <StarOutlined />,
                label: "Marcados",
              },
              {
                key: "5",
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
          <Content className="content-layout" style={
            {
              backgroundColor: "#fff",
              padding: 24,
              margin: 0,
              minHeight: 280,
              borderRadius: 10,
              color: "#000"
            }
          }>
            <div className="project-list">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <CardProject
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    creador={project.creador}
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
