import { takeEvery, put, call, all, delay, take, fork, takeLatest, takeFirst } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvOviewActions";
import * as ActionTypes from "../actionTypes";

function* setHistoryExcel(action) {
  try {
    const res = yield call(api.setExcelHistory, action.params);
    yield put({
      type: ActionTypes.SET_EXCEL_HISTORY_SUCCESS,
      res: res
    });
  } catch (error) {
    //yield put(actions.getPrdRvOviewFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

function* watchSearch() {
  yield takeLatest(ActionTypes.SET_EXCEL_HISTORY, setHistoryExcel);
}

export default function* setHistoryActions() {
  yield all([call(watchSearch)])
}
