import { FETCH_POSTS_SUCCESS } from "../actions/types";

const initialState = {
  posts: [],
  isLoaded: false,
};

export const postsReducer = (store = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS: {
      return {
        ...store,
        posts: [...action.payload],
        isLoaded: true,
      };
    }
    default:
      return { ...store };
  }
};
