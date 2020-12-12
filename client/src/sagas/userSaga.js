import { put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER,
  USER_LOGIN,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
} from "../actions/types";
import { request } from "../utils/request";

function* loginUserSaga({ payload }) {
  try {
    const response = yield request("/api/login", "POST", payload);
    const body = yield response.json();

    if (response.ok) {
      yield put({
        type: USER_LOGIN_SUCCESS,
        payload: body.data,
      });

      window.location = "/";
    }
    yield put({
      type: USER_LOGIN_FAILED,
      payload: body.message,
    });
  } catch (err) {
    yield put({
      type: USER_LOGIN_FAILED,
      payload: err,
    });
  }
}

export function* watchLoginUserSaga() {
  yield takeLatest(USER_LOGIN, loginUserSaga);
}

function* fetchUserSaga() {
  try {
    const response = yield request("/api/me");
    const body = yield response.json();

    if (response.ok) {
      yield put({
        type: FETCH_USER_SUCCESS,
        payload: body.data,
      });
    }
    yield put({
      type: FETCH_USER_FAILED,
      payload: body.message,
    });
  } catch (err) {
    yield put({
      type: FETCH_USER_FAILED,
      payload: err,
    });
  }
}

export function* watchFetchUserSaga() {
  yield takeLatest(FETCH_USER, fetchUserSaga);
}

export default [watchLoginUserSaga, watchFetchUserSaga];
