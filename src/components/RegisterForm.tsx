import React, { useState } from "react";
import { Button, Checkbox, Col, Form, Input, Row } from "antd";
import { NavLink } from "react-router-dom";
import "./RegisterForm.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { CreateAccountRequest } from "../services";

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const onFinish = (values: CreateAccountRequest) => {
    console.log("Received values of form: ", values);
  };

  const updateDisabled = () => {
    const values = form.getFieldsValue();
    const { Username, Password, Confirm, roles } = values;
    setComponentDisabled(
      !Username ||
        !Password ||
        !Confirm ||
        Password !== Confirm ||
        !roles ||
        roles.length === 0,
    );
  };

  return (
    <Form
      form={form}
      name="register"
      onFinish={onFinish}
      style={{ maxWidth: 400, margin: "auto" }}
      scrollToFirstError
      onValuesChange={updateDisabled}
    >
      <Form.Item
        name="Username"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: "Please input your username!",
            whitespace: true,
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          className="ant-btn"
        />
      </Form.Item>

      <Form.Item
        name="Password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Password"
          className="ant-btn"
        />
      </Form.Item>

      <Form.Item
        name="Confirm"
        dependencies={["Password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("Password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The passwords that you entered do not match!"),
              );
            },
          }),
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          placeholder="Confirm Password"
          className="ant-btn"
        />
      </Form.Item>

      <Form.Item name={"role"}>
        <Row gutter={8} align="middle">
          <Col span={12}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ width: "100%" }}
              disabled={componentDisabled}
            >
              Register
            </Button>
          </Col>
          <Col span={12}>
            <Checkbox.Group style={{ width: "100%" }}>
              <Col>
                <Col span={24}>
                  <Checkbox value="ProblemSetter">Problem Setter</Checkbox>
                </Col>
                <Col span={12}>
                  <Checkbox value="Contestant">Contestant</Checkbox>
                </Col>
              </Col>
            </Checkbox.Group>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
