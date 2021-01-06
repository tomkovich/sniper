import React, { useState, useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import bg from "../../assets/images/1.jpg";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Button, Link, TextField, Typography } from "@material-ui/core";
import { EDIT_USER } from "../../actions/types";
import { isNotEmptyField, isValidEmail } from "../../utils/validation";
import BackupIcon from "@material-ui/icons/Backup";
import { uploadImage } from "../../actions";
import PasswordForm from "./PasswordForm";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    border: `1px solid #c3c3c3`,
    maxWidth: 800,
    margin: "30px auto",
    minHeight: 500,
  },
  background: {
    background: `url(${bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: 365,
  },
  image: {
    width: 100,
    height: 100,
    overflow: "hidden",
    borderRadius: "100%",
    border: "2px solid #fff",
    margin: "20px auto",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  edit: {
    content: "",
    display: "block",
    background: "rgba(0, 0, 0, .5)",
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "100%",
    opacity: 0,
    transition: "opacity .25s ease",
    cursor: "pointer",
    "&:hover": {
      opacity: 1,
    },
  },
  icon: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff",
  },
  upload: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    zIndex: -1,
  },
  account: {
    padding: 40,
    width: "60%",
  },
  input: {
    margin: "15px auto",
  },
  failed: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: 19,
  },
  changePassword: {
    margin: "10px 0",
    fontSize: 14,
    fontWeight: 700,
    color: "#3f51b5",
    cursor: "pointer",
    display: "block",
  },
});

const Account = ({ user, editUser, error, uploadPhoto }) => {
  const imageRef = useRef(null);
  const classes = useStyles();
  const [values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    photo: "default.jpg",
    id: user?._id,
  });
  const [errors, setErrors] = useState();
  const [isModal, setModal] = useState(false);

  useEffect(() => {
    if (!user) {
      window.location.href = "/";
    } else {
      user.photo?.startsWith("image")
        ? setValues({
            ...values,
            photo: `${window.location.origin}/images/users/${user.photo}`,
          })
        : setValues({ ...values, photo: user.photo });
    }
  }, [user]);

  useEffect(() => {
    error && setErrors({ ...errors, signupError: error });
  }, [error]);

  const handleChange = ({ target: { value, name } }) => {
    setErrors({ ...errors, [name]: "" });
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isNotEmptyField(values.name))
      return setErrors({
        ...errors,
        name: "Name must not have empty",
      });
    if (!isValidEmail(values.email))
      return setErrors({
        ...errors,
        email: "Email is not valid",
      });
    editUser(values);
  };

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("photo", e.target.files[0], e.target.files[0].name);
    uploadPhoto({ id: values.id, formData });
  };

  const changePassword = () => setModal(true);

  return (
    <div className={classes.container}>
      <div className={classes.background} />
      {user ? (
        <form className={classes.account} onSubmit={handleSubmit}>
          <div
            className={classes.image}
            onClick={() => imageRef.current.click()}
          >
            <img src={values.photo} alt={values.name} />
            <span className={classes.edit}>
              <BackupIcon className={classes.icon} />
            </span>
            <input
              type="file"
              className={classes.upload}
              ref={imageRef}
              onChange={uploadImage}
            />
          </div>
          <TextField
            fullWidth
            name="name"
            onChange={handleChange}
            className={classes.input}
            value={values.name}
            variant="outlined"
            label="Your Name"
            error={errors?.name ? true : false}
            helperText={errors?.name}
          />
          <TextField
            fullWidth
            name="email"
            onChange={handleChange}
            className={classes.input}
            value={values.email}
            variant="outlined"
            label="Your Email"
            error={errors?.email ? true : false}
            helperText={errors?.email}
          />
          <Link className={classes.changePassword} onClick={changePassword}>
            Change password
          </Link>
          {isModal && (
            <PasswordForm
              change={isModal}
              onClose={() => setModal(false)}
              id={user?._id}
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Save
          </Button>
        </form>
      ) : (
        <div className={classes.failed}>User is not found</div>
      )}
    </div>
  );
};

Account.propTypes = {
  user: PropTypes.object,
  editUser: PropTypes.func,
  uploadPhoto: PropTypes.func,
  error: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch({ type: EDIT_USER, payload: data }),
    uploadPhoto: (data) => dispatch(uploadImage(data)),
  };
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  error: state.errors,
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
