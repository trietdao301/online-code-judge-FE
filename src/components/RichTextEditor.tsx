import {
  LoadingOutlined,
  PicCenterOutlined,
  SyncOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

interface RichTextEditorProps {
  style?: React.CSSProperties;
  onContentValue?: (content: string) => void;
}
export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  style,
  onContentValue,
}) => {
  const [value, setValue] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  function handleOnChangeValue(value: string) {
    if (onContentValue) {
      onContentValue(value);
    }
    setValue(value);
  }
  return (
    <>
      <ReactQuill
        theme="snow"
        onChange={(value) =>
          onContentValue ? handleOnChangeValue(value) : undefined
        }
        modules={modules}
        formats={formats}
        style={style ? style : {}}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />

      <div style={{ display: "flex" }}>
        {value !== "" ? (
          <SyncOutlined
            spin
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              marginTop: "5px",
              color: "#1677ff",
            }}
          />
        ) : focus ? (
          <PicCenterOutlined
            style={{
              marginLeft: "auto",
              marginRight: "10px",
              marginTop: "5px",
            }}
          />
        ) : (
          <div style={{ height: "19px", marginLeft: "auto" }}></div>
        )}
      </div>
    </>
  );
};
