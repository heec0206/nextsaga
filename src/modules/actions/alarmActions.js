import * as ActionTypes from "../actionTypes";

export const getAlarmList = (params) => {
  return {
    type: ActionTypes.GET_ALARM_LIST,
    params,
  };
};

export const getAlarmListSuccess = (res) => {
  return {
    type: ActionTypes.GET_ALARM_LIST_SUCCESS,
    payload: res,
  };
};

export const getAlarmListFail = (error) => {
  return {
    type: ActionTypes.GET_ALARM_LIST_FAIL,
    payload: error,
  };
};

export const setAlarmInsert = (params) => {
  return {
    type: ActionTypes.SET_ALARM_INSERT,
    params,
  };
};

export const setAlarmInsertSuccess = (res) => {
  return {
    type: ActionTypes.SET_ALARM_INSERT_SUCCESS,
    payload: res,
  };
};

export const setAlarmInsertFail = (error) => {
  return {
    type: ActionTypes.SET_ALARM_INSERT_FAIL,
    payload: error,
  };
};

export const setAlarmDelete = (params) => {
  return {
    type: ActionTypes.SET_ALARM_DELETE,
    params,
  };
};

export const setAlarmDeleteSuccess = (res) => {
  return {
    type: ActionTypes.SET_ALARM_DELETE_SUCCESS,
    payload: res,
  };
};

export const setAlarmDeleteFail = (error) => {
  return {
    type: ActionTypes.SET_ALARM_DELETE_FAIL,
    payload: error,
  };
};

export const setAlarmUpdate = (params) => {
  return {
    type: ActionTypes.SET_ALARM_UPDATE,
    params,
  };
};

export const setAlarmUpdateSuccess = (res) => {
  return {
    type: ActionTypes.SET_ALARM_UPDATE_SUCCESS,
    payload: res,
  };
};

export const setAlarmUpdateFail = (error) => {
  return {
    type: ActionTypes.SET_ALARM_UPDATE_FAIL,
    payload: error,
  };
};

export const setAlarmOnoff = (params) => {
  return {
    type: ActionTypes.SET_ALARM_ONOFF,
    params,
  };
};

export const setAlarmOnoffSuccess = (res) => {
  return {
    type: ActionTypes.SET_ALARM_ONOFF_SUCCESS,
    payload: res,
  };
};

export const setAlarmOnoffFail = (error) => {
  return {
    type: ActionTypes.SET_ALARM_ONOFF_FAIL,
    payload: error,
  };
};

export const getAlarmSendList = (params) => {
  return {
    type: ActionTypes.GET_ALARM_SEND_LIST,
    params,
  };
};

export const getAlarmSendListSuccess = (res) => {
  return {
    type: ActionTypes.GET_ALARM_SEND_LIST_SUCCESS,
    payload: res,
  };
};

export const getAlarmSendListFail = (error) => {
  return {
    type: ActionTypes.GET_ALARM_SEND_LIST_FAIL,
    payload: error,
  };
};

const actions = {
  getAlarmList,
  getAlarmListSuccess,
  getAlarmListFail,
  setAlarmInsert,
  setAlarmInsertSuccess,
  setAlarmInsertFail,
  setAlarmDelete,
  setAlarmDeleteSuccess,
  setAlarmDeleteFail,
  setAlarmUpdate,
  setAlarmUpdateSuccess,
  setAlarmUpdateFail,
  setAlarmOnoff,
  setAlarmOnoffSuccess,
  setAlarmOnoffFail,
  getAlarmSendList,
  getAlarmSendListSuccess,
  getAlarmSendListFail
};

export default actions;
