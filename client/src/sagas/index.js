import createSagaMiddleware from "redux-saga";
import { call, all } from "redux-saga/effects";
import userSaga from "./userSaga";

export const sagaMiddleware = createSagaMiddleware();

const allSagas = [...userSaga];

export default function* rootSaga() {
  yield all(allSagas.map((saga) => call(saga)));
}
