import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import "./index.css";
import theme from "./theme";
import App from "./App";
import { store } from "./store/store";

ReactDOM.render(
  // <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById("root")
);
