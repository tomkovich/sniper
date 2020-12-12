import axios from "axios";

import { request } from "../utils/request";
import { FETCH_USER, LOGIN_USER, USER_LOGIN_FAILED } from "./types";

export const fetchUser = (payload) => async (dispatch) => {
  try {
    const { id } = payload;
    const currentUser = await axios.get(`/api/user/${id}`);
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

// export const loginUser = (data) => async (dispatch) => {
//   try {
//     const response = await request("/api/login", "POST", data);

//     const body = await response.json();
//     if (response.ok) {
//       dispatch({
//         type: LOGIN_USER,
//         payload: body.data,
//       });
//     }
//     dispatch({
//       type: USER_LOGIN_FAILED,
//       payload: body.message,
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };
