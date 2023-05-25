import ReactDOM from "react-dom/client";
import App from "./App";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import { PollBrowse } from "./pages/PollBrowse/PollBrowse";
import { PollDetail } from "./pages/PollDetail/PollDetail";
import { NotFound } from "./pages/NotFound/NotFound";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import CreatePollPage from "./pages/CreatePollPage/CreatePollPage";
import PrivateRoute from "./utils/PrivateRoute/PrivateRoute";

const rootDiv = document.getElementById("root") as HTMLElement;

const reactRoot = ReactDOM.createRoot(rootDiv);

reactRoot.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<PollBrowse />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<RegisterPage />} />
          <Route path='/polls/:pollId' element={<PollDetail />} />
          <Route element={<PrivateRoute />}>
            <Route path='/polls/create' element={<CreatePollPage />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
