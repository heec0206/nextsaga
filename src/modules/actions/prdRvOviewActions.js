import * as ActionTypes from "../actionTypes";

export const getPrdRvOview = (params) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW,
    params,
  };
};

export const getPrdRvOviewSuccess = (res) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_SUCCESS,
    payload: res,
  };
};

export const getPrdRvOviewFail = (error) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_FAIL,
    payload: error,
  };
};

export const getPrdRvOviewLayer = (params) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_LAYER,
    params,
  };
};

export const getPrdRvOviewLayerSuccess = (res) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_LAYER_SUCCESS,
    payload: res,
  };
};

export const getPrdRvOviewLayerFail = (error) => {
  return {
    type: ActionTypes.GET_PRDRVOVIEW_LAYER_FAIL,
    payload: error,
  };
};

const actions = {
  getPrdRvOview,
  getPrdRvOviewSuccess,
  getPrdRvOviewFail,
  getPrdRvOviewLayer,
  getPrdRvOviewLayerSuccess,
  getPrdRvOviewLayerFail,
};

export default actions;
