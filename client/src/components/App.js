import React from "react";
import { BrowserRouter } from "react-router-dom";

import WithLoading from "../hocs/WithLoading";
import Header from "./Header/index";
import Routes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <WithLoading>
        <Header />
        <div className="app-container">
          <Routes />
        </div>
      </WithLoading>
    </BrowserRouter>
  );
};

export default App;
