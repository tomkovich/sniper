import "./styles/custom.css";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import { MuiThemeProvider } from "@material-ui/core";

import reducers from "./reducers";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { THEME } from "./styles/theme";
import rootSagas, { sagaMiddleware } from "./sagas";

const middlewares = [reduxThunk, sagaMiddleware];

const store = createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

sagaMiddleware.run(rootSagas);

ReactDOM.render(
  <MuiThemeProvider theme={THEME}>
    <Provider store={store}>
      <App />
    </Provider>
  </MuiThemeProvider>,
  document.getElementById("root")
);

reportWebVitals();
