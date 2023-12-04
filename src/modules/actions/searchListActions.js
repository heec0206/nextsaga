import * as ActionTypes from "../actionTypes";

export const getSearchList = (params, type) => {
  return {
    type: ActionTypes.GET_SEARCH_LIST,
    params,
    hide: type
  };
};

export const getSearchListSuccess = (res) => {
  return {
    type: ActionTypes.GET_SEARCH_LIST_SUCCESS,
    payload: res,
  };
};

export const getSearchListFail = (error) => {
  return {
    type: ActionTypes.GET_SEARCH_LIST_FAIL,
    payload: error,
  };
};

export const setSearchKeyword = (res) => {
  return {
    type: ActionTypes.SET_SEARCH_KEYWORD,
    payload: res,
  };
};

export const setSearchKeywordAction = (res) => {
  return {
    type: ActionTypes.SET_SEARCH_KEYWORD,
    payload: res,
  };
};

export const setSearchKeywordClear = (res) => {
  return {
    type: ActionTypes.SET_SEARCH_KEYWORD_CLEAR,
    payload: res,
  };
};

export const setSearchStatus = (res) => {
  return {
    type: ActionTypes.SET_SEARCH_STATUS,
    payload: res,
  };
};

export const setSearchAllSuccess = () => {
  return {
    type: ActionTypes.SET_SEARCH_ALL_SUCCESS,
  };
};

const actions = {
  getSearchList,
  getSearchListSuccess,
  getSearchListFail,
  setSearchKeyword,
  setSearchKeywordClear,
  setSearchKeywordAction,
  setSearchStatus,
  setSearchAllSuccess
};

export default actions;
