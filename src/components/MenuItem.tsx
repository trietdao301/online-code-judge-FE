import React, { CSSProperties, MouseEventHandler, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import { GithubFilled } from "@ant-design/icons";
interface MenuItemProps {
  content: string;
  collapsed: boolean;
  Icon?: any;
  className: string;
  link?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  content,
  collapsed,
  Icon,
  className,
  link,
  onClick,
}) => {
  const computedClassName = `${className}${collapsed ? "-collapsed" : ""}`;
  return (
    <NavLink
      className={computedClassName}
      to={link ? link : ""}
      onClick={onClick}
    >
      <Icon className={collapsed ? "menu-icon-collapsed" : "menu-icon"} />

      <div
        className={collapsed ? "menu-item-name-collapsed" : "menu-item-name"}
      >
        {collapsed ? <div>{content} </div> : <div>{content} </div>}
      </div>
    </NavLink>
  );
};
