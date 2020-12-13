import axios from "axios";

import { UPDATE_USER_FAILED, UPDATE_USER_SUCCESS } from "./types";

export const handleToken = ({ token, amount }) => async (dispatch) => {
  try {
    const stripeToken = await axios.post("/api/stripe", { token, amount });

    dispatch({
      type: UPDATE_USER_SUCCESS,
      payload: stripeToken.data.data,
    });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_FAILED,
      payload: "Invalid stripe token",
    });
  }
};
