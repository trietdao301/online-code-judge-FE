import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Badge, Button, ConfigProvider, Descriptions, DescriptionsProps } from "antd";
import React, { useEffect } from "react";
import "./ProblemInfo.css";
import { formatMemory, formatTimeLimit, formatDateTime } from "../utils";

interface ProblemInfoProps {
  author: string | undefined;
  createdTime: string | undefined;
  updatedTime: string | undefined;
  timeLimitInMillisecond: Number | undefined;
  memoryLimitInByte: Number | undefined;
  description: string | undefined;
}

export default function ProblemInfo({
  author,
  createdTime,
  updatedTime,
  timeLimitInMillisecond,
  memoryLimitInByte,
  description,
}: ProblemInfoProps) {
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Author",
      children: <>{author}</>,
    },
    {
      key: "2",
      label: "Created time",
      children: <>{formatDateTime(createdTime)}</>,
    },
    {
      key: "3",
      label: "Updated time",
      children: <>{formatDateTime(updatedTime)}</>,
    },
    {
      key: "4",
      label: "Time limit",
      children: <>{formatTimeLimit(timeLimitInMillisecond)}</>,
    },
    {
      key: "5",
      label: "Memory limit",
      children: <>{formatMemory(memoryLimitInByte)}</>,
    },
  ];

  return (
    <>
      <ConfigProvider theme={{
        components: {
          Descriptions: {
            
          }
        },
        token: {
         colorBgBase: "#FFFF",

        }
      }}>
      <Descriptions className="description-table" labelStyle={{color:"white"}} bordered column={1} size="small" items={items} />
      </ConfigProvider>
      
      <div className="description-buttons">
        <Button icon={<EditOutlined />}>Edit</Button>
        <Button icon={<DeleteOutlined />}>Delete</Button>
      </div>
      <pre
        className="description-info-content"
        dangerouslySetInnerHTML={{ __html: description ? description : "" }}
      />
    </>
  );
}
