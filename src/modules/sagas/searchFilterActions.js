import { takeEvery, put, call, all, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "../actionTypes";

function* setSerarchFilter(action) {
  try {
    console.log("searchFilter =" + JSON.stringify(action.params));
    yield put({
      type: ActionTypes.SET_FILTER_OPTION,
      action
    });
  } catch (error) {
    console.log("set filter params fail...");
  }
}

function* watchSearch() {
  yield takeLatest(ActionTypes.SET_FILTER_INQUERY, setSerarchFilter);
}

export default function* setSerarchFilterActions() {
  yield all([call(watchSearch)]);
}

