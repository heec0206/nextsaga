import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PrdRvOviewSummaryBody from "./PrdRvOviewSummaryBody";
import { useDispatch } from "react-redux";
import actions from "/src/modules/actions/prdRvOviewSumActions";
import * as commonUtils from "/src/utils/common";

const PrdReviewOverviewSummary = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = { ...commonUtils.setFilterOptRedux() }

  useEffect(() => {
    dispatch(actions.getPrdRvOviewSum(searchParams));
  }, [router]);

  const [path, setPath] = useState(
    router.pathname.replace("[...parmas]","search=?") +
    "page_num=" + router.query.page_num +
    "&page_size=" + router.query.page_size +
    "&period=" + router.query.period +
    "&start_date=" + router.query.start_date +
    "&end_date=" + router.query.end_date +
    "&review_chn=" + router.query.review_chn +
    "&area_cd=" + router.query.area_cd +
    "&&store_cd=" + router.query.store_cd +
    "&prdt_dcode_nm=" + router.query.prdt_dcode_nm +
    (router.query.prdt_dcode_cd_list ? ("&prdt_dcode_cd_list=" + router.query.prdt_dcode_cd_list) : "") +
    (router.query.prdt_cd ? ("&prdt_cd=" + router.query.prdt_cd) : "")
  );
  
  return (
    <>
      <div className="top-area">
        <div className="sub-title">주간 리뷰 요약</div>
        <div className="breadcrumb">
          <span>상품리뷰</span>
          <Link href="/prdReview/overview/search=">리뷰 분석</Link>
          {<Link href={path}>주간 리뷰 요약</Link>}
        </div>
      </div>
      {<PrdRvOviewSummaryBody params={searchParams}/>}
    </>
  );
};

export default PrdReviewOverviewSummary;

PrdReviewOverviewSummary.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
