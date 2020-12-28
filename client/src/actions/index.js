import axios from "axios";

import {
  GET_USER_FAILED,
  GET_USER_SUCCESS,
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
} from "./types";

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

export const getUserAction = ({ _user }) => async (dispatch) => {
  try {
    const user = await axios.get(`/user/${_user}`);

    dispatch({
      type: GET_USER_SUCCESS,
      payload: user,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_FAILED,
      payload: "User don't exist",
    });
  }
};
