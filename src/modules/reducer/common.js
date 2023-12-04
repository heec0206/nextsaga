import * as ActionTypes from "../actionTypes";

export const initialState = {
  isData: false,
  loading: false,
  loadingPart: false,
  isPopup: {
    isOpen: false,
    title: null,
    contentType: null,
    message: null,
    onClickAgreeEvt: () => {},
    fnClickCancelEvt: () => {},
    onClickEvt: () => {}
  },
};

/*
 * commonReducer
 */
export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return Object.assign({}, state, {
        ...state,
        ...action,
        isData: true,
      });
    case ActionTypes.SET_DATA_CANCLE:
      return Object.assign({}, state, {
        isData: false,
      });
    case ActionTypes.SHOW_LOADING:
      return Object.assign({}, state, {
        ...state,
        loading: true,
      });
    case ActionTypes.HIDE_LOADING:
      return Object.assign({}, state, {
        ...state,
        loading: false,
      });
    case ActionTypes.SHOW_LOADING_PART:
      return Object.assign({}, state, {
        loadingPart: true,
      });
    case ActionTypes.HIDE_LOADING_PART:
      return Object.assign({}, state, {
        loadingPart: false,
      });
    case ActionTypes.SHOW_POPUP:
      return Object.assign({}, state, {
        ...state,
        isPopup: {
          ...action.isPopup,
          isOpen: true,
        },
      });
    case ActionTypes.HIDE_POPUP:
      return Object.assign({}, state, {
        ...state,
        isPopup: {
          ...action.isPopup,
          isOpen: false,
        },
      });
    default:
      return state;
  }
};
