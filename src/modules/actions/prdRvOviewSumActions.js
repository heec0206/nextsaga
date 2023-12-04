import * as ActionTypes from "../actionTypes";

export const getPrdRvOviewSum = (params) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_SUMMARY,
    params,
  };
};

export const getPrdRvOviewSumSuccess = (res) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_SUMMARY_SUCCESS,
    payload: res,
  };
};

export const getPrdRvOviewSumFail = (error) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_SUMMARY_FAIL,
    payload: error,
  };
};

const actions = {
  getPrdRvOviewSum,
  getPrdRvOviewSumSuccess,
  getPrdRvOviewSumFail,
};

export default actions;
