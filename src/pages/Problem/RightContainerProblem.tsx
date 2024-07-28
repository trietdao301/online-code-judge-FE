import React, { useEffect, useState } from "react";
import "./Problem.css";
import Editor from "@monaco-editor/react";
import {
  Button,
  ConfigProvider,
  Dropdown,
  MenuProps,
  message,
  Space,
} from "antd";
import {
  CloseCircleOutlined,
  DownOutlined,
  FileOutlined,
  JavaOutlined,
  JavaScriptOutlined,
  LoadingOutlined,
  PythonOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  AdminRole,
  ContestantRole,
  createSubmission,
  CreateSubmissionRequest,
  CreateSubmissionResponse,
  getSubmissionSnippet,
  GetSubmissionSnippetResponse,
  Submission,
} from "../../services";
import { useProblemContext } from "../../contexts/ProblemContext";
import { useAuth } from "../../contexts/AuthContext";

const LANGUAGE_ITEMS = [
  { label: "Java", key: "1", icon: <JavaOutlined /> },
  { label: "Python", key: "2", icon: <PythonOutlined /> },
  { label: "Javascript", key: "3", icon: <JavaScriptOutlined /> },
];
type Language = "Python" | "Java" | "Javascript";

export default function RightContainerProblem() {
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Choose");
  const { role } = useAuth();
  const [submissionSnippet, setSubmissionSnippet] = useState<string>("");
  const {
    problemUUID,
    codeContent,
    setCodeContent,
    setSubmission,
    submissionSnippetList,
    setActiveTab,
    disableSubmit,
    setDisableSubmit,
  } = useProblemContext();
  const { user } = useAuth();

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = LANGUAGE_ITEMS.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLanguage(selectedItem.label as Language);
      //message.info(`Selected ${selectedItem.label}`);

      submissionSnippetList.map((item, index) => {
        if (item.language == selectedItem.label.toLowerCase()) {
          const fetchSubmissionSnippet = async (
            submissionSnippetUUID: string,
          ) => {
            try {
              const response: GetSubmissionSnippetResponse =
                await getSubmissionSnippet({
                  SubmissionSnippetUUID: submissionSnippetUUID,
                });
              if (response) {
                setSubmissionSnippet(response.CodeSnippet);
                console.log(response.CodeSnippet);
              }
              return;
            } catch (err) {
              message.error("failed to fetch problem snippet");
              return;
            }
          };
          fetchSubmissionSnippet(item.submissionSnippetUUID);
        }
      });
    }
  };

  const menuProps = {
    items: LANGUAGE_ITEMS,
    onClick: handleMenuClick,
  };

  async function handleSubmit(): Promise<void> {
    if (!disableSubmit) {
      setDisableSubmit(true);
    }
    if (user) {
      console.log(user.accountUUID);
    }
    const submissionReq: CreateSubmissionRequest = {
      ProblemUUID: problemUUID,
      Content: codeContent,
      Language: selectedLanguage,
      AuthorAccountUUID: user?.accountUUID || "none",
    };
    const res: CreateSubmissionResponse = await createSubmission(submissionReq);
    if (res) {
      message.success("Successfully submit");
      setSubmission(res.Submission);
      setActiveTab("2");
    }
  }

  return (
    <div className="right-problem-container">
      <div className="problem-header">
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              {selectedLanguage}
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
        <Button type="text" icon={<FileOutlined />}>
          Load File
        </Button>
        {(role === AdminRole || role === ContestantRole) && 
          <Button
            type="text"
            icon={
              disableSubmit ? (
                <LoadingOutlined style={{ color: "#00D45A" }} />
              ) : (
                <UploadOutlined />
              )
            }
            onClick={handleSubmit}
            disabled={disableSubmit}
            style={{ color: disableSubmit ? "#00D45A" : "white" }}
          >
            Submit
          </Button>
        }
      </div>

      <Editor
        className="problem-editor"
        language={selectedLanguage.toLowerCase()}
        value={submissionSnippet}
        theme="vs-dark"
        height={"795px"}
        width={"100%"}
        onChange={(value) => setCodeContent(value ?? "")}
      />
    </div>
  );
}
