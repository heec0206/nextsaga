import { takeEvery, put, call, all, delay, take, fork, takeLatest, takeFirst } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvOviewActions";
import * as ActionTypes from "../actionTypes";

function* getPrdRvOviewInqSlice(action) {
  try {
    const res = yield call(api.getFilterInquire, action.params);
    yield put({
      type: ActionTypes.GET_PRDRVOVIEW_SUCCESS,
      pagination: res.pagination,
      promotion_list: res.promotion_list
      //promotion_list: res.promotion_list.map((item,idx) => {return {idx: "idx" + String(idx), ...item}})
    });
  } catch (error) {
    yield put(actions.getPrdRvOviewFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

function* getFilterInquireLayer(action) {
  try {
    yield put({ type: ActionTypes.SHOW_LOADING_PART });
    const res = yield call(api.getFilterInquireLayer, action.params);
    yield put({
      type: ActionTypes.GET_PRDRVOVIEW_LAYER_SUCCESS,
      eChart_list: res.promotion_list
      //promotion_list: res.promotion_list.map((item,idx) => {return {idx: "idx" + String(idx), ...item}})
    });
  } catch (error) {
    yield put({ type: ActionTypes.HIDE_LOADING_PART });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* getPrdRvOviewInq(action) {
  console.log("api Requset Call...");
  try {
    //yield take(ActionTypes.SET_SEARCH_ALL_SUCCESS);
    yield put({ type: ActionTypes.SHOW_LOADING });
    const taskOview = yield fork(getPrdRvOviewInqSlice, action);
    const taskOviewLayer = yield fork(getFilterInquireLayer, action);
    yield take('GET_PRDRVOVIEW_SUCCESS');
    //yield take('GET_PRDRVOVIEW_LAYER_SUCCESS');
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Success...");
  } catch (error) {
    //yield put(actions.getPrdRvOviewFail(error));
    //yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* watchSearch() {
  yield takeLatest(ActionTypes.GET_PRDRVOVIEW, getPrdRvOviewInq);
}

export default function* prdRvOviewActions() {
  yield all([call(watchSearch)])
}
