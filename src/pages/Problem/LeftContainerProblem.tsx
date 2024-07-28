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
import { useAuth } from "../../contexts/AuthContext";
import { AdminRole, ContestantRole } from "../../services";

export default function LeftContainerProblem() {
  const { activeTab, setActiveTab } = useProblemContext();
  const { role } = useAuth();
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

  const itemsForProblemSetter: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: <Description />,
      icon: <FileTextOutlined />,
    },
  ];

  const onChange = (key: string) => {
    setActiveTab(key);
  };
  return (
    <div className="left-problem-container">
      {role === AdminRole || role === ContestantRole ? (
        <Tabs items={items} onChange={onChange} activeKey={activeTab} />
      ) : (
        <Tabs
          items={itemsForProblemSetter}
          onChange={onChange}
          activeKey={activeTab}
        />
      )}
    </div>
  );
}
