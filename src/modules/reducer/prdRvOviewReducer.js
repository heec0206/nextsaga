import * as ActionTypes from "../actionTypes";

export const initialState = {
  isData: false,
  pagination: {
    total_count: null,
    page_num: null,
    page_size: null,
    max_page: null,
  },
  promotion_list: [],
};

/*
 * prdRvOviewReducer
 */
export const prdRvOviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRDRVOVIEW_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_PRDRVOVIEW_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_PRDRVOVIEW_LAYER_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_PRDRVOVIEW_LAYER_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
