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
//   <ConfigProvider
//   theme={{
//     // 1. Use dark algorithm
//     algorithm: theme.darkAlgorithm,
//     token: {
//       // Seed Token
//       colorPrimary: '#eb2f96',
//       borderRadius: 2,


//     },
//     components: {
//       Button: {
//         colorPrimary: '#00b96b',
//       },
//       Input: {
//         colorPrimary: '#eb2f96',
//       },
//       Tabs: {
//         colorPrimary: '#eb2f96',
//         algorithm: theme.darkAlgorithm,
//       },
//       Layout: {
//         colorPrimary: '#eb2f96',
//       }
//     },
//   }}
// >
  <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    // </ConfigProvider>
);
