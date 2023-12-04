import * as ActionTypes from "../actionTypes";
import CONST from "/src/utils/constant";
import { useRouter } from "next/router";
import * as commonUtils from "/src/utils/common";

export const initialState = { 
  page_num: 1,
  page_size: 1000000,
  period: "day",
  start_date: commonUtils.prevWeek(2),
  end_date: commonUtils.yesterDay(),
  prdt_di_cd_list: [],
  prdt_cat_cd_list: [],
  prdt_gcode_cd_list: [],
  prdt_mcode_cd_list: [],
  prdt_dcode_cd_list: [],
  ven_cd_list: [],
  brnd_cd_list: [],
  review_chn_list: [],
  review_chn: "ALL",
  area_cd: "ALL",
  store_cd: "ALL",
  score : 0,
  score_list: [],
  posit_or_negat:0,
  posit_or_negat_list: [],
  search_keyword: ""
};

/*
 * searchFilterReducer
 */
export const searchFilterReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case ActionTypes.SET_FILTER_INQUERY:
      return Object.assign({}, state, {
        ...state,      
        ...action.params
      });
    default:
      return state;
  }
};
