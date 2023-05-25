import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format, isValid } from "date-fns";

import {
  StyledButton,
  StyledInput,
  StyledTextArea,
  PollElementContainer,
} from "../../components/GlobalStyles";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import DeadLineInput from "./DeadlineInput";

import AllowedUsers from "../AllowedUsers/AllowedUsers";
import AuthContext from "../../сontext/AuthContext";
import { AuthProvider } from "../../сontext/AuthProvider";

import { PollData } from "../../api/Polls/interfaces";
import { create, RootState } from "../../store/questionSlice";
import { QuestionData } from "../../api/Polls/interfaces";
import { QuestionDataDTO, OptionDataUpsert } from "../../store/interfaces";
import QuestionElement from "./QuestionElement";

const PollCreate = () => {
  const initialState: PollData = {
    poll_data: {
      title: "",
      author_id: 0,
      description: "",
      number_of_vote: 0,
      creation_date: format(new Date(), "yyyy-MM-dd"),
      end_date: "",
      is_anonymous: false,
      is_private: false,
    },
    question_data: [],
  };

  const [formState, setFormState] = useState(initialState);
  const [allowedUsers, setAllowedUsers] = useState<number[]>([]);

  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.questions.questionsData
  );

  const updateFormState = (field: string, value: string | boolean | null) => {
    setFormState(prevState => ({
      ...prevState,
      poll_data: { ...prevState.poll_data, [field]: value },
    }));
  };

  const addQuestion = () => {
    const newIndex = questions.length;
    dispatch(
      create({
        question_info: { index: newIndex, title: "", question_type: null },
        option_data: [],
      })
    );
  };

  const createQuestionData = (question: QuestionDataDTO): QuestionData => {
    const question_info = {
      title: question.question_info.title,
      question_type: question.question_info.question_type || "OpenAnswer",
    };

    if (question_info.question_type === "OpenAnswer") {
      return {
        question_info,
      };
    }

    const option_data = question.option_data?.map(
      (option: OptionDataUpsert) => {
        return {
          title: option.title,
        };
      }
    );

    return {
      question_info,
      option_data,
    };
  };

  const createPoll = () => {
    var pollData = formState;
    pollData.question_data = questions.map(createQuestionData);
    if (pollData.poll_data.is_private) {
      pollData.poll_data.responders = allowedUsers;
    }
    console.log(pollData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateFormState(event.target.name, event.target.value);
  };

  const handleCheckBoxChange = (field: string, checked: boolean) => {
    updateFormState(field, checked);
  };

  return (
    <>
      <PollCreateContainer>
        <PollElementContainer>
          <PollTitleInput
            id="poll-title"
            name="title"
            placeholder="Enter poll title"
            value={formState.poll_data.title}
            onChange={handleInputChange}
          />
          <StyledTextArea
            id="poll-description"
            name="description"
            placeholder="Enter poll description"
            value={formState.poll_data.description}
            onChange={handleInputChange}
          />
          <DeadLineInput
            onChange={date => updateFormState("end_date", date ? date : null)}
          />
          <CustomCheckBox
            id="anonymous"
            label="Anonymous Voting"
            onChange={checked => handleCheckBoxChange("is_anonymous", checked)}
          />
          <CustomCheckBox
            id="private"
            label="Private Vote"
            onChange={checked => handleCheckBoxChange("is_private", checked)}
          />
        </PollElementContainer>
        {formState.poll_data.is_private && (
          <AllowedUsers setAllowedUsers={setAllowedUsers} />
        )}
        {questions.map(question => (
          <QuestionElement
            key={question.question_info.index}
            index={question.question_info.index}
          />
        ))}
        <StyledButton onClick={addQuestion} type="button">
          Add Question
        </StyledButton>
        <StyledButton type="button" onClick={createPoll}>
          Create survey
        </StyledButton>
      </PollCreateContainer>
    </>
  );
};

const PollCreateContainer = styled.div`
  flex-direction: column;
  display: flex;
  gap: 20px;
  align-items: end;
`;

const PollTitleInput = styled(StyledInput)`
  width: auto;
`;

export default PollCreate;
