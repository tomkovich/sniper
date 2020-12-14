import React from "react";
import { Route } from "react-router-dom";

import Account from "../Account";
import Login from "../Login";
import Posts from "../Posts";
import Signup from "../Signup";

const Routes = () => {
  return (
    <>
      <Route exact path="/" component={Posts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/account" component={Account} />
    </>
  );
};

export default Routes;
