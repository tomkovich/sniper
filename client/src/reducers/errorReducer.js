import {
  EDIT_USER_FAILED,
  FETCH_USER_FAILED,
  UPDATE_USER_FAILED,
  USER_LOGIN_FAILED,
  USER_LOGOUT_FAILED,
  USER_SIGNUP_FAILED,
} from "../actions/types";

const initialState = {
  loginError: "",
  loggout: "",
  signupError: "",
  stripeError: "",
  credentialsError: "",
};

export const errorReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case USER_LOGIN_FAILED:
      return {
        ...state,
        loginError: action.payload,
      };
    case FETCH_USER_FAILED:
      return {
        ...state,
        loggout: action.payload,
      };
    case UPDATE_USER_FAILED:
      return {
        ...state,
        stripeError: action.payload,
      };
    case USER_SIGNUP_FAILED:
    case USER_LOGOUT_FAILED:
      return {
        ...state,
        signupError: action.payload,
      };
    case EDIT_USER_FAILED: {
      return {
        ...state,
        credentialsError: action.payload,
      };
    }
    default:
      return state;
  }
};
