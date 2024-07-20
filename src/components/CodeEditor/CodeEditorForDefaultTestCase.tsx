import React from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { useProblemEditor } from "../../contexts/NewProblemContext";
import configData from "../../config.json";

interface CodeEditorProps {
  collapsed: boolean;
  className?: string;
  classNameCollapsed?: string;
  theme?: string;
  height?: string;
  language?: string;
  width?: string;
}

const DEFAULT_TEST_CODE = configData.TEST_CASE_CREATION.DEFAULT_VALUE;
const DEFAULT_THEME = configData.TEST_CASE_CREATION.DEFAULT_THEME;

export default function CodeEditorForDefaultTestCase({
  collapsed = false,
  className = undefined,
  classNameCollapsed = undefined,
  theme = DEFAULT_THEME,
  height = "650px",
  language = "python",
  width = "750px",
}: CodeEditorProps) {
  const { problemTestCode, setProblemTestCode } = useProblemEditor();

  return (
    <div className={collapsed ? classNameCollapsed : className}>
      <Editor
        height={height}
        value={problemTestCode}
        width={width}
        theme={theme}
        language={language}
        onChange={(value) => setProblemTestCode(value ?? "")}
      />
    </div>
  );
}
