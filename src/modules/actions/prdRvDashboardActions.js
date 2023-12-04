import * as ActionTypes from "../actionTypes";

export const getPrdRvDashboard = (params) => {
  return {
    type: ActionTypes.GET_DASHBOARD_LIST,
    params,
  };
};

export const getPrdRvDashboardSuccess = (res) => {
  return {
    type: ActionTypes.GET_DASHBOARD_LIST_SUCCESS,
    payload: res,
  };
};

export const getPrdRvDashboardFail = (error) => {
  return {
    type: ActionTypes.GET_DASHBOARD_LIST_FAIL,
    payload: error,
  };
};

const actions = {
  getPrdRvDashboard,
  getPrdRvDashboardSuccess,
  getPrdRvDashboardFail,
};

export default actions;
