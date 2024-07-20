import React, { ReactNode, useEffect, useState } from "react";
import { Button, Popconfirm, Table, Tooltip, message } from "antd";
import {
  GetProblemListResponse,
  getProblemList,
  Problem,
  deleteProblem,
} from "../services";
import { useNavigate } from "react-router-dom";
import "./ProblemListTable.css";
import { DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
type ProblemItem = {
  key: number;
  UUID: string; // Add this line
  name: string;
  createdTime: string;
  updatedTime: string;
  author: string;
  addTest: ReactNode;
};

export default function ProblemListTable() {
  const navigate = useNavigate();
  const [problemList, setProblemList] = useState<ProblemItem[]>([]);
  const fetchProblemList = async () => {
    try {
      const problemListResponse: GetProblemListResponse =
        await getProblemList();
      if (problemListResponse.TotalCount == 0) {
        message.warning("No problem found ");
      } else if (problemListResponse) {
        const problemArray: ProblemItem[] =
          problemListResponse.ListOfProblem.map((eachProblem, index) => ({
            key: index + 1,
            UUID: eachProblem.UUID, // Add this line
            name: eachProblem.displayName,
            createdTime: eachProblem.createdAt,
            updatedTime: eachProblem.updatedAt,
            author: eachProblem.authorAccountUUID,
            addTest: (
              <Button
                type="dashed"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent row click event
                  navigate(`/page/test/${eachProblem.UUID}`);
                }}
              >
                Add
              </Button>
            ),
          }));
        setProblemList(problemArray);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      message.error("Failed to parse problem array");
    }
  };

  useEffect(() => {
    fetchProblemList();
  }, []);

  const handleDelete = async (UUID: string) => {
    try {
      await deleteProblem(UUID);
      message.success("Problem deleted");
      fetchProblemList(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting problem:", error);
      message.error("Failed to delete problem");
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "16.66%",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
      width: "16.66%",
    },
    {
      title: "Created Time",
      dataIndex: "createdTime",
      key: "createdTime",
      width: "16.66%",
    },
    {
      title: "Updated Time",
      dataIndex: "updatedTime",
      key: "updatedTime",
      width: "16.66%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "16.66%",
      render: (_: any, record: ProblemItem) => (
        <span>
          <Tooltip title="Add test">
            <Button
              type="text"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/page/test/${record.UUID}`);
              }}
              icon={<FileAddOutlined />}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this problem?"
            onConfirm={(e) => {
              e?.stopPropagation();
              handleDelete(record.UUID);
            }}
            onCancel={(e) => e?.stopPropagation()}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete problem">
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={(e) => e.stopPropagation()}
              />
            </Tooltip>
          </Popconfirm>
        </span>
      ),
    },
  ];

  const onRowClick = (record: ProblemItem) => {
    return {
      onClick: () => {
        navigate(`/page/problem/${record.UUID}`); // Navigate to problem detail page
      },
    };
  };

  return (
    <div>
      <Table
        className="problem-list-table"
        size="middle"
        dataSource={problemList}
        columns={columns}
        onRow={onRowClick}
        scroll={{ x: true }}
      />
    </div>
  );
}
