import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  GithubFilled,
  QuestionCircleOutlined,
  PlusCircleOutlined,
  FormOutlined,
  SettingOutlined,
  LogoutOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import type { Collapse, MenuProps } from "antd";
import { Breadcrumb, Button, Layout, Menu, theme } from "antd";
import { MenuItem } from "../components/MenuItem";
import { CustomHeader } from "../components/CustomHeader";
import "./MainLayout.css";
import "../components/MenuItem.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useLayoutContext } from "../contexts/LayoutContext";
import { useAuth } from "../contexts/AuthContext";
import { ProblemSetterRole, AdminRole, ContestantRole } from "../services";
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { logout, role } = useAuth(); // Use the logout function from AuthContext
  const navigate = useNavigate();
  console.log(role);
  const handleLogout = () => {
    logout();
    navigate("../login"); // Redirect to login page after logout
  };
  const { header } = useLayoutContext();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width="250px"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className="sider"
      >
        <CustomHeader collapsed={collapsed} />

        {(role === AdminRole || role === ProblemSetterRole) && (
          <MenuItem
            content="New problem"
            collapsed={collapsed}
            Icon={PlusCircleOutlined}
            className="menu-item"
            link="/page/new-problem"
          />
        )}

        <MenuItem
          content="Problems"
          collapsed={collapsed}
          Icon={QuestionCircleOutlined}
          className="menu-item"
          link="/page/problem-list"
        />
        {(role === AdminRole || role === ContestantRole) && (
          <MenuItem
            content="Submissions"
            collapsed={collapsed}
            Icon={FormOutlined}
            className="menu-item"
            link="/page/submissions"
          />
        )}

        <MenuItem
          content="Contest"
          collapsed={collapsed}
          Icon={GlobalOutlined}
          className="menu-item"
          link="/page/contest"
        />

        <MenuItem
          content="Accounts"
          collapsed={collapsed}
          Icon={UserOutlined}
          className="menu-item"
          link="/page/accounts"
        />

        {role === AdminRole && (
          <MenuItem
            content="Settings"
            collapsed={collapsed}
            Icon={SettingOutlined}
            className="menu-item"
            link="/page/settings"
          />
        )}

        <MenuItem
          content="Project Github"
          collapsed={collapsed}
          Icon={GithubFilled}
          className="menu-item"
          link="https://github.com/trietdao301/online-code-judge"
        />
        <div style={{ position: "absolute", bottom: "55px", width: "100%" }}>
          <MenuItem
            content="Logout"
            link="/"
            collapsed={collapsed}
            Icon={LogoutOutlined}
            className="menu-item"
            onClick={handleLogout}
          />
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <div
            style={{ marginLeft: "41px", fontWeight: "bold", fontSize: "20px" }}
          >
            {" "}
            {header}
          </div>
        </Header>
        <Content style={{ margin: "0 10px" }}>
          <Breadcrumb style={{ margin: "10px 0" }}></Breadcrumb>
          <div
            style={{
              minHeight: 850,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minWidth: 1000,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
