import { combineReducers } from "redux";
import { commonReducer } from "./reducer/common";
import { prdRvOviewReducer } from "./reducer/prdRvOviewReducer";
import { prdRvOviewDetailReducer } from "./reducer/prdRvOviewDetailReducer";
import { searchFilterReducer } from "./reducer/searchFilterReducer";
import { searchListReducer } from "./reducer/searchListReducer";
import { prdRvOviewSumReducer } from "./reducer/prdRvOviewSumReducer";
import { prdRvDashboardReducer } from "./reducer/prdRvDashboardReducer";
import { setHistoryReducer } from "./reducer/setHistoryReducer";
import { alarmReducer } from "./reducer/alarmReducer";
import { HYDRATE } from "next-redux-wrapper";

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default:
      return combineReducers({
        commonCodes: commonReducer,
        searchCodes: searchListReducer,
        searchParams: searchFilterReducer,
        prdRvOviewCodes: prdRvOviewReducer,
        prdRvOviewDetailCodes: prdRvOviewDetailReducer,
        prdRvOviewSumCodes : prdRvOviewSumReducer,
        prdRvDashboardCodes : prdRvDashboardReducer,
        setHistoryCodes : setHistoryReducer,
        alarmCodes : alarmReducer
      })(state, action);
  }
};

export default rootReducer;
