import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
  try {
    const currentUser = await axios.get("/api/current_user");
    dispatch({
      type: FETCH_USER,
      payload: currentUser.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const handleToken = (token) => async (dispatch) => {
  try {
    const stipeToken = await axios.post("/api/stripe", token);
    dispatch({
      type: FETCH_USER,
      payload: stipeToken.data,
    });
  } catch (err) {
    console.log(err);
  }
};
