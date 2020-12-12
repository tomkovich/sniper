import { FETCH_USER_SUCCESS, USER_LOGIN_SUCCESS } from "../actions/types";

const initialState = {
  user: null,
};

export const authReducer = (store = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
    case FETCH_USER_SUCCESS: {
      return {
        ...store,
        user: action.payload,
      };
    }
    default:
      return { ...store };
  }
};
