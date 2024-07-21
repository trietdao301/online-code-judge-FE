import React, { useEffect, useState } from "react";

import LoginForm from "../components/LoginForm";
import { ConfigProvider, Layout, message } from "antd";
import { Content } from "antd/es/layout/layout";
import { createSession, CreateSessionRequest } from "../services";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { log } from "console";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, role, login } = useAuth();
  useEffect(() => {
    // If user is already logged in, redirect to appropriate page
    if (user) {
      navigateBasedOnRole(role);
    }
  }, [user, role, navigate]);
  const navigateBasedOnRole = (userRole: string | null) => {
    switch (userRole) {
      case "Admin":
        navigate("/page/problem-list");
        break;
      case "ProblemSetter":
        navigate("/page/problem-list");
        break;
      case "Contestant":
        navigate("/page/problem-list");
        break;
      default:
        navigate("/");
    }
  };

  async function handleSubmit(values: { username: string; password: string }) {
    try {
      await login(values.username, values.password);
      // After successful login, the user and role states will be updated,
      // triggering the useEffect hook to handle navigation
    } catch (error) {
      console.error("Login failed:", error);
      message.error("Login failed. Please try again.");
    }
  }
  return (
    <Content>
      <LoginForm onSubmit={handleSubmit} />
    </Content>
  );
};

export default Login;
