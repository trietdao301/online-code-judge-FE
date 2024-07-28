import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Problem,
  getProblem,
  createTestCaseAndSubmissionSnippet,
  CreateTestCaseAndSubmissionSnippetRequest,
} from "../services";
import ProblemInfo from "../components/ProblemInfo";
import {
  Button,
  ConfigProvider,
  Dropdown,
  MenuProps,
  Space,
  Tabs,
  TabsProps,
  message,
} from "antd";
import CodeEditorForDefaultProblem from "../components/CodeEditor/CodeEditorForDefaultProblem";
import CodeEditorForDefaultTestCase from "../components/CodeEditor/CodeEditorForDefaultTestCase";
import {
  DownOutlined,
  JavaOutlined,
  JavaScriptOutlined,
  PythonOutlined,
  UndoOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "./Test.css";
import { useLayoutContext } from "../contexts/LayoutContext";
import TestTable from "../components/TestTable";
import { useProblemEditor } from "../contexts/NewProblemContext";
import configData from "../config.json";

const LANGUAGE_ITEMS = [
  { label: "java", key: "1", icon: <JavaOutlined /> },
  { label: "python", key: "2", icon: <PythonOutlined /> },
  { label: "javascript", key: "3", icon: <JavaScriptOutlined /> },
];

type CodeFileName = "main.py" | "main.java" | "main.js";
type TestFileName = "test.py" | "test.java" | "test.js";
type Language = "python" | "java" | "javascript";

const DEFAULT_TEST_CODE = configData.TEST_CASE_CREATION.DEFAULT_VALUE;
const DEFAULT_VALUE = configData.SUBMISSION_TEMPLATE_CREATION.DEFAULT_VALUE;

type LanguageObject = {
  [key in Language]: {
    codeFileName: CodeFileName;
    testFileName: TestFileName;
  };
};

const LANGUAGE_MAP: LanguageObject = {
  python: { codeFileName: "main.py", testFileName: "test.py" },
  java: { codeFileName: "main.java", testFileName: "test.java" },
  javascript: { codeFileName: "main.js", testFileName: "test.js" },
};

type Tab = "1" | "2";

export default function AddTestToProblem() {
  const { param_problem_uuid } = useParams<{ param_problem_uuid: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("python");
  const { setHeader } = useLayoutContext();
  const {
    problemTestCode,
    problemSubmissionTemplateCode,
    clear,
    setProblemTestCode,
    setProblemSubmissionTemplateCode,
  } = useProblemEditor();
  const [currentTab, setCurrentTab] = useState<Tab>("1");

  function handleReset(): void {
    if (currentTab == "1") setProblemSubmissionTemplateCode(DEFAULT_VALUE);
    else if (currentTab == "2") {
      setProblemTestCode(DEFAULT_TEST_CODE);
    }
  }

  const onChange = (key: string) => {
    setCurrentTab(key as Tab);
  };

  useEffect(() => {
    if (problem) {
      setHeader(problem.displayName);
    }
  }, [problem]);

  useEffect(() => {
    const fetchProblemByUUID = async () => {
      if (param_problem_uuid) {
        try {
          const resData = await getProblem(param_problem_uuid);
          const problemObj: Problem = resData.Problem;
          console.log(problemObj.displayName);
          setProblem(problemObj);
        } catch (err) {
          setProblem(null);
          message.error("Failed to fetch this problem");
        }
      }
    };

    fetchProblemByUUID();
  }, []); // Include problemUUID in dependency array

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const selectedItem = LANGUAGE_ITEMS.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedLanguage(selectedItem.label as Language);
    }
  };

  const menuProps = {
    items: LANGUAGE_ITEMS,
    onClick: handleMenuClick,
  };
  const currentLanguageFiles = LANGUAGE_MAP[selectedLanguage];
  const itemsRight: TabsProps["items"] = [
    {
      key: "1",
      label: currentLanguageFiles.codeFileName,
      children: (
        <CodeEditorForDefaultProblem
          theme="vs-dark"
          collapsed={false}
          language={selectedLanguage}
          width="100%"
          height="795px"
          className="code-editor"
        />
      ),
    },
    {
      key: "2",
      label: currentLanguageFiles.testFileName,
      children: (
        <CodeEditorForDefaultTestCase
          collapsed={false}
          language={selectedLanguage}
          theme="vs-dark"
          height="795px"
          width="100%"
          className="code-editor"
        />
      ),
    },
  ];

  const itemsLeft: TabsProps["items"] = [
    {
      key: "1",
      label: "Description",
      children: (
        <ProblemInfo
          author={problem?.authorAccountUUID}
          createdTime={problem?.createdAt}
          updatedTime={problem?.updatedAt}
          timeLimitInMillisecond={problem?.timeLimitInMillisecond}
          memoryLimitInByte={problem?.memoryLimitInByte}
          description={problem?.description}
        />
      ),
    },
    {
      key: "2",
      label: "Test cases",
      children: <TestTable problemUUID={param_problem_uuid} />,
    },
  ];

  async function handleOnSave(): Promise<void> {
    const req: CreateTestCaseAndSubmissionSnippetRequest = {
      CodeSnippet: problemSubmissionTemplateCode,
      CodeTest: problemTestCode,
      OfProblemUUID: param_problem_uuid ? param_problem_uuid : "",
      Language: selectedLanguage,
    };
    try {
      const status = await createTestCaseAndSubmissionSnippet(req);
      clear();
      message.info("Saved");
    } catch (error) {
      if (error instanceof Error) {
        message.error(error.message);
      } else {
        message.error("An unexpected error occurred");
      }
    }
  }

  const OperationsSlotRight: Record<PositionType, React.ReactNode> = {
    left: <></>,
    right: (
      <>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#DEFFD3",
            },
          }}
        >
          <Dropdown menu={menuProps}>
            <Button className="language-button">
              <Space>
                {selectedLanguage}
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </ConfigProvider>
        <Button
          type="text"
          className="test-reset-button"
          icon={<UndoOutlined />}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          className="save-button"
          icon={<UploadOutlined />}
          type="text"
          onClick={handleOnSave}
        >
          Save
        </Button>
      </>
    ),
  };

  const OperationsSlotLeft: Record<PositionType, React.ReactNode> = {
    left: <></>,
    right: <></>,
  };

  type PositionType = "left" | "right";
  return (
    <div className="test-page-container">
      <Tabs
        className="tab-left"
        tabBarExtraContent={OperationsSlotLeft}
        items={itemsLeft}
      />
      <Tabs
        className="tab-right"
        tabBarExtraContent={OperationsSlotRight}
        items={itemsRight}
        activeKey={currentTab}
        onChange={onChange}
      />
    </div>
  );
}
