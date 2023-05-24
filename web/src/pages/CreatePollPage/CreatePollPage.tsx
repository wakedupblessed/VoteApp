import styled from "styled-components";
import { Provider } from "react-redux";
import { store } from "../../store/index";
import PollCreate from "../../components/PollCreate/PollCreate";

const CreatePollPage = () => {
  return (
    <PollCreateArea>
      <Provider store={store}>
        <PollCreate />
      </Provider>
    </PollCreateArea>
  );
};

const PollCreateArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  flex-direction: column;
  gap: 20px;
`;

export default CreatePollPage;
