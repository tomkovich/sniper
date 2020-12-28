import { put, takeLatest } from "redux-saga/effects";
import { request } from "../utils/request";

import {
  FETCH_POSTS,
  FETCH_POSTS_FAILED,
  FETCH_POSTS_SUCCESS,
  GET_USER,
  GET_USER_SUCCESS,
} from "../actions/types";
import { getUserSaga } from "./userSaga";
import { getUserAction } from "../actions";

function* getPostsSaga() {
  try {
    const response = yield request("/api/recipes", "GET");
    const body = yield response.json();

    if (response.ok) {
      const posts = body.data.data.map((post) => {
        const user = yield put({
            type: GET_USER_SUCCESS,
            payload: user._user
        })
        console.log(user);
        return { ...post, _user: user };
      });

      yield put({
        type: FETCH_POSTS_SUCCESS,
        payload: posts,
      });
    } else {
      yield put({
        type: FETCH_POSTS_FAILED,
        payload: body.message,
      });
    }
  } catch (err) {
    yield put({
      type: FETCH_POSTS_FAILED,
      payload: err,
    });
  }
}

export function* watchGetPostsSaga() {
  yield takeLatest(FETCH_POSTS, getPostsSaga);
}

export default [getPostsSaga];
