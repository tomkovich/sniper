import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Material UI Components
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Button, IconButton, Tooltip, Typography } from "@material-ui/core";
import KeyboardReturnIcon from "@material-ui/icons/KeyboardReturn";

import login from "../../assets/images/login.jpg";
import { isNotEmptyField, isValidEmail } from "../../utils/validation";
import { USER_LOGIN } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  margin: {
    width: "100%",
  },
  form: {
    width: "60%",
    padding: "15px 20px 30px 20px",
    position: "relative",
  },
  logo: {
    margin: "24px auto",
    width: 50,
  },
  subtitle: {
    margin: "30px auto",
  },
  image: {
    width: "40%",
    background: `url(${login})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  flex: {
    display: "flex",
    maxWidth: 800,
    margin: "20px auto",
    border: "1px solid #c3c3c3",
    borderRadius: 4,
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
  return: {
    position: "absolute",
    top: "33px",
    right: "20px",
  },
}));

const Login = ({ login, error, user }) => {
  const classes = useStyles();
  const history = useHistory();
  const [loginError, setLoginError] = useState(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [isEmail, setEmail] = useState(false);

  useEffect(() => {
    error.loginError && setLoginError(error.loginError);
  }, [error]);

  useEffect(() => {
    user && history.push("/");
  });

  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
    setLoginError("");
  };

  const handleSubmit = () => {
    if (!isNotEmptyField(values.password))
      return setLoginError("Password must not be empty");
    login({ ...values });
  };

  const handleClick = () => {
    if (!isValidEmail(values.email)) return setLoginError("Email is invalid");
    !isEmail ? setEmail(true) : handleSubmit();
  };

  const handleBack = () => {
    setEmail(false);
    setValues({ email: values.email, password: "" });
  };

  return (
    <div className={classes.flex}>
      <div className={classes.image}></div>
      <div className={classes.form}>
        {isEmail && (
          <Tooltip title="Back To Email">
            <IconButton className={classes.return} onClick={handleBack}>
              <KeyboardReturnIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
        <div className={classes.subtitle}>
          <Typography variant="body2">
            {isEmail ? values.email : "Sniper"}
          </Typography>
          <Typography variant="h6">Log In Your Account</Typography>
        </div>
        {!isEmail ? (
          <FormControl className={classes.margin}>
            <InputLabel error={loginError ? true : false} htmlFor="email">
              {loginError ? loginError : "Email"}
            </InputLabel>
            <Input
              id="email"
              name="email"
              value={values.email}
              type="email"
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        ) : (
          <FormControl className={classes.margin}>
            <InputLabel error={loginError ? true : false} htmlFor="password">
              {loginError ? loginError : "Password"}
            </InputLabel>
            <Input
              id="password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              startAdornment={
                <InputAdornment position="start">
                  <LockOpenIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        )}
        <div className={classes.actions}>
          <div className={classes.signupLink}>
            <Link to="/signup">Create Account</Link>
          </div>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  error: PropTypes.object,
  login: PropTypes.func,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  error: state.errors,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data) => dispatch({ type: USER_LOGIN, payload: data }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
