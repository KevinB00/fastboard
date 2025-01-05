import { useState } from "react";
import { Layout, Menu } from "antd"
import { HomeOutlined } from '@ant-design/icons';
const { Sider } = Layout
import "./LandingUser.sass"

const LandingUser = () => {
    const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="logo">
                <h1>FastBoard</h1>
            </div>
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                    {
                        key: '1',
                        icon: <HomeOutlined />
                    }
                ]}
                >

            </Menu>
        </Sider>
    </Layout>
  )
}
export default LandingUser