import GlobalStyles from "./components/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Poll } from "./components/Poll/Poll"
import styled from "styled-components";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <Header />
        <PageContent>
        <Poll />
        </PageContent>
        <Footer />
      </PageContainer>
    </>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;


const PageContent = styled.div`
  flex: 1;
  padding: 0 150px;
`;
