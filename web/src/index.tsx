import ReactDOM from "react-dom/client";
import App from "./App";

const rootDiv = document.getElementById("root") as HTMLElement;

const reactRoot = ReactDOM.createRoot(rootDiv);

reactRoot.render(<App />);
