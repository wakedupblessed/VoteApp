import React, { useState, useEffect, useRef } from "react";
import { ArrowDown } from "react-bootstrap-icons";
import styled from "styled-components";
import { QuestionType } from "../../api/Polls/interfaces";

export interface Option {
  id: string;
  value: string;
  onClick: () => void;
}

interface DropdownProps {
  options: Option[];
  setSelectedOption: (option: QuestionType | null) => void;
  setIsHovered: (value: boolean) => void;
}

const Dropdown = ({
  options,
  setSelectedOption,
  setIsHovered,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = useState<string>("Question type");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleDropdownToggle = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    option.onClick();
    setDropdownTitle(option.value);
    setIsOpen(false);
    setSelectedOption(QuestionType[option.id as keyof typeof QuestionType]);
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <DropdownContainer
      ref={dropdownRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <DropdownButton onClick={handleDropdownToggle}>
        {dropdownTitle}
        <ArrowDown />
      </DropdownButton>
      {isOpen && (
        <DropdownMenu>
          {options.map((option) => (
            <DropdownMenuItem
              key={option.id}
              onClick={(event: React.MouseEvent) => {
                event.stopPropagation();
                handleOptionClick(option);
              }}
            >
              {option.value}
            </DropdownMenuItem>
          ))}
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 16px;
  font-size: 16px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  svg {
    margin-left: 8px;
    width: 16px;
    height: 16px;
    color: #555;
    transition: transform 0.3s ease;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  z-index: 100;
  top: 100%;
  left: 0;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  list-style: none;
`;

export const DropdownMenuItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;

  &:hover {
    background-color: #e2e2e2;
  }
`;

export default Dropdown;
