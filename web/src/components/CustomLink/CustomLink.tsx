import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

export interface HeaderLinkStyle {
  backgroundcolor: string;
  textcolor: string;
  hoverbackgroundcolor: string;
}

interface HeaderLinkProps {
  label: string;
  route: string;
  headerLinkStyle?: HeaderLinkStyle;
  onClick?: () => void;
}

const CustomLink = ({
  label,
  route,
  headerLinkStyle,
  onClick,
}: HeaderLinkProps): ReactElement => {
  const defaultLinkStyle: HeaderLinkStyle = {
    backgroundcolor: "white",
    textcolor: "black",
    hoverbackgroundcolor: "rgba(255, 255, 255, 0.8)",
  };

  const finalLinkStyle = { ...defaultLinkStyle, ...headerLinkStyle };

  return (
    <StyledLink {...finalLinkStyle} to={route} onClick={onClick}>
      {label}
    </StyledLink>
  );
};

export default CustomLink;

const StyledLink = styled(Link)<HeaderLinkStyle>`
  text-decoration: none;
  display: inline-block;
  color: #000;
  padding: 0 40px 0 0;
  font-size: 26px;

  &::after {
    content: "";
    display: block;
    width: 0;
    height: 2px;
    background: #000;
    transition: width 0.3s;
  }
  &:hover {
    cursor: pointer;
  }

  &:hover::after {
    width: 100%;
    transition: width 0.3s;
  }

  &:last-child {
    padding: 0;
  }
`;
