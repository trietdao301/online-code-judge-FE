import React, { useState } from "react";
import "./Problem.css";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { Tabs, TabsProps } from "antd";
import {
  AndroidOutlined,
  AppleOutlined,
  CarryOutOutlined,
  FileDoneOutlined,
  FileTextOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { useProblemContext } from "../../contexts/ProblemContext";
import Description from "./Description";
import Submission from "./Submission";

export default function LeftContainerProblem() {
  const { activeTab, setActiveTab } = useProblemContext();
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: <Description />,
      icon: <FileTextOutlined />,
    },
    {
      key: "2",
      label: "Submission",
      children: <Submission />,
      icon: <CarryOutOutlined />,
    },
  ];
  const onChange = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="left-problem-container">
      <Tabs items={items} onChange={onChange} activeKey={activeTab} />
    </div>
  );
}
