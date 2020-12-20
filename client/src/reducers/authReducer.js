import {
  FETCH_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  USER_SIGNUP_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  user: null,
  isLoaded: false,
};

export const authReducer = (store = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case UPDATE_USER_SUCCESS:
    case USER_SIGNUP_SUCCESS:
    case USER_LOGOUT_SUCCESS:
    case USER_LOGIN_SUCCESS:
    case FETCH_USER_SUCCESS: {
      return {
        ...store,
        user: action.payload,
        isLoaded: true,
      };
    }
    default:
      return { ...store };
  }
};
