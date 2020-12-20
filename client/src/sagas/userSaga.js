import { put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER,
  USER_LOGIN,
  USER_SIGNUP,
  USER_LOGIN_FAILED,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNUP_SUCCESS,
  FETCH_USER_FAILED,
  FETCH_USER_SUCCESS,
  USER_LOGOUT,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAILED,
} from "../actions/types";
import { request } from "../utils/request";

function* loginUserSaga({ payload }) {
  try {
    const response = yield request("/api/login", "POST", payload);
    const body = yield response.json();

    if (response.ok) {
      yield put({
        type: USER_LOGIN_SUCCESS,
        payload: body.data.user,
      });
    } else {
      yield put({
        type: USER_LOGIN_FAILED,
        payload: body.message,
      });
    }
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
    } else {
      yield put({
        type: FETCH_USER_FAILED,
        payload: body.message,
      });
    }
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

function* userSignupSaga({ payload }) {
  try {
    const response = yield request("/api/signup", "POST", payload);
    const body = yield response.json();

    if (response.ok) {
      yield put({
        type: USER_SIGNUP_SUCCESS,
        payload: body.data.user,
      });
    } else {
      yield put({
        type: USER_SIGNUP_FAILED,
        payload: body.message,
      });
    }
  } catch (err) {
    yield put({
      type: USER_SIGNUP_FAILED,
      payload: err,
    });
  }
}

export function* watchUserSignupSaga() {
  yield takeLatest(USER_SIGNUP, userSignupSaga);
}

function* logoutUserSaga() {
  try {
    const response = yield request("/api/logout", "GET");
    const body = yield response.json();

    if (response.ok) {
      yield put({
        type: USER_LOGOUT_SUCCESS,
        payload: null,
      });
    } else {
      yield put({
        type: USER_LOGOUT_FAILED,
        payload: body.message,
      });
    }
  } catch (err) {
    yield put({
      type: USER_LOGOUT_FAILED,
      payload: err,
    });
  }
}

export function* watchLogoutUserSaga() {
  yield takeLatest(USER_LOGOUT, logoutUserSaga);
}

export default [
  watchLoginUserSaga,
  watchFetchUserSaga,
  watchUserSignupSaga,
  watchLogoutUserSaga,
];
