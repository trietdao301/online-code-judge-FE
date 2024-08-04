import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Accounts from "../pages/Accounts";
import Submissions from "../pages/Submissions";
import Settings from "../pages/Settings";
import Contest from "../pages/Contest";
import NewProblem from "../pages/NewProblem";
import Test from "../pages/Test";
import Problem from "../pages/Problem/Problem";
import Register from "../pages/Register";
import AuthLayout from "../layout/AuthLayout";
import MainLayout from "../layout/MainLayout";
import { ProblemList } from "../pages/ProblemList";
import { ProblemEditorProvider } from "../contexts/NewProblemContext";
import { LayoutProvider } from "../contexts/LayoutContext";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../pages/Unauthorized"; // Create this component
import { AuthProvider } from "../contexts/AuthContext";
import { ProblemProvider } from "../contexts/ProblemContext";
import { ConfigProvider, theme } from "antd";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/page/",
    element: (
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm

          token: {
            // Seed Token

            borderRadius: 2,
            colorBgBase: "#1a2035",
            colorText: "#FFFFFF",
          },
          components: {
            Button: {
              colorBgBase: "#00b96b",
              colorBgContainer: "#00b96b",
            },

            Tabs: {
              colorPrimary: "#ffcf89",
              colorText: "#FFFFFF",
              algorithm: theme.darkAlgorithm,
            },
            Layout: {
              siderBg: "#1f283e",
              triggerBg: "#293758",
              bodyBg: "#1a2035",
            },
            Table: {
              colorBgContainer: "#202940",
              colorText: "#8b92a9",
              colorTextHeading: "#8b92a9",
              footerBg: "#202940",
              borderColor: "hsla(0,0%,71%,.1)",
              headerBg: "#293553",
            },
          },
        }}
      >
        <PrivateRoute allowedRoles={["Contestant", "Admin", "ProblemSetter"]}>
          <LayoutProvider>
            <MainLayout />
          </LayoutProvider>
        </PrivateRoute>
      </ConfigProvider>
    ),
    children: [
      {
        children: [
          {
            path: "problem-list",
            element: <ProblemList />,
          },
          {
            path: "problem/:param_problem_uuid",
            element: (
              <ProblemProvider>
                <Problem />{" "}
              </ProblemProvider>
            ),
          },

          {
            path: "settings",
            element: <Settings />,
          },
          {
            path: "contest",
            element: <Contest />,
          },
          {
            path: "accounts",
            element: <Accounts />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["Admin", "Contestant"]} />,
        children: [
          {
            path: "submissions",
            element: <Submissions />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["Admin", "ProblemSetter"]} />,
        children: [
          {
            path: "new-problem",
            element: <NewProblem />,
          },
          {
            path: "test/:param_problem_uuid",
            element: (
              <ProblemEditorProvider>
                <Test />
              </ProblemEditorProvider>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);
