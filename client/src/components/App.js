import React from "react";
import { BrowserRouter } from "react-router-dom";

import Header from "./Header/index";
import Routes from "./Routes";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-container">
        <Routes />
      </div>
    </BrowserRouter>
  );
};

export default App;
