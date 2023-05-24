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

import { QuestionType } from "../../api/Polls/interfaces";
import {
  StyledButton,
  StyledInput,
  StyledTextArea,
  PollElementContainer,
} from "../../components/GlobalStyles";

import CustomCheckBox from "../CustomCheckBox/CustomCheckBox";
import DeadLineInput from "./DeadlineInput";
import AllowedUsersInput from "../AllowedUsers/AllowedUsersInput";
import AuthContext from "../../сontext/AuthContext";
import { AuthProvider } from "../../сontext/AuthProvider";
import { PollData } from "../../api/Polls/interfaces";
// import AllowedUsersList from "../AllowedUsers/AllowedUsersList";
import { create, RootState } from "../../store/questionSlice";
import QuestionElement from "./QuestionElement";

const PollCreate = () => {
  const [formState, setFormState] = useState<PollData>({
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
  });

  const dispatch = useDispatch();
  const questions = useSelector(
    (state: RootState) => state.questions.questionsData
  );

  const addQuestion = () => {
    const newIndex = questions.length;
    dispatch(
      create({
        question_info: { index: newIndex, title: "", question_type: null },
        option_data: [],
      })
    );
  };

  return (
    <>
      <PollCreateContainer>
        {questions.map((question) => (
          <QuestionElement
            key={question.question_info.index}
            index={question.question_info.index}
          />
        ))}
        <StyledButton onClick={addQuestion} type='button'>
          Add Question
        </StyledButton>
      </PollCreateContainer>
    </>
  );
};

{
  // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormState({
  //     ...formState,
  //     poll_data: {
  //       ...formState.poll_data,
  //       [event.target.name]: event.target.value,
  //     },
  //   });
  // };
  /* <PollElementContainer>
          <PollTitleInput
            id='poll-title'
            type='text'
            name='title'
            placeholder='Enter poll title'
            value={formState.poll_data.title}
            onChange={handleInputChange}
          />
          <StyledTextArea
            id='poll-description'
            name='description'
            placeholder='Enter poll description'
            value={formState.poll_data.description}
            onChange={handleInputChange}
          />
          <DeadLineInput
            onChange={(date) =>
              setFormState({
                ...formState,
                poll_data: {
                  ...formState.poll_data,
                  end_date: date ? date : null,
                },
              })
            }
          />
          <CustomCheckBox
            id='anonymous'
            label='Anonymous Voting'
            onChange={(checked) =>
              setFormState({
                ...formState,
                poll_data: {
                  ...formState.poll_data,
                  is_anonymous: checked,
                },
              })
            }
          />
          {/* <AllowedUsersInput
            users={formState.poll_data.responders}
            setUsers={(users) =>
              setFormState({
                ...formState,
                poll_data: {
                  ...formState.poll_data,
                  responders: users,
                },
              })
            }
         </PollElementContainer> 
        //   /> */
}
{
  /* {pollElements}
        <StyledButton onClick={addQuestion} type='button'>
          Add Question
        </StyledButton>
        <StyledButton type='button'>Log Poll Data</StyledButton> */
}

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
