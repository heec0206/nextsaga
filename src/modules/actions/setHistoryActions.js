import * as ActionTypes from "../actionTypes";

export const setHistoryExcel = (params) => {
  return {
    type: ActionTypes.SET_EXCEL_HISTORY,
    params,
  };
};

const actions = {
  setHistoryExcel,
};

export default actions;

