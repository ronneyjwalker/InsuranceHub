import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  SolutionOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import ManageCustomer from "./ManageCustomer";
import ManageAdmin from "./ManageAdmin";
import ManagePolicy from "./ManagePolicy";
import Metrics from "./Metrics";

const { Content, Sider } = Layout;

const AdminHome = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState("manageCustomers");

  const handleMenuClick = (menuItem) => {
    setSelectedMenuItem(menuItem.key);
  };

  const toggleMenu = () => {
    setCollapsed(!collapsed);
  };

  const renderContent = () => {
    switch (selectedMenuItem) {
      case "manageCustomers":
        return <ManageCustomer />;
      case "manageAdmins":
        return <ManageAdmin />;
      case "managePolicies":
        return <ManagePolicy />;
      case "metrics":
        return <Metrics />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ height: "90vh" }}>
      <Sider
        width={200}
        style={{ background: "#fff" }}
        collapsible
        collapsed={collapsed}
        onCollapse={toggleMenu}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedMenuItem]}
          style={{ height: "100%", borderRight: 0 }}
          onClick={handleMenuClick}
        >
          <Menu.Item key="manageCustomers" icon={<UserOutlined />}>
            Manage Customers
          </Menu.Item>
          <Menu.Item key="manageAdmins" icon={<TeamOutlined />}>
            Manage Admins
          </Menu.Item>
          <Menu.Item key="managePolicies" icon={<SolutionOutlined />}>
            Manage Policies
          </Menu.Item>
          <Menu.Item key="metrics" icon={<BarChartOutlined />}>
            Metrics
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: "24px" }}>
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminHome;
