import React, { useState } from "react";
import { Card } from "antd";
import CodeEditorForDefaultProblem from "./CodeEditor/CodeEditorForDefaultProblem";
import CodeEditorForDefaultTestCase from "./CodeEditor/CodeEditorForDefaultTestCase";
import { CodeOutlined } from "@ant-design/icons";
import "./CodeEditorFrame.css";

interface CodeEditorFrameProps {
  selectedLanguage: string;
}

const tabList = [
  {
    key: "tab1",
    tab: (
      <span>
        <CodeOutlined /> test.py
      </span>
    ),
  },
  {
    key: "tab2",
    tab: (
      <span>
        <CodeOutlined /> main.py
      </span>
    ),
  },
];

const CodeEditorFrame: React.FC<CodeEditorFrameProps> = ({
  selectedLanguage,
}) => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");

  const tabContent: Record<string, React.ReactNode> = {
    tab1: (
      <CodeEditorForDefaultTestCase
        language={selectedLanguage}
        collapsed={false}
      />
    ),
    tab2: (
      <CodeEditorForDefaultProblem
        language={selectedLanguage}
        collapsed={false}
      />
    ),
  };

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return (
    <>
      <Card
        style={{ width: "100%" }}
        className="code-editor-frame"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {tabContent[activeTabKey1]}
      </Card>
    </>
  );
};

export default CodeEditorFrame;
