import { takeEvery, put, call, all, delay, take, takeLatest, cancle } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvDashboardActions";
import * as ActionTypes from "../actionTypes";

function* getPrdRvDashboardInq(action) {
  console.log("api Requset Call...");
  try {
    //yield take(ActionTypes.SET_SEARCH_ALL_SUCCESS);
    yield put({ type: ActionTypes.SHOW_LOADING });
    yield put({ type: ActionTypes.SHOW_LOADING_PART });
    const res = yield call(api.getDashboardInquire, action.params);
    yield put({
      type: ActionTypes.GET_DASHBOARD_LIST_SUCCESS,
      pagination: res.pagination,
      dashboard_list: res.dashboard_list,
      dashboard_chart: res.dashboard_chart
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    yield put({ type: ActionTypes.HIDE_LOADING_PART });
    //console.log("api Response = " + JSON.stringify(res));
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.getPrdRvDashboardFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    yield put({ type: ActionTypes.HIDE_LOADING_PART });
    console.log("api Requset Fail...");
  }
}

function* watchSearch() {
  yield takeLatest(ActionTypes.GET_DASHBOARD_LIST, getPrdRvDashboardInq);
}

export default function* prdRvDashboardActions() {
  yield all([call(watchSearch)]);
}
