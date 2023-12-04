import { takeEvery, put, call, all, delay, take, takeLatest, cancle } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvOviewActions";
import * as ActionTypes from "../actionTypes";

function* getPrdRvOviewDetailInq(action) {
  console.log("api Requset Call...");
  try {
    //yield take(ActionTypes.SET_SEARCH_ALL_SUCCESS);
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.getFilterDetailInquire, action.params);
    yield put({
      type: ActionTypes.GET_PRDRVOVIEW_DETAIL_SUCCESS,
      pagination: res.pagination,
      detail_list: res.detail_list,
    });
    //console.log("api Response = " + JSON.stringify(res));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.getPrdRvOviewDetailFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* watchSearch() {
  yield takeEvery(ActionTypes.GET_PRDRVOVIEW_DETAIL, getPrdRvOviewDetailInq);
}

export default function* prdRvOviewDetailActions() {
  yield all([call(watchSearch)]);
}
