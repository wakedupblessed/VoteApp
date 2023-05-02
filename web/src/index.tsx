import ReactDOM from "react-dom/client";
import App from "./App";

import { PollBrowse } from "./pages/PollBrowse/PollBrowse";
import { PollDetail } from "./pages/PollDetail/PollDetail";
import { NotFound } from "./pages/NotFound/NotFound";
import { Route, BrowserRouter, Routes } from "react-router-dom";

const rootDiv = document.getElementById("root") as HTMLElement;

const reactRoot = ReactDOM.createRoot(rootDiv);

reactRoot.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/' element={<PollBrowse />} />
          <Route path='/polls/:pollId' element={<PollDetail />} />
          <Route path='/polls/create' element={<PollBrowse />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
