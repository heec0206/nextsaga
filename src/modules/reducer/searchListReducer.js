import * as ActionTypes from "../actionTypes";

export const initialState = {
  prdt_di_cd_list: [],
  prdt_cat_cd_list: [],
  prdt_gcode_cd_list: [],
  prdt_mcode_cd_list: [],
  prdt_dcode_cd_list: [],
  ven_cd_list: [],
};

/*
 * searchFilterReducer
 */
export const searchListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_SEARCH_LIST_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_SEARCH_LIST_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.SET_SEARCH_KEYWORD:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
