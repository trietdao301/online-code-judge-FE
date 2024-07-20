import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../components/RichTextEditor";
import {
  Button,
  Dropdown,
  Input,
  InputNumber,
  MenuProps,
  Select,
  Space,
  Tooltip,
  message,
} from "antd";
import {
  DownOutlined,
  InfoCircleOutlined,
  JavaOutlined,
  JavaScriptOutlined,
  PicCenterOutlined,
  PythonOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import "./NewProblem.css";

import { createProblem, CreateNewProblemRequest } from "../services";
import { getMemoryLimitInBytes, getTimeLimitInMilliseconds } from "../utils";
import { useLayoutContext } from "../contexts/LayoutContext";
const { Option } = Select;

const TIME_UNITS = [
  { value: "Second", label: "second" },
  { value: "Minute", label: "min" },
  { value: "Hour", label: "hour" },
];

const MEMORY_UNITS = [
  { value: "Gigabyte", label: "GB" },
  { value: "Megabyte", label: "MB" },
];

export default function NewProblem() {
  const [name, setName] = useState<string>("");
  const [richEditorValue, setRichEditorValue] = useState<string>("");
  const [timeLimit, setTimeLimit] = useState<number>(1);
  const [timeLimitUnit, setTimeLimitUnit] = useState<string>("Second");
  const [memoryLimit, setMemoryLimit] = useState<number>(1);
  const [memoryLimitUnit, setMemoryLimitUnit] = useState<string>("Gigabyte");
  const { setHeader } = useLayoutContext();

  useEffect(() => {
    setHeader("Problem Editor");
  }, []);
  const handleSubmit = async () => {
    let problemData: CreateNewProblemRequest = {
      DisplayName: name,
      Description: richEditorValue,
      AuthorAccountUUID: "Admin",
      TimeLimitInMillisecond: getTimeLimitInMilliseconds(
        timeLimit,
        timeLimitUnit,
      ),
      MemoryLimitInByte: getMemoryLimitInBytes(memoryLimit, memoryLimitUnit),
    };
    try {
      const result = await createProblem(problemData);
      message.success(result);
      // Handle successful creation
    } catch (error) {
      message.error("Failed to create problem");
      // Handle error
    }

    console.log(name);
    console.log(richEditorValue);
    console.log(timeLimit);
    console.log(timeLimitUnit);
    console.log(memoryLimit);
    console.log(memoryLimitUnit);

    // Add your submission logic here
  };

  return (
    <div className="new-problem-container">
      <div className="problem-details">
        <label>Name</label>
        <Input
          className="name-input"
          onChange={(e) => setName(e.target.value)}
          suffix={
            <Tooltip title="Extra information">
              <PicCenterOutlined />
            </Tooltip>
          }
        />
        <label>Description</label>
        <RichTextEditor
          style={{ height: "400px" }}
          onContentValue={setRichEditorValue}
        />
        <div className="time-memory-limit">
          <div>
            <label>Time limit</label>
            <InputNumber
              style={{ width: "150px" }}
              addonAfter={
                <Select
                  defaultValue={timeLimitUnit}
                  style={{ width: 87 }}
                  onChange={setTimeLimitUnit}
                >
                  {TIME_UNITS.map((unit) => (
                    <Option key={unit.value} value={unit.value}>
                      {unit.label}
                    </Option>
                  ))}
                </Select>
              }
              defaultValue={timeLimit}
              onChange={(value) => setTimeLimit(value as number)}
            />
          </div>
          <div>
            <label>Memory limit</label>
            <InputNumber
              style={{ width: "150px" }}
              addonAfter={
                <Select
                  defaultValue={memoryLimitUnit}
                  style={{ width: 87 }}
                  onChange={setMemoryLimitUnit}
                >
                  {MEMORY_UNITS.map((unit) => (
                    <Option key={unit.value} value={unit.value}>
                      {unit.label}
                    </Option>
                  ))}
                </Select>
              }
              defaultValue={memoryLimit}
              onChange={(value) => setMemoryLimit(value as number)}
            />
          </div>
          <Button
            type="primary"
            className="save-button-problem-editor"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
