import * as ActionTypes from "../actionTypes";

export const getPrdRvOviewDetail = (params) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_DETAIL,
    params,
  };
};

export const getPrdRvOviewDetailSuccess = (res) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_DETAIL_SUCCESS,
    payload: res,
  };
};

export const getPrdRvOviewDetailFail = (error) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_DETAIL_FAIL,
    payload: error,
  };
};

const actions = {
  getPrdRvOviewDetail,
  getPrdRvOviewDetailSuccess,
  getPrdRvOviewDetailFail,
};

export default actions;
