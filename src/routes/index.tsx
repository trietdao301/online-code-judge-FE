import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Accounts from "../pages/Accounts";
import Submissions from "../pages/Submissions";
import Settings from "../pages/Settings";
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
      <PrivateRoute allowedRoles={["user", "admin"]}>
        <LayoutProvider>
          <MainLayout />
        </LayoutProvider>
      </PrivateRoute>
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
            path: "submissions",
            element: <Submissions />,
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        element: <PrivateRoute allowedRoles={["admin"]} />,
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
          {
            path: "accounts",
            element: <Accounts />,
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
