import * as ActionTypes from "../actionTypes";

export const initialState = {
  
};

/*
 * alarmReducer
 */
export const alarmReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_ALARM_LIST_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_ALARM_LIST_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_INSERT_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_INSERT_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_DELETE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_DELETE_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_UPDATE_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_ONOFF_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_ALARM_ONOFF_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_ALARM_SEND_LIST_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_ALARM_SEND_LIST_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
