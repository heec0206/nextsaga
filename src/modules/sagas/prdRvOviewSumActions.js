import { takeEvery, put, call, all, delay, take, takeLatest } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvOviewSumActions";
import * as ActionTypes from "../actionTypes";

function* getPrdRvOviewSumInq(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.getFilterSumInquire, action.params);
    yield put({
      type: ActionTypes.GET_PRDRVOVIEW_SUMMARY_SUCCESS,
      pagination: res.pagination,
      promotion_list: res.promotion_list.reverse(),
      keyword_list_agr: res.keyword_list.filter(item => item.keyword_dcd === "01"),
      keyword_list_neg: res.keyword_list.filter(item => item.keyword_dcd === "02"),
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.getPrdRvOviewSumFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* watchSearch() {
  yield takeEvery(ActionTypes.GET_PRDRVOVIEW_SUMMARY, getPrdRvOviewSumInq);
}

export default function* prdRvOviewSumActions() {
  yield all([call(watchSearch)]);
}
