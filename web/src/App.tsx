import GlobalStyles from "./components/GlobalStyles";
import { Outlet } from "react-router-dom";

import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";

import styled from "styled-components";
import { AuthProvider } from "./сontext/AuthProvider";



export default function App() {
  return (
    <>
      <GlobalStyles />
      <PageContainer>
        <AuthProvider>
          <Header />
          <PageContent>
            <Outlet />
          </PageContent>
          <Footer />
        </AuthProvider>
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
