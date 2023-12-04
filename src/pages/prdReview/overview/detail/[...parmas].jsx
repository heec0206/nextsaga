import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import PrdRvOviewSearch from "/src/component/PrdRvOviewSearch";
import PrdRvOviewDetailBody from "./PrdRvOviewDetailBody";
import { useDispatch } from "react-redux";
import actions from "/src/modules/actions/prdRvOviewDetailActions";
import * as commonUtils from "/src/utils/common";

const PrdReviewOverview = (pageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = commonUtils.setFilterOptRedux();

  useEffect(() => {
    dispatch(actions.getPrdRvOviewDetail(searchParams));
  }, [router]);

  return (
    <>
      <div className="top-area">
        <div className="sub-title">리뷰 상세 다운로드</div>
        <div className="breadcrumb">
          <span>상품리뷰</span>
          <Link href="/prdReview/overview/detail/search=">리뷰 상세 다운로드</Link>
        </div>
      </div>
      <PrdRvOviewSearch {...pageProps} type="overview_detail"/>
      <PrdRvOviewDetailBody />
    </>
  );
};

export default PrdReviewOverview;

PrdReviewOverview.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
