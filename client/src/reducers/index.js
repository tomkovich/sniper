import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { errorReducer } from "./errorReducer";
import { postsReducer } from "./postsReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postsReducer,
});
