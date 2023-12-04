import { takeEvery, put, call, all, delay, take, takeLatest, takeLeading } from "redux-saga/effects";
import * as api from "../api";
import actions from "../actions/searchListActions";
import * as ActionTypes from "../actionTypes";
import { useRouter } from "next/router";

function* getSearchList(action) {
  yield put({ type: ActionTypes.SHOW_LOADING });
  const fnSortConvert = (data, type) => {
    return (data.sort((a,b) => a[type] < b[type] ? -1 : a[type] > b[type] ? 1 : 0))
  }
  try {
    const [resDicd, resCatcd, resVenCd, resGcodeCd, resMcodeCd, resDcodeCd, areaCd] = yield all([
      call(api.getDicdListInquire, action.params),
      call(api.getcatCdListInquire, action.params),
      call(api.getVendorListInquire, action.params),
      call(api.getGcodeListInquire, action.params),
      call(api.getMcodeListInquire, action.params),
      call(api.getDcodeListInquire, action.params),
      call(api.getAreaListInquire, action.params),
    ]);
    yield put({
      type: ActionTypes.GET_SEARCH_LIST_SUCCESS,
      prdt_di_cd_list : fnSortConvert(resDicd,"prdt_di_nm"),
      prdt_cat_cd_list : fnSortConvert(resCatcd,"prdt_cat_nm"),
      ven_cd_list: fnSortConvert(resVenCd,"vendor"),
      prdt_gcode_cd_list: fnSortConvert(resGcodeCd, "prdt_gcode_nm"),
      prdt_mcode_cd_list: fnSortConvert(resMcodeCd, "prdt_mcode_nm"),
      prdt_dcode_cd_list: fnSortConvert(resDcodeCd, "prdt_dcode_nm"),
      area_list : [
        {key:"ALL", value:"ALL", text:"권역"},
        ...areaCd.filter((item, i) => {
          return ( areaCd.findIndex((item2, j) => { return item.area_nm === item2.area_nm; }) === i);
        }).map(item => ({ ...item,  key: item.area_cd, value: item.area_cd, text: item.area_nm }))
      ],
      store_list: [
        {key:"ALL", value:"ALL", text:"점포"},
        ...areaCd.map(item => ({ ...item,  key: item.store_cd, value: item.store_cd, text: item.store_nm }))
      ],
    });
    if(action.hide==="hide"){
      yield put({ type: ActionTypes.HIDE_LOADING });
    }
  } catch (error) {
    console.log("api Requset Fail...");
    yield put({ type: ActionTypes.HIDE_LOADING });
  }
}

function* watchSearch() {
  yield takeLatest(ActionTypes.GET_SEARCH_LIST, getSearchList);
}

export default function* getSearchListActions() {
  yield all([call(watchSearch)]);
}
