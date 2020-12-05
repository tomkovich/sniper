import React, { useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";

import { fetchUser } from "../actions";

import Header from "./Header";
import Landing from "./Landing";
import Posts from "./Posts";

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Landing} />
      <Route exact path="/posts" component={Posts} />
    </BrowserRouter>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
  };
};

export default connect(null, mapDispatchToProps)(App);
