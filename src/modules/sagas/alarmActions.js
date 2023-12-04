import { takeEvery, put, call, all, fork, delay, take, takeLatest, cancle } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/prdRvOviewActions";
import * as ActionTypes from "../actionTypes";

function* getAlarmListActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.getAlarmListInquire, action.params);
    yield put({
      type: ActionTypes.GET_ALARM_LIST_SUCCESS,
      pagination: res.pagination,
      alarm_list: res.promotion_list.map((item,idx) => { 
        return { 
          ...item,
          id:(idx),
          alarm_cond: item.alarm_cond === null ? "선택" : item.alarm_cond,
          comp_val: item.comp_val === null ? "" : item.comp_val,
          comp_op: item.comp_op === null ? "선택" : item.comp_op,
          comp_val_typ: item.comp_val_typ === null ? "선택" : item.comp_val_typ,
          bat_cycl: item.bat_cycl === null ? "선택" : item.bat_cycl === "W" ? "주" : "일",
          alarm_on_yn: item.alarm_on_yn === "Y" ? true : false,
          alarm_send_yn: item.alarm_send_yn === "Y" ? true : false,
          alarm_handler:true,
         } 
      })
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.getAlarmListFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* setAlarmInsertActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.setAlarmInsert, action.params);
    yield put({
      type: ActionTypes.SET_ALARM_INSERT_SUCCESS,
      message: res.message,
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.setAlarmInsertFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* setAlarmDeleteActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.setAlarmDelete, action.params);
    yield put({
      type: ActionTypes.SET_ALARM_DELETE_SUCCESS,
      message: res.message,
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.setAlarmDeleteFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* setAlarmUpdateActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.setAlarmUpdate, action.params);
    yield put({
      type: ActionTypes.SET_ALARM_UPDATE_SUCCESS,
      message: res.message,
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.setAlarmUpdateFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* setAlarmOnoffActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.setAlarmOnoff, action.params);
    yield put({
      type: ActionTypes.SET_ALARM_ONOFF_SUCCESS,
      message: res.message,
      alarm_on_yn: action.params.alarm_on_yn
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.setAlarmUpdateFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* getAlarmSendListActions(action) {
  console.log("api Requset Call...");
  try {
    yield put({ type: ActionTypes.SHOW_LOADING });
    const res = yield call(api.getAlarmSendList, action.params);
    yield put({
      type: ActionTypes.GET_ALARM_SEND_LIST_SUCCESS,
      message: res.message,
      pagination_send_list: res.pagination,
      alarm_send_list: res.promotion_list
    });
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset End...");
  } catch (error) {
    yield put(actions.getAlarmSendListFail(error));
    yield put({ type: ActionTypes.HIDE_LOADING });
    console.log("api Requset Fail...");
  }
}

function* watchSearch() {
  yield takeEvery(ActionTypes.GET_ALARM_LIST, getAlarmListActions);
  yield takeEvery(ActionTypes.SET_ALARM_INSERT, setAlarmInsertActions);
  yield takeEvery(ActionTypes.SET_ALARM_DELETE, setAlarmDeleteActions);
  yield takeEvery(ActionTypes.SET_ALARM_UPDATE, setAlarmUpdateActions);
  yield takeEvery(ActionTypes.SET_ALARM_ONOFF, setAlarmOnoffActions);
  yield takeEvery(ActionTypes.GET_ALARM_SEND_LIST, getAlarmSendListActions);
}

export default function* prdAlarmListActions() {
  yield all([call(watchSearch)]);
}