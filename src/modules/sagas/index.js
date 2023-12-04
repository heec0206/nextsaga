import { takeEvery, put, call, fork, all, take, spawn } from "redux-saga/effects";
import prdRvOviewActions from "./prdRvOviewActions";
import prdRvOviewDetailActions from "./prdRvOviewDetailActions";
import prdRvOviewSumActions from "./prdRvOviewSumActions";
import prdRvDashboardActions from "./prdRvDashboardActions";
import searchFilterActions from "./searchFilterActions";
import searchListActions from "./searchListActions";
import setHistoryActions from "./setHistoryActions";
import alarmActions from "./alarmActions";
export default function* rootSaga() {
  yield fork(searchListActions),
  yield all([
    fork(searchFilterActions),
    fork(prdRvOviewActions),
    fork(prdRvOviewDetailActions),
    fork(prdRvOviewSumActions),
    fork(prdRvDashboardActions),
    fork(setHistoryActions),
    fork(alarmActions),
  ]);
}
