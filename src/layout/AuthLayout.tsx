import React, { useState } from "react";
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  GithubFilled,
} from "@ant-design/icons";
import { Layout, Menu, theme, Button, Typography, Breadcrumb } from "antd";
import { CustomHeader } from "../components/CustomHeader";
import { MenuItem } from "../components/MenuItem";
import { NavLink, Outlet } from "react-router-dom";
import "./AuthLayout.css";
import { Analytics } from '@vercel/analytics/react';
const { Header, Content, Footer, Sider } = Layout;
const { Title } = Typography;
const items = [UserOutlined].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

const AuthLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: 950 }}>
      <Sider
        trigger={null}
        breakpoint="lg"
        collapsedWidth="0"
        collapsed={collapsed}
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        theme="dark"
      >
        <CustomHeader collapsed={collapsed} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MenuItem
            collapsed={false}
            content="Link Github"
            Icon={GithubFilled}
            className="menu-item"
            link="https://github.com/trietdao301/online-code-judge"
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          ></Button>
          Coodbox
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: 800,
            }}
          >
            <nav id="auth-header">
              <NavLink to="/">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </nav>
            <Outlet />
            <Analytics />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AuthLayout;
