import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "./LoginForm.css";
import { NavLink } from "react-router-dom";

interface LoginFormProps {
  onSubmit: (values: { username: string; password: string }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const onFinish = (values: { username: string; password: string }) => {
    onSubmit(values);
  };
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="site-form-input"
          onChange={(e) => setComponentDisabled(e.target.value === "")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          className="site-form-input"
          onChange={(e) => setComponentDisabled(e.target.value === "")}
        />
      </Form.Item>

      <Form.Item>
        <Button
          disabled={componentDisabled}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
