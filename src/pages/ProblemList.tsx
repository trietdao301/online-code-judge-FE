import React, { useEffect, useState } from "react";
import { Button, ConfigProvider } from "antd";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import ProblemListTable from "../components/ProblemListTable";
import { useLayoutContext } from "../contexts/LayoutContext";
import "./ProblemList.css";
import { EditFilled } from "@ant-design/icons";
import { AdminRole, ProblemSetterRole } from "../services";
import { useAuth } from "../contexts/AuthContext";

interface Problem {
  key: number;
  name: string;
  createdTime: string;
  updatedTime: string;
  author: string;
}

export const ProblemList: React.FC = () => {
  const { setHeader } = useLayoutContext();
  const {role} = useAuth()
  useEffect(() => {
    setHeader("Problem List");
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/page/new-problem");
  };
  return (
    <div className="problem-list-container">
      <ConfigProvider
        theme={{
          // 1. Use dark algorithm

          token: {
            // Seed Token
            colorPrimary: "#000E2E",
            borderRadius: 2,
            colorBgBase: "#1a2035",
            colorText: "#FFFFFF",
          },
        }}
      >
        {role === AdminRole || role === ProblemSetterRole &&
           <Button
           icon={<EditFilled />}
           iconPosition={"start"}
           onClick={handleClick}
           className="create-problem-button"
         >
           Create Problem
         </Button>
         }
       
      </ConfigProvider>
      <ProblemListTable />
    </div>
  );
};
