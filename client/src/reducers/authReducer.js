import { FETCH_USER } from "../actions/types";

const initialState = {
  user: null,
};

export const authReducer = (store = initialState, action) => {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...store,
        user: action.payload,
      };
    }
    default:
      return { ...store };
  }
};
