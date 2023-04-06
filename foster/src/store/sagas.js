import { all, fork } from "redux-saga/effects"
import {userSaga} from "./users/saga"
import authSaga from "./auth/saga"
export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(authSaga)
  ]);
};
