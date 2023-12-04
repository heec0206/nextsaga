import { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import LineChart from "/src/component/LineChart";
import LoadingPart from "/src/component/LoadingPart";
import * as commonUtils from "/src/utils/common";

const PrdReviewOviewBodyLayer = ({
  code
}) => {
  const router = useRouter();
  const state = useSelector((state) => (state.prdRvOviewCodes));
  const data = state.eChart_list && ([...state.eChart_list.filter(item => item.rv_dcode_cd === code.rv_dcode_cd && item.rv_prdt_cd === code.rv_prdt_cd)][0]);
  const chart = state.eChart_list && {
    options:{
      labels: ["AI 분석 부정 리뷰 건수","고객 부정 평가 리뷰 건수"],
      tickY:[true,false],
      color:[code.rv_stat,"hotpink"]
    },
    data: {
      title: data.rv_prdt === null ? data.rv_dcode : data.rv_prdt,
      labels: commonUtils.reviewData(data,"week_end_dt_").reverse(),
      dataset : [
        data.rv_prdt === null ? commonUtils.reviewData(data,"dcd_senti_den_review_cnt").reverse() : commonUtils.reviewData(data,"sku_senti_den_review_cnt").reverse(),
        data.rv_prdt === null ? commonUtils.reviewData(data,"dcd_den_review_cnt").reverse() : commonUtils.reviewData(data,"sku_den_review_cnt").reverse()
      ]
    }  
  }
  return (
    <>
      <div className="ag-top-info" style={{marginBottom:"10px"}}>
        <strong className="result">{state.eChart_list && chart.data.title}<span></span></strong>
      </div>
      <div className="lineChartWrap">
        <div className="scrollBox" style={{width:state.eChart_list && chart.options.width}}>
        { !state.eChart_list 
          ? <LoadingPart/>
          : <LineChart 
              options={chart.options}
              data={chart.data}
            >
            </LineChart>
        }
        </div>
      </div>
    </>
  );
};

export default PrdReviewOviewBodyLayer;

PrdReviewOviewBodyLayer.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
