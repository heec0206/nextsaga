import * as ActionTypes from "../actionTypes";
import CONST from "/src/utils/constant";

export const initialState = {
  isData: false,
  pagination: {
    total_count: null,
    page_num: null,
    page_size: null,
    max_page: null,
  },
  detail_list: [],
};

/*
 * prdRvOviewDetailReducer
 */
export const prdRvOviewDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRDRVOVIEW_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_PRDRVOVIEW_DETAIL_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
