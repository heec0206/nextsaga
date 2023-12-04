import * as ActionTypes from "../actionTypes";

export const setSearchInquery = (params) => {
  return {
    type: ActionTypes.SET_FILTER_INQUERY,
    params,
  };
};

export const setSearchFilterOption = (action) => {
  return {
    type: ActionTypes.SET_FILTER_OPTION,
    action,
  };
};


const actions = {
  setSearchInquery,
  setSearchFilterOption,
};

export default actions;

