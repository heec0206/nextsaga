import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import actions from "/src/modules/actions/alarmActions";
import { useRouter } from "next/router";
import PrdRvOviewAlertBodyGridTop from "./PrdRvOviewAlertBodyGridTop";
import PrdRvOviewAlertBodyGridBottom from "./PrdRvOviewAlertBodyGridBottom";
import * as commonUtils from "/src/utils/common";

const PrdReviewAlert = (pageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = commonUtils.setAlarmOptRedux();

  useEffect(() => {
    dispatch(actions.getAlarmList(searchParams));
    dispatch(actions.getAlarmSendList({
      posit_or_negat: 0,
      score: 0,
      prdt_dcode_cd_list : []
    }));
  },[router]);

  return (
    <>
      <div className="top-area">
        <div className="sub-title">알람 관리</div>
        <div className="breadcrumb">
          <Link href="">상품 리뷰</Link>
          <Link href="/prdReview/overview/alarm">알람 관리</Link>
        </div>
      </div>
      
      <div className="ag-top-info mt35"><strong className="result">등록한 알람</strong></div>
        <div
          className="ag-theme-alpine custom"
          style={{ width: "100%", height: 400, borderWidth: 1 }}
        >
          <PrdRvOviewAlertBodyGridTop/>
        </div>

        <div className="ag-top-info mt35"><strong className="result">주간 알람 현황</strong></div>
        <div className="ag-top-info type02">
          <strong className="result">기간:
            <span>{commonUtils.getDateStr(commonUtils.prevWeek(2),"dash") + " ~ " + commonUtils.getDateStr(commonUtils.today(),"dash")}</span>
          </strong>
        </div>
        <div
          className="ag-theme-alpine custom"
          style={{ width: "100%", height: 400, borderWidth: 1 }}
        >
          <PrdRvOviewAlertBodyGridBottom />
      </div>
    </>
  );
};

export default PrdReviewAlert;

PrdReviewAlert.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
