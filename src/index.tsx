import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import { AuthProvider } from "./contexts/AuthContext";
import { ConfigProvider, theme } from "antd";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
);
