import styled from "styled-components";
import { debounce } from "lodash";
import { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import OptionElement from "./OptionElement";
import { QuestionType } from "../../api/Polls/interfaces";
import {
  addQuestionOption,
  updateQuestionOption,
  deleteQuestionOption,
  RootState,
} from "../../store/questionSlice";

import { OptionDataUpsert, OptionDataDelete } from "../../store/interfaces";

interface SelectElementProps {
  type: QuestionType.MultipleChoice | QuestionType.SingleChoice;
  index: number;
}

const SelectElement = ({ type, index }: SelectElementProps) => {
  const options = useSelector(
    (state: RootState) => state.questions.questionsData[index].option_data
  );
  const lastOptionRef = useRef<HTMLInputElement>(null);

  const handleFakeOption = () => {
    const newOption: OptionDataUpsert = {
      title: `Variant ${options!.length}`,
      questionIndex: index,
      optionIndex: options!.length,
    };
    dispatch(addQuestionOption(newOption));
  };

  const dispatch = useDispatch();

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: OptionDataUpsert) => {
        dispatch(updateQuestionOption(value));
      }, 500),
    [dispatch]
  );

  const handleOptionUpdate = (value: OptionDataUpsert) => {
    debouncedUpdate(value);
  };

  const handleOptionDelete = (option: OptionDataDelete) => {
    dispatch(deleteQuestionOption(option));
  };

  useEffect(() => {
    if (lastOptionRef.current) {
      lastOptionRef.current.focus();
    }
  }, [options]);

  return (
    <Container>
      {options!.map((option) => (
        <OptionElement
          key={option.optionIndex}
          type={type}
          value={option.title}
          onChange={(value) => {
            const updatedOption = { ...option, title: value };
            handleOptionUpdate(updatedOption);
          }}
          onDelete={() => handleOptionDelete(option)}
          inputRef={
            option.optionIndex === options!.length - 1 ? lastOptionRef : null
          }
        />
      ))}
      <OptionElement
        type={type}
        placeholder='Add variant'
        handleFakeOption={handleFakeOption}
        inputRef={lastOptionRef}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 0px 10px;
`;

export default SelectElement;
