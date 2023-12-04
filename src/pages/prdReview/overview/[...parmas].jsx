import { useEffect } from "react";
import Link from "next/link";
import PrdRvOviewSearch from "/src/component/PrdRvOviewSearch";
import PrdRvOviewBody from "./PrdRvOviewBody";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import actions from "/src/modules/actions/prdRvOviewActions";
import * as commonUtils from "/src/utils/common";

const PrdReviewOverview = (pageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = commonUtils.setFilterOptRedux();

  useEffect(() => {
    dispatch(actions.getPrdRvOview({
      ...searchParams,
      area_cd: "",
      store_cd: "",
      score_list: [],
      posit_or_negat_list: []
    }));
  }, [router]);

  return (
    <>
      <div className="top-area">
        <div className="sub-title">리뷰 분석</div>
        <div className="breadcrumb">
          <span>상품리뷰</span>
          <Link href="/prdReview/overview/search=">리뷰 분석</Link>
        </div>
      </div>
      <PrdRvOviewSearch {...pageProps} type="overview_list"/>
      {<PrdRvOviewBody/>}
    </>
  );
};

export default PrdReviewOverview;

PrdReviewOverview.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
