import React, { useState, useEffect, useContext, useMemo, useRef } from "react";
import { Trash3 as Trash } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { debounce } from "lodash";

import { formatOption } from "../../utils/OptionsFormater";
import { StyledInput, PollElementContainer } from "../GlobalStyles";
import Dropdown from "../Dropdown/Dropdown";
import { QuestionType } from "../../api/Polls/interfaces";
import SelectElement from "../CreateQuestions/SelectElement";
import AnswerElement from "../CreateQuestions/AnswerElement";
import { update, deleteQuestion, RootState } from "../../store/questionSlice";
import { reverseFormatOption } from "../../utils/OptionsFormater";

interface QuestionElementProps {
  index: number;
}

const QuestionElement = ({ index }: QuestionElementProps) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<QuestionType | null>(
    null
  );
  const [isHovered, setIsHovered] = useState(false);

  const questionTypeKeys = Object.keys(QuestionType).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof QuestionType)[];

  const options = useMemo(() => {
    return questionTypeKeys
      .map((key) => ({
        id: key,
        value: formatOption(QuestionType[key as keyof typeof QuestionType]),
        onClick: () =>
          setSelectedOption(QuestionType[key as keyof typeof QuestionType]),
      }))
      .filter((o) => o.value !== "");
  }, []);

  const dispatch = useDispatch();

  const questionOptions = useSelector(
    (state: RootState) => state.questions.questionsData[index].option_data
  );

  const debouncedUpdate = useMemo(
    () =>
      debounce((title: string, option: QuestionType | null) => {
        dispatch(
          update({
            question_info: {
              index,
              title: title,
              question_type: reverseFormatOption(option),
            },
          })
        );
      }, 2000),
    [questionOptions]
  );

  useEffect(() => {
    debouncedUpdate(questionTitle, selectedOption);
    return () => debouncedUpdate.cancel();
  }, [questionTitle, selectedOption]);

  const handleQuestionDeletion = () => {
    dispatch(deleteQuestion(index));
  };

  return (
    <QuestionPollElementContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <BaseSettings>
        <QuestionTitle
          placeholder='Question title'
          value={questionTitle}
          onChange={(e) => setQuestionTitle(e.target.value)}
        />
        <Dropdown
          options={options}
          setSelectedOption={setSelectedOption}
          setIsHovered={setIsHovered}
        />
      </BaseSettings>
      <QuestionContainer>
        {(selectedOption === QuestionType.SingleChoice ||
          selectedOption === QuestionType.MultipleChoice) && (
          <SelectElement type={selectedOption} index={index} />
        )}
        {selectedOption === QuestionType.OpenAnswer && <AnswerElement />}
      </QuestionContainer>
      <ControlContainer isHovered={isHovered}>
        <ControlDelimetr />
        <StyledTrash onClick={handleQuestionDeletion} />
      </ControlContainer>
    </QuestionPollElementContainer>
  );
};

const BaseSettings = styled.div`
  display: flex;
  gap: 10px;
`;

const QuestionTitle = styled(StyledInput)`
  flex-grow: 1;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
`;

const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: -10px;
  transition: transform 0.2s ease-in-out;
  transform-origin: top;
  transform: ${(props) => (props.isHovered ? "scaleY(1)" : "scaleY(0)")};
`;

const ControlDelimetr = styled.hr`
  border: none;
  height: 1.25px;
  background: #ccc;
  width: 100%;
`;

const StyledTrash = styled(Trash)`
  align-self: flex-end;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.25rem;
  cursor: pointer;
`;

const QuestionPollElementContainer = styled(PollElementContainer)`
  position: relative;
`;

export default QuestionElement;
