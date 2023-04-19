import GlobalStyles from "./components/GlobalStyles";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import styled from "styled-components";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <Header />
        <PageContent>

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
`;
