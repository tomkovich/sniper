import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { USER_LOGOUT } from "../../actions/types";

const Logout = ({ logout }) => {
  useEffect(() => logout(), []);
  return <Redirect to="/" />;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch({ type: USER_LOGOUT }),
  };
};

export default connect(null, mapDispatchToProps)(Logout);
