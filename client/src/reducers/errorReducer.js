import { FETCH_USER_FAILED, USER_LOGIN_FAILED } from "../actions/types";

const initialState = {
  loginError: "",
  loggout: "",
};

export const errorReducer = (state = initialState, action) => {
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
    default:
      return state;
  }
};
