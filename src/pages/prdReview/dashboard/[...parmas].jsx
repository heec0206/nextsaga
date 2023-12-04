import { useEffect } from "react";
import Link from "next/link";
import PrdRvOviewSearch from "/src/component/PrdRvOviewSearch";
import PrdRvOviewDashboardBody from "/src/pages/prdReview/dashboard/PrdRvOviewDashboardBody";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import actions from "/src/modules/actions/prdRvDashboardActions";
import * as commonUtils from "/src/utils/common";

const dashboard = (pageProps) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = { ...commonUtils.setFilterOptRedux()};

  useEffect(() => {
    dispatch(actions.getPrdRvDashboard(searchParams));
  }, [router]);

  return (
    <>
      <div className="top-area">
        <div className="sub-title">리뷰 대시보드</div>
        <div className="breadcrumb">
          <span>상품리뷰</span>
          <Link href="/prdReview/dashboard/search=">리뷰 대시보드</Link>
        </div>
      </div>
      <PrdRvOviewSearch {...pageProps} type="dashboard"/>
      <PrdRvOviewDashboardBody/>
    </>
  );
};

export default dashboard;

dashboard.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
