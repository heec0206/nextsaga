import Link from "next/link";
import PrdRvOviewSearch from "/src/component/PrdRvOviewSearch";
import PrdRvOviewAlertBody from "./searchRankBody";

const searchRank = (pageProps) => {
  return (
    <>
      <div className="top-area">
        <div className="sub-title">검색어 순위</div>
        <div className="breadcrumb">
          <Link href="/searchRank">검색어 순위</Link>
        </div>
      </div>
      <PrdRvOviewSearch type="hide"/>
      <PrdRvOviewAlertBody />
    </>
  );
};

export default searchRank;

searchRank.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
