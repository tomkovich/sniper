import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { FETCH_USER } from "../actions/types";

import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loader: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const WithLoading = ({ children, user, error, fetchUser }) => {
  const classes = useStyles();
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const loaderMarkup = (
    <div className={classes.loader}>
      <CircularProgress />
    </div>
  );

  return !user && !error ? loaderMarkup : children;
};

WithLoading.propTypes = {
  user: PropTypes.object,
  error: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.errors.loggout,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (data) => dispatch({ type: FETCH_USER, data }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(WithLoading);
