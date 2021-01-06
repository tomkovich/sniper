import axios from "axios";

import {
  UPDATE_USER_FAILED,
  UPDATE_USER_SUCCESS,
  UPLOAD_IMAGE_SUCCESS,
  UPLOAD_IMAGE_FAILED,
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

export const uploadImage = ({ id, formData }) => async (dispatch) => {
  try {
    const uploadedImage = await axios.patch(`/api/user/${id}`, formData);

    dispatch({
      type: UPLOAD_IMAGE_SUCCESS,
      payload: uploadedImage.data.data.data,
    });
  } catch (err) {
    dispatch({
      type: UPLOAD_IMAGE_FAILED,
      payload: "Image dont't be uploaded",
    });
  }
};
