import React, { ReactElement } from "react";
import styled from "styled-components";

export interface HeaderLinkStyle {
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
}

interface HeaderLinkProps {
  label: string;
  onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  headerLinkStyle?: HeaderLinkStyle;
}

const HeaderLink = (props: HeaderLinkProps): ReactElement => {
  const defaultLinkStyle: HeaderLinkStyle = {
    backgroundColor: "white",
    textColor: "black",
    hoverBackgroundColor: "rgba(255, 255, 255, 0.8)",
  };

  const finalLinkStyle = { ...defaultLinkStyle, ...props.headerLinkStyle };

  return (
    <StyledHeaderLink onClick={props.onClick} {...finalLinkStyle}>
      {props.label}
    </StyledHeaderLink>
  );
};

export default HeaderLink;

const StyledHeaderLink = styled.a<HeaderLinkStyle>`
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

  &:last-child{
    padding:0;
  }
`;
