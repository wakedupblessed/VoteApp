import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

import {
  StyledButton,
  StyledInput,
  StyledTextArea,
  GradientContainer,
} from "../../components/GlobalStyles";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import DeadLineInput from "./DeadlineInput";

import AllowedUsers from "../AllowedUsers/AllowedUsers";
import useAuthContext from "../../сontext/hooks";

import { PollApi } from "../../api/Polls/api";

import { create, RootState } from "../../store/questionSlice";
import {
  PollDTO,
  QuestionDTO,
  OptionUpsert,
  QuestionCreate,
} from "../../store/interfaces";
import QuestionElement from "./QuestionElement";

const PollCreate = () => {
  const { user, authTokens } = useAuthContext();
  const navigate = useNavigate();

  const initialState: PollDTO = {
    poll_data: {
      title: "",
      author_id: 0,
      description: "",
      number_of_vote: 0,
      creation_date: format(new Date(), "yyyy-MM-dd"),
      end_date: "",
      is_anonymous: false,
      is_private: false,
      responders: [],
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

  const createOptionData = (option: OptionUpsert) => {
    const { title } = option;
    return { title };
  };

  const createQuestionData = (question: QuestionDTO): QuestionCreate => {
    const { title, question_type = "OpenAnswer" } = question.question_info;

    const question_info = { title, question_type };

    if (question_type === "OpenAnswer") {
      return { question_info };
    }

    const option_data = question.option_data?.map(createOptionData);

    return { question_info, option_data };
  };

  const addEndDateIfNotPresent = (pollData: PollDTO) => {
    if (!pollData.poll_data.end_date) {
      let creationDate = new Date(pollData.poll_data.creation_date);
      creationDate.setDate(creationDate.getDate() + 30);
      pollData.poll_data.end_date = format(creationDate, "yyyy-MM-dd");
    }
  };

  const addRespondersIfPrivate = (pollData: PollDTO) => {
    if (pollData.poll_data.is_private) {
      pollData.poll_data.responders = allowedUsers;
    }
  };

  const addAuthorId = (pollData: PollDTO) => {
    if (user) {
      pollData.poll_data.author_id = user.user_id;
    }
  };

  const createPoll = async () => {
    var pollData = formState;
    pollData.question_data = questions.map(createQuestionData);

    addEndDateIfNotPresent(pollData);
    addRespondersIfPrivate(pollData);
    addAuthorId(pollData);

    if (authTokens) {
      const result = await PollApi.create(pollData, authTokens?.access!);
      if (result) {
        navigate("/");
      }
    } else {
      alert("Something went wrong");
    }
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
        <GradientContainer>
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
        </GradientContainer>
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
