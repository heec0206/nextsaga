import * as ActionTypes from "../actionTypes";
import CONST from "/src/utils/constant";

export const initialState = {
  isData: false,
  pagination: {
    total_count: "",
    page_num: "",
    page_size: "",
    max_page: "",
  },
  promotion_list: [
    {
      event_ywkseq: "", //연주차
      review_chn: "", //구분
      sku_cd: "", //상품 코드
      sku_nm: "", //상품명
      prdt_dcode_cd: "", //소분류 코드
      prdt_dcode_nm: "", //소분류명
      ven_cd: "", //협력사코드
      ven_nm: "", //협력사코드명
      review_score: "", //리뷰평점
      aff_review: "", //긍정리뷰
      den_review: "", //부정리뷰
      aff_review_km: "", //긍정리뷰 키워드
      den_review_km: "", //부정리뷰 키워드
      den_review_rate: "", //부정리뷰 비율
      bef_den_review_rate: "", //이전 부정리뷰 비율
      den_review_inc: "", //부정리뷰 증감율
      week_std_dt: "", //주차 시작일
      week_end_dt: "", //주차 종료일
      tot_review_cnt: "", //전체 리뷰건수
      aff_review_cnt: "", //긍정 리뷰 건수
      den_review_cnt: "", //부정 리뷰 건수
      senti_review_score: "", //감정 리뷰 평점
      senti_tot_review_cnt: "", //감정 전체리뷰건수
      senti_aff_review_cnt: "", //감정 긍정 리뷰건수
      senti_den_review_cnt: "", //감정 부정 리뷰건수
      senti_den_review_rate: "", //감정 부정리뷰 비율
      senti_bef_den_review_rate: "", //감정 이전 부정리뷰 비율
      senti_den_review_inc: "" //감정 부정리뷰 증감율
    },
  ],
};

/*
 * prdRvOviewSumReducer
 */
export const prdRvOviewSumReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.GET_PRDRVOVIEW_SUMMARY_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    case ActionTypes.GET_PRDRVOVIEW_SUMMARY_FAIL:
      return Object.assign({}, state, {
        ...state,
        ...action,
      });
    default:
      return state;
  }
};
