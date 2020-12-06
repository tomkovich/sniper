import React from "react";
import { connect } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

import { handleToken } from "../actions";

const Payments = ({ handleToken }) => {
  return (
    <StripeCheckout
      name="Sniper"
      description="$5 for 5 email credits"
      amount={500}
      token={(token) => handleToken(token)}
      stripeKey={process.env.REACT_APP_STRIPE_KEY}
    >
      <button className="waves-effect money-btn btn">Give money</button>
    </StripeCheckout>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleToken: (token) => dispatch(handleToken(token)),
  };
};

export default connect(null, mapDispatchToProps)(Payments);
