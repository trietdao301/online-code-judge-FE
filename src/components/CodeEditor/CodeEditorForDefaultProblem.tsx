import { Button } from "antd";
import Editor from "@monaco-editor/react";
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

const DEFAULT_VALUE = configData.SUBMISSION_TEMPLATE_CREATION.DEFAULT_VALUE;
const DEFAULT_THEME = configData.SUBMISSION_TEMPLATE_CREATION.DEFAULT_THEME;
export default function CodeEditorForDefaultProblem({
  collapsed = false,
  className = undefined,
  classNameCollapsed = undefined,
  theme = "vs",
  height = "650px",
  language = "python",
  width = "700px",
}: CodeEditorProps) {
  const { problemSubmissionTemplateCode, setProblemSubmissionTemplateCode } =
    useProblemEditor();

  return (
    <div className={collapsed ? classNameCollapsed : className}>
      <Editor
        height={height}
        width={width}
        value={problemSubmissionTemplateCode}
        theme={theme}
        language={language}
        onChange={(value) => setProblemSubmissionTemplateCode(value ?? "")}
      />
    </div>
  );
}
