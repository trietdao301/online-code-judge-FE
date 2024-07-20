import React, { useState } from "react";
import { CodeSandboxOutlined, CodepenOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";
import "./CustomHeader.css";

const { Title } = Typography;

interface CustomHeaderProps {
  collapsed: boolean;
}

export const CustomHeader: React.FC<CustomHeaderProps> = ({ collapsed }) => {
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [switchState, setSwitchState] = useState<boolean>(false);
  const handleClick = () => {
    setSwitchState(!switchState);
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div
      style={{
        fontSize: 15,
        color: "white",
        display: "flex",
        flexDirection: "row",
        gap: 15,
        height: 64,
        cursor: "pointer",
        alignItems: "center",
      }}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="custom-header"
      tabIndex={1}
    >
      <div
        style={{ position: "relative", width: 24, height: 24, marginLeft: 20 }}
      >
        <CodepenOutlined
          style={{
            position: "absolute",
            transform: "scale(1.5)",
            transition: "all 0.2s ease-in",
            opacity: collapsed ? 1 : 0,
            marginLeft: collapsed ? "12px" : "0px",
          }}
          className={collapsed ? "icon-rotate" : ""}
        />
        <CodeSandboxOutlined
          style={{
            position: "absolute",
            transform: "scale(1.5)",
            transition: "all 0.2s ease-in",
            opacity: collapsed ? 0 : 1,
            marginLeft: collapsed ? "12px" : "0px",
          }}
          className={collapsed ? "icon-rotate" : ""}
        />
      </div>

      <div className={collapsed ? "header-title-collasped" : "header-title"}>
        Cobox
      </div>
    </div>
  );
};
