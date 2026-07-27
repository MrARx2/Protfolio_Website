import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { applyTheme, getInitialTheme } from "./data/themes";

applyTheme(getInitialTheme());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
