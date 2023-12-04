import * as ActionTypes from "../actionTypes";

export const initialState = {
  
};

/*
 * searchFilterReducer
 */
export const setHistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_EXCEL_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_EXCEL_HISTORY_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
