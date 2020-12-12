import React from "react";
import { Route } from "react-router-dom";

import Account from "../Account";
import Loading from "../Loading";
import Login from "../Login";
import Posts from "../Posts";

const Routes = () => {
  return (
    <>
      <Route path="/" component={Loading} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/account" component={Account} />
    </>
  );
};

export default Routes;
