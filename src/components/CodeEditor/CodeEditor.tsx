import React from "react";
import Editor from "@monaco-editor/react";

interface CodeEditorProps {
  collapsed: boolean;
  onContentChange?: (content: string) => void;
  className?: string;
  classNameCollapsed?: string;
  theme?: string;
  language?: string;
  defaultValue?: string;
  value?: string;
  height?: string;
  width?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  collapsed,
  onContentChange,
  className,
  classNameCollapsed,
  theme = "vs",
  language = "python",
  defaultValue = "",
  value,
  height = "500px",
  width = "600px",
}) => {
  return (
    <Editor
      className={collapsed ? classNameCollapsed : className}
      height={height}
      width={width}
      theme={theme}
      defaultLanguage={language}
      onChange={(newValue) => onContentChange?.(newValue || "")}
      value={value}
      defaultValue={defaultValue}
    />
  );
};
