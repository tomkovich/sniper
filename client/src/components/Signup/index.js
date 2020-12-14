import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import signup from "../../assets/images/signup.jpg";
import { Button, capitalize, Typography } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { USER_SIGNUP } from "../../actions/types";

import { isNotEmptyField, isValidEmail } from "../../utils/validation";
import { ValidationError } from "../../utils/vatidationError";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    maxWidth: 800,
    margin: "20px auto",
    border: "1px solid #c3c3c3",
    borderRadius: 4,
  },
  image: {
    width: "40%",
    background: `url(${signup}) center/cover  no-repeat`,
  },
  form: {
    padding: 30,
    width: "60%",
  },
  input: {
    width: "100%",
    marginBottom: 15,
  },
  subtitle: {
    margin: "30px auto",
  },
  signupLink: {
    "& a": {
      textDecoration: "none",
      color: theme.colors.link,
      fontWeight: 600,
    },
  },
  actions: {
    marginTop: 35,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  error: {
    color: "#f44336",
  },
}));

const Signup = ({ signup, error, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    error && setErrors({ ...errors, signupError: error });
  }, [error]);

  useEffect(() => {
    user && history.push("/");
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    const field = `${[name]}Error`;
    errors && setErrors({ ...errors, [field]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isValidName = isNotEmptyField(values.name);
    const isValidEmailField = isValidEmail(values.email);
    const isValidPassword = isNotEmptyField(values.password);
    const isValidConfirmPassword = isNotEmptyField(values.confirmPassword);

    setErrors({
      nameError: isValidName ? "" : "Name must not be empty",
      emailError: isValidEmailField ? "" : "Email is not valid",
      passwordError: isValidPassword ? "" : "Password must not be empty",
      confirmPasswordError: isValidConfirmPassword
        ? ""
        : "Confirm Password must not be empty",
    });

    if (
      !isValidName ||
      !isValidEmailField ||
      !isValidPassword ||
      !isValidConfirmPassword
    )
      return;

    signup({ ...values });
  };

  return (
    <div className={classes.root}>
      <form
        className={classes.form}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className={classes.subtitle}>
          <Typography variant="body2" style={{ height: 20 }}>
            {values.name}
          </Typography>
          <Typography variant="h6">Create a new account</Typography>
        </div>
        <TextField
          id="name"
          label="Name"
          value={values.name}
          name="name"
          className={classes.input}
          variant="outlined"
          onChange={handleChange}
          error={errors?.nameError ? true : false}
          helperText={errors?.nameError}
        />
        <TextField
          id="email"
          label="Email"
          value={values.email}
          name="email"
          className={classes.input}
          variant="outlined"
          onChange={handleChange}
          error={errors?.emailError ? true : false}
          helperText={errors?.emailError}
        />
        <TextField
          id="password"
          label="Password"
          value={values.password}
          name="password"
          type="password"
          className={classes.input}
          variant="outlined"
          onChange={handleChange}
          error={errors?.passwordError ? true : false}
          helperText={errors?.passwordError}
        />
        <TextField
          id="confirmPassword"
          label="Confirm Password"
          value={values.confirmPassword}
          name="confirmPassword"
          type="password"
          className={classes.input}
          variant="outlined"
          onChange={handleChange}
          error={errors?.confirmPasswordError ? true : false}
          helperText={errors?.confirmPasswordError}
        />
        {errors.signupError && (
          <p className={classes.error}>{errors.signupError}</p>
        )}
        <div className={classes.actions}>
          <div className={classes.signupLink}>
            <Link to="/login">Log In</Link>
          </div>
          <Button type="submit" variant="contained" color="primary">
            Next
          </Button>
        </div>
      </form>
      <div className={classes.image}></div>
    </div>
  );
};

Signup.propTypes = {
  signup: PropTypes.func,
  error: PropTypes.string,
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    signup: (data) => dispatch({ type: USER_SIGNUP, payload: data }),
  };
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.errors.signupError,
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
