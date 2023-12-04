import { useEffect, useState } from "react";
import { Button, Popup, } from "semantic-ui-react";
import { useSelector } from "react-redux";
import * as commonUtils from "/src/utils/common";
import LoadingPart from "/src/component/LoadingPart";
import BarChart from "/src/component/BarChart";
import CountUp from 'react-countup';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const prdOviewDashboardBody = (props) => {
  const state = useSelector((state) => (state.prdRvDashboardCodes));
  const searchParams = { ...commonUtils.setFilterOptRedux()};
  const isLoading = useSelector((state) => (state.commonCodes.loading));
  const [data, setData] = useState({
    list : [],
    chart : [],
    channel : "EAPP"
  });

  useEffect(() => {
    setData({
      ...data,
      list : state.dashboard_list.length === 0 ? null : state.dashboard_list,
      chart : state.dashboard_chart.length === 0 ? null : state.dashboard_chart,
    });
  },[state])

  const chart = {
    options:{
      labels: ["긍정건수","부정건수"],
      tickY:[true,false],
      color:["green","red"],
      countColor:["#0d510d","red"]
    },
    data: {
      title: data.channel === "ALL" ? "전체 리뷰" : data.channel + " 리뷰",
      labels: [commonUtils.lastMonths(searchParams.start_date,2),commonUtils.lastMonths(searchParams.start_date,1),commonUtils.lastMonths(searchParams.start_date,0)],
      dataset : [
        state.dashboard_chart.filter(item => item.review_chn === data.channel).map(item => item.aff_review_cnt),
        state.dashboard_chart.filter(item => item.review_chn === data.channel).map(item => item.den_review_cnt)
      ]
    }  
  }

  const arr = [
    {base_ym: "202309"},
    {title: "영수증건수", info: "선택한 기간에 결제를 진행한 고객 수(결제 건수 기반)", unit:"명"},
    {title: "재구매 고객 비율", info: "선택한 월 + 이전월 내에 2회 이상 결제를 진행한 고객 수 / 선택한 월 객수 실적", unit:"%P"},
    {title: "리뷰 작성자", info: "상품을 구매한 후 리뷰를 작성한 고객 수", unit:"명"},
    {title: "긍정 리뷰 건", info: "고객이 상품에 대해 평가한 점수 중 3~5점에 해당하는 리뷰 건수", unit:"건"},
    {title: "구매 고객 수", info: "같은 고객이 2회 이상 구매한 내역을 제외한 실제 구매 고객 수(포인트 적립 기반)", unit:"명"},
    {title: "반품율", info: "취소 처리된 상품 수량 / 선택한 월의 전체 판매 수량 ", unit:"%"},
    {title: "등록 리뷰 수", info: "상품을 구매한 후 고객이 작성한 리뷰 수", unit:"건"},
    {title: "AI 분석 부정 리뷰 건", info: "텍스트가 있는 리뷰에 대해 AI를 활용한 텍스트 분석으로 1~5점 척도의 점수를 추출하여 텍스트의 의미가 부정(1,2점)에 해당하는 건수", unit:"건"},
    {title: "판매 수량", info: "선택한 기간에 판매된 수량", unit:"개"},
    {title: "VoC 접수 건수", info: "채팅 상담을 통해 접수된 VoC 건수", unit:"건"},
    {title: "리뷰 작성 기간", info: "상품을 구매한 후 리뷰를 작성하기까지 소요된 평균 기간", unit:"일"},
    {title: "부정 리뷰 건", info: "고객이 상품에 대해 평가한 점수 중 1~2점에 해당하는 리뷰 건수", unit:"건"}
  ];

  const skeleton = arr.map((item,idx) => {
    return idx !== 0 && (
      <li key={idx}>
        <strong>{arr[idx].title}</strong>
        <span className="skeleton_dashboard">
          <span><Skeleton height={34} /></span>
          <span><Skeleton width={70} height={34} /></span>
        </span>
        <button className="ui button tooltip">툴팁</button>
      </li>
    )
  });

  function isInteger(number)  {
    return number % 1 === 0;
  }

  const cardList = isLoading ? skeleton :
    data.list === null ? <li className="nodata dashboard">검색 결과가 없습니다.</li>
    : Object.values(data.list).map((item,idx) => {
      return idx !== 0 && (
        <li key={idx}>
          <strong>{arr[idx].title}</strong>
          <span>
            <CountUp start={0} end={item[0]} duration={(0.5)+(idx*0.15)} decimals={isInteger(item[1]) === true ? 0 : 1}/>
            <em>{" "+arr[idx].unit}</em>
            {item[1] !== null &&
              <em className= {item[1] === 0 ? "zero" : item[1] > 0 ? "green" : idx === 11 ? "zero" : "red"}>
                {item[1] && ""+ (isInteger(item[1]) === true ? parseInt(item[1]) : item[1].toFixed(1)) }
                <em> {idx === 11 ? "일" : "%"}</em>
                {item[1] === 0 
                  ? " -" 
                  : <i className={"arrow small icon " + (item[1] > 0 ? "up" : "down")}></i>
                }
              </em>
            }
          </span>
          <Popup
            className="tooltip-wrap"
            on="click"
            trigger={<Button content="툴팁" className="tooltip" />}
            position={idx%4 === 0 ? "bottom left" : "bottom center"}
          >
            <ul className="tooltip-info type02">
              <li>
                <strong>{arr[idx].title}</strong>
                <p>{arr[idx].info}</p>
              </li>
            </ul>
          </Popup>
        </li>
      )
    });

  return (
    <>
      <div className="ag-top-info type02">
        <span style={{fontSize:"13px", color:"#666", fontWeight:"normal"}}>※ 아래 지표는 이마트APP 기준으로 작성되었으며 영수증 데이터를 기반으로 하고 있습니다. 각 지표의 % 값은 지난달 대비 증감을 나타냅니다.</span>
      </div>
      <ul className="card-list type02">
        {cardList}
      </ul>
      <h3 className="sub-head" style={{marginTop:"30px"}}>리뷰 건수</h3>
      {
        !isLoading && data.chart === null 
        ? <div className="nodata dashboard chart">검색 결과가 없습니다.</div>
        : <div className="lineChartWrap" style={{position:"relative", margin:"10px 0 0"}}>
            <>
              <LoadingPart/>
              <BarChart 
                options={chart.options}
                data={chart.data}
              ></BarChart>
            </>
          </div>
      }
    </>
  );
};

export default prdOviewDashboardBody;

prdOviewDashboardBody.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
