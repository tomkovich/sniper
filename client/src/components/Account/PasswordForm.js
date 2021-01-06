import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { connect } from "react-redux";
import { Button, TextField } from "@material-ui/core";
import { UPDATE_USER_PASSWORD } from "../../actions/types";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
  },
  fade: {
    outline: "none",
  },
  paper: {
    backgroundColor: "#fff",
    padding: theme.spacing(2, 4, 3),
    border: "none",
    "&:focus": {
      outline: "none",
    },
  },
  input: {
    margin: "15px auto",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const PasswordForm = ({ change, onClose, updatePassword, id }) => {
  const classes = useStyles();
  const [values, setValues] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
    id,
  });
  const [errors, setErrors] = useState();
  const handleChange = ({ target: { value, name } }) => {
    setValues({ ...values, [name]: value });
  };

  const handleClose = () => onClose();

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword({ ...values });
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={change}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={change} className={classes.fade}>
          <div className={classes.paper}>
            <h2 id="spring-modal-title">Change Password</h2>
            <form>
              <TextField
                autoComplete="off"
                fullWidth
                name="currentPassword"
                onChange={handleChange}
                className={classes.input}
                value={values.currentPassword}
                variant="outlined"
                label="Your Current Password"
                error={errors?.currentPassword ? true : false}
                helperText={errors?.currentPassword}
                placeholder="********"
              />
              <TextField
                autoComplete="off"
                fullWidth
                name="password"
                onChange={handleChange}
                className={classes.input}
                value={values.password}
                variant="outlined"
                label="Your Password"
                error={errors?.password ? true : false}
                helperText={errors?.password}
                placeholder="********"
              />
              <TextField
                autoComplete="off"
                fullWidth
                name="confirmPassword"
                onChange={handleChange}
                className={classes.input}
                value={values.confirmPassword}
                variant="outlined"
                label="Confirm Password"
                error={errors?.confirmPassword ? true : false}
                helperText={errors?.confirmPassword}
              />
              <Button
                variant="contained"
                color="primary"
                type="button"
                onClick={handleSubmit}
              >
                Update
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (data) =>
      dispatch({ type: UPDATE_USER_PASSWORD, payload: data }),
  };
};

export default connect(null, mapDispatchToProps)(PasswordForm);
