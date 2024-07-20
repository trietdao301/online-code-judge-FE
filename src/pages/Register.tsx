import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { Checkbox, CheckboxProps, Select } from "antd";

export default function Register() {
  const [role, setRole] = useState<string>("");
  const onChange = (value: string) => {
    setRole(value);
    console.log(`selected ${value}`);
  };

  const onSearch = (value: string) => {
    setRole(value);
    console.log("search:", value);
  };

  return (
    <Content>
      <RegisterForm />
    </Content>
  );
}
