import * as ActionTypes from "../actionTypes";

export const initialState = {
  isData: false,
  pagination: {
    total_count: null,
    page_num: null,
    page_size: null,
    max_page: null,
  },
  dashboard_list: [],
  dashboard_chart: [],
};

/*
 * prdRvDashboardReducer
 */
export const prdRvDashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_DASHBOARD_LIST_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_DASHBOARD_LIST_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
