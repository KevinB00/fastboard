import { Layout, Flex } from "antd";
import "./HeaderComponent.sass";

const { Header } = Layout;
export const HeaderComponent = () => {

  return (
      <Header className="header">
        <Flex className="flex-header" justify="space-around" align="center">
            <div className="logo" />
            <h1>FastBoard</h1>
        </Flex>
      </Header>
  );
};
