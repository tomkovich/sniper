import createSagaMiddleware from "redux-saga";
import { call, all } from "redux-saga/effects";
import postSaga from "./postSaga";
import userSaga from "./userSaga";

export const sagaMiddleware = createSagaMiddleware();

const allSagas = [...userSaga, ...postSaga];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => call(saga)));
}
