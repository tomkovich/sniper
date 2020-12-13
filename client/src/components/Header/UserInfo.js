import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import StripeCheckout from "react-stripe-checkout";
import { connect } from "react-redux";
import { Avatar, makeStyles, Typography, Button } from "@material-ui/core";

import { capitalize } from "../../utils/capitalize";
import { handleToken } from "../../actions";

import { STRIPE_PAY } from "../../constans/stripePay";

const useStyles = makeStyles((theme) => ({
  userInfo: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.colors.sidebar,
    padding: 10,
    borderRadius: 6,
  },
  accountLink: {
    fontSize: 13,
    color: "#fff",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  credits: {
    marginLeft: 10,
    fontSize: 13,
    // boxShadow: `2px 2px 10px ${theme.palette.secondary.light}`,
  },
}));

const UserInfo = ({ user, updateStripeToken }) => {
  const classes = useStyles();

  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    user?.photo.startsWith("image")
      ? setPhotoURL(`http://localhost:5000/public/img/${user.photo}`)
      : setPhotoURL(user.photo);
  }, []);

  return (
    <div className={classes.userInfo}>
      <Link to="/account" className={classes.accountLink}>
        <Avatar src={photoURL} />
        <Typography style={{ marginLeft: 10, fontSize: 14, fontWeight: 600 }}>
          {capitalize(user.name)}
        </Typography>
      </Link>
      <StripeCheckout
        name="Sniper"
        description={`You pay $${STRIPE_PAY / 100}`}
        amount={STRIPE_PAY}
        token={(token) => updateStripeToken(token, STRIPE_PAY)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <Button
          className={classes.credits}
          variant="contained"
          color="secondary"
        >
          <span>{`Your Credits: $${user.credits}`}</span>
        </Button>
      </StripeCheckout>
    </div>
  );
};

UserInfo.propTypes = {
  updateStripeToken: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStripeToken: (token, amount) =>
      dispatch(handleToken({ token, amount })),
  };
};

export default connect(null, mapDispatchToProps)(UserInfo);
