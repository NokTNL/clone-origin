import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/mainStore";

import App from "./App";
// normalize.css + global styles
import "./index.css";
// Bootstrap icons
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
