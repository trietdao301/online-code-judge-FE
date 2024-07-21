import React, { useState, useEffect } from "react";
import { Button, Checkbox, Col, Form, Input, message, notification, Row } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import "./RegisterForm.css";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createAccount, CreateAccountRequest, CreateAccountResponse } from "../services";

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
  const navigate = useNavigate()
  const onFinish = async (values:any) => {
    console.log("Received values of form: ", values);
    const  request : CreateAccountRequest = {
      Username: values.Username,
      Password: values.Password,
      Role: values.Role[0]
    }
    try {
      const res = await createAccount(request)
      message.success("Created Successfully: " + res.data.Username)
      navigate("/")
    } 
    catch (error) {
      message.error("Creatation Failed")
    }
  };

  const updateDisabled = () => {
    const values = form.getFieldsValue();
    const { Username, Password, Confirm, Role } = values;
    setComponentDisabled(
      !Username ||
        !Password ||
        !Confirm ||
        Password !== Confirm ||
        !Role ||
        Role.length !== 1
    );
  };

  useEffect(() => {
    updateDisabled();
  }, [form]);

  const onRoleChange = (checkedValues: string[]) => {
    if (checkedValues.length > 1) {
      form.setFieldsValue({ Role: [checkedValues[checkedValues.length - 1]] });
    }
    updateDisabled();
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
          <Form.Item name="Role" noStyle>
            <Checkbox.Group style={{ width: "100%" }} onChange={onRoleChange}>
              <Col>
                <Col span={24}>
                  <Checkbox value="ProblemSetter">Problem Setter</Checkbox>
                </Col>
                <Col span={24}>
                  <Checkbox value="Contestant">Contestant</Checkbox>
                </Col>
              </Col>
            </Checkbox.Group>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default RegisterForm;