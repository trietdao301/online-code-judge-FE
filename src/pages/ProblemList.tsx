import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import ProblemListTable from "../components/ProblemListTable";
import { useLayoutContext } from "../contexts/LayoutContext";
import "./ProblemList.css";
import { EditFilled } from "@ant-design/icons";

interface Problem {
  key: number;
  name: string;
  createdTime: string;
  updatedTime: string;
  author: string;
}

export const ProblemList: React.FC = () => {
  const { setHeader } = useLayoutContext();

  useEffect(() => {
    setHeader("Problem List");
  }, []);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/page/new-problem");
  };
  return (
    <div className="problem-list-container">
      <Button
        icon={<EditFilled />}
        iconPosition={"start"}
        onClick={handleClick}
        className="create-problem-button"
      >
        Create Problem
      </Button>
      <ProblemListTable />
    </div>
  );
};
