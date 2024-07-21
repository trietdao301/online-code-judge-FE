import React, { useEffect, useState } from "react";
import { RichTextEditor } from "../components/RichTextEditor";
import {
  Button,
  ConfigProvider,
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
import { useAuth } from "../contexts/AuthContext";
import { error } from "console";
import { useNavigate } from "react-router-dom";
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
  const { user } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    setHeader("Problem Editor");
  }, []);
  const handleSubmit = async () => {
    if (user) {
      let problemData: CreateNewProblemRequest = {
        DisplayName: name,
        Description: richEditorValue,
        AuthorName: user.username,
        AuthorAccountUUID: user.accountUUID ,
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
    }
    if (!user) {
      message.error("token expired")
      navigate('/')
    }
  };

  return (
    <div className="new-problem-container">
      <div className="problem-details">
        <label>Name</label>
        
        <ConfigProvider
          theme={{
            token: {
              colorBgBase: "#d2daff",  
            },
            components: {
              Input: {
                colorBorder:"none",
                activeBorderColor: "#ccc9fc",
                hoverBorderColor: "white",
                colorTextDescription:"#0000"
              }
            }
        }}>
          <Input
            className="name-input"
            onChange={(e) => setName(e.target.value)}
            suffix={
              <Tooltip title="Extra information">
                <PicCenterOutlined />
              </Tooltip>
            }
          />
        </ConfigProvider>
        
        <label>Description</label>
        <RichTextEditor onContentValue={setRichEditorValue} />

        <div className="time-memory-container">
          <div>
            <label>Time limit</label>
            <ConfigProvider
              theme={{
                components: {
                  InputNumber: {
                    addonBg: "#485985",
                    colorBorder: "#212A42",
                    activeShadow:"	0 0 0 2px #B622F7",
                    handleBg: "#FFF",
                  },
                },
                token: {
                  colorBgBase: "#485985",
                  colorPrimary: "#FFFF",
                }
              }}
            >
              <InputNumber
                style={{ width: "150px" }}
                addonAfter={
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgBase: "#334B89",
                        
                    },
                    components: {
                      Select: {
                        optionActiveBg: "#7700AB",
                      
                        optionSelectedColor: "#FFFF",
                        optionSelectedBg: "#B60FFF",
                      
                      },
                    },
                  }}>
                    <Select
                    className="select-problem-editor"
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
                    </ConfigProvider>
                  
                }
                defaultValue={timeLimit}
                onChange={(value) => setTimeLimit(value as number)}
              />
            </ConfigProvider>
          </div>
          <div>
            <label>Memory limit</label>
            <ConfigProvider
              theme={{
                components: {
                  InputNumber: {
                    addonBg: "#485985",
                    colorBorder: "#212A42",
                    activeShadow:"	0 0 0 2px #B622F7",
                    handleBg: "#FFF",
                  },
                },
                token: {
                  colorBgBase: "#485985",
                  colorPrimary: "#FFFF",
                }
              }}
            >
              <InputNumber
              style={{ width: "150px" }}
                addonAfter={
                  <ConfigProvider
                  theme={{
                    token: {
                      colorBgBase: "#334B89",
                      
                  },
                  components: {
                    Select: {
                      optionActiveBg: "#7700AB",
                    
                      optionSelectedColor: "#FFFF",
                      optionSelectedBg: "#B60FFF",
                    
                    },
                  },
                }}>
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
                    </ConfigProvider>
              }
              defaultValue={memoryLimit}
              onChange={(value) => setMemoryLimit(value as number)}
            />
            </ConfigProvider>
            
          </div>
        </div>
        
        <div className="time-memory-limit">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary:"#334b89",  
            },
            components: {
              Button: {
                primaryShadow:" 0 6px 12px rgba(0, 0, 0, 0.15)"
             }
            }
        }}>
          <Button
            type="primary"
            className="save-button-problem-editor"
            onClick={handleSubmit}
          >
            Save
            </Button>
            </ConfigProvider>
        </div>
      </div>
    </div>
  );
}
