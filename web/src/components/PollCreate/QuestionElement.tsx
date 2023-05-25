import React, { useState, useEffect, useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { debounce } from "lodash";

import { formatOption } from "../../utils/OptionsFormater";
import { StyledInput, PollElementContainer } from "../GlobalStyles";
import Dropdown from "../Dropdown/Dropdown";
import { QuestionType } from "../../api/Polls/interfaces";
import SelectElement from "../CreateQuestions/SelectElement";
import AnswerElement from "../CreateQuestions/AnswerElement";
import { update, RootState } from "../../store/questionSlice";
import { reverseFormatOption } from "../../utils/OptionsFormater";

interface QuestionElementProps {
  index: number;
}

const QuestionElement = ({ index }: QuestionElementProps) => {
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<QuestionType | null>(
    null
  );

  const questionTypeKeys = Object.keys(QuestionType).filter(key =>
    isNaN(Number(key))
  ) as (keyof typeof QuestionType)[];

  const options = useMemo(() => {
    return questionTypeKeys
      .map(key => ({
        id: key,
        value: formatOption(QuestionType[key as keyof typeof QuestionType]),
        onClick: () =>
          setSelectedOption(QuestionType[key as keyof typeof QuestionType]),
      }))
      .filter(o => o.value !== "");
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

  return (
    <PollElementContainer>
      <BaseSettings>
        <QuestionTitle
          placeholder="Question title"
          value={questionTitle}
          onChange={e => setQuestionTitle(e.target.value)}
        />
        <Dropdown options={options} setSelectedOption={setSelectedOption} />
      </BaseSettings>
      <QuestionContainer>
        {(selectedOption === QuestionType.SingleChoice ||
          selectedOption === QuestionType.MultipleChoice) && (
          <SelectElement type={selectedOption} index={index} />
        )}
        {selectedOption === QuestionType.OpenAnswer && <AnswerElement />}
      </QuestionContainer>
    </PollElementContainer>
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

export default QuestionElement;
