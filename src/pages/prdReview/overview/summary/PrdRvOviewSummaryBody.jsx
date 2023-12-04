import { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from 'chart.js';
import { Popup, Button } from "semantic-ui-react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as commonUtils from "/src/utils/common";
import { useRouter } from "next/router";
import LineChart from "/src/component/LineChart";
import BarLineMultiChart from "/src/component/BarLineMultiChart";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const PrdReviewOverviewSummaryBody = (props) => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
    ChartDataLabels,
  );
  const router = useRouter();
  const state = useSelector((state) => state.prdRvOviewSumCodes );
  const isLoading = useSelector((state) => (state.commonCodes.loading));
  const [activeSlide, setActiveSlide] = useState(state.promotion_list.length-1);
  const dataN = state.promotion_list[activeSlide];
  const date = ["0000-00-00","0000-00-00","0000-00-00","0000-00-00"];
  
  const chart_aff_info = state.promotion_list.length > 0 && {
    options:{
      labels: ["긍정 감성 트렌드 건수"],
      title: { display:false },
      tickY:[true],
      color:["green"]
    },
    data: {
      title: dataN.sku_cd ? dataN.sku_nm : dataN.prdt_dcode_nm,
      labels: isLoading ? date : commonUtils.reviewDate(dataN.week_std_dt,4,"").reverse(),
      dataset : [
        dataN.sku_cd ? commonUtils.reviewData(dataN,"sku_senti_aff_review_cnt").reverse() : commonUtils.reviewData(dataN,"dcode_senti_aff_review_cnt").reverse(),
      ]
    }  
  }

  const chart_den_info = state.promotion_list.length > 0 && {
    options:{
      labels: ["부정 감성 트렌드 건수"],
      title: { display:false },
      color:["red"],
      tickY:[true],
    },
    data: {
      title: dataN.sku_cd ? dataN.sku_nm : dataN.prdt_dcode_nm,
      labels: isLoading ? date : commonUtils.reviewDate(dataN.week_std_dt,4,"").reverse(),
      dataset : [
        dataN.sku_cd ? commonUtils.reviewData(dataN,"sku_senti_den_review_cnt").reverse() : commonUtils.reviewData(dataN,"dcode_senti_den_review_cnt").reverse()
      ]
    }  
  }

  const chart_sale_info = state.promotion_list.length > 0 && {
    options:{
      labels: ["매출 건수", "매출액"],
      title: { display:true },
      color:["#a1a1a1","green"]
    },
    data: {
      title: dataN.sku_cd ? dataN.sku_nm : dataN.prdt_dcode_nm,
      labels: isLoading ? date : commonUtils.reviewDate(dataN.week_std_dt,4,"").reverse(),
      dataset : [
        dataN.sku_cd ? commonUtils.reviewData(dataN,"sku_tot_sale_qty").reverse() : commonUtils.reviewData(dataN,"dcode_tot_sale_qty").reverse(),
        dataN.sku_cd ? commonUtils.reviewData(dataN,"sku_tot_sale_amt").reverse() : commonUtils.reviewData(dataN,"dcode_tot_sale_amt").reverse(),
      ],
      type : ["bar","line"],
      unit: ["건","원"]
    }  
  }

  const fnClickDetailLink = () => {
    router.push({
      pathname: "/prdReview/overview/detail/search=",
      query: props.params 
    })
  }

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "순위", field: "keyword_rk", width: 100, sortable: true, },
    { headerName: "소분류명", field: "prdt_dcode_nm", },
    { headerName: "상품명", field: "sku_nm",},
    { headerName: "키워드", field: "keyword", },
    { headerName: "카운트", field: "keyword_cnt", sortable: true, },
  ]);

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  return (
    <>
    
      {
        state.promotion_list.length > 0 ? 
          <>
            <div className="ag-top-info" style={{margin:"30px 0 20px 0"}}></div>
          <table className="table_normal type02">
            <colgroup>
              <col width="12%" />
              <col width="21%" />
              <col width="12%" />
              <col width="21%" />
              <col width="12%" />
              <col width="21%" />
            </colgroup>
            <tbody>
              <tr>
                <th>상품명</th>
                <td>{ isLoading ? <Skeleton height={15} /> : router.query.prdt_nm ? state.promotion_list[0].sku_nm : state.promotion_list[0].prdt_dcode_nm }</td>
                <th>리뷰 평점 평균</th>
                <td>{ isLoading ? <Skeleton width={100} height={15} /> : dataN.review_score }</td>
                <th>감성 점수 평균</th>
                <td>{ isLoading ? <Skeleton width={100} height={15} /> : dataN.senti_review_score }</td>
              </tr>
              <tr>
                <td colSpan="6">
                  {state.promotion_list.length > 0 && 
                    <div className="summary_wrap">
                      <div className="summary_tit" style={{minHeight:"33px"}}>
                        {
                          state.promotion_list.length > 1 && activeSlide !== 0 &&
                          <button className="summary_arrow" onClick={() => setActiveSlide(activeSlide-1)}>
                            <i aria-hidden="true" className="arrow left icon"></i>
                          </button>
                        }

                        <i
                          aria-hidden="true"
                          className="calendar alternate outline icon"
                        ></i>
                        <div style={{display:"inline-flex", width:"330px", height:"26px", lineHeight:"1"}}>
                          {
                            isLoading 
                            ? <><Skeleton width={300} height={26} style={{}}/></>
                            : 
                            <>{dataN.week_std_dt + "~" + dataN.week_end_dt}
                              {state.promotion_list.length > 1 && activeSlide !== state.promotion_list.length-1 &&
                                <button className="summary_arrow" onClick={() => setActiveSlide(activeSlide+1)}>
                                  <i aria-hidden="true" className="arrow right icon"></i>
                                </button>
                              }
                            </>
                          }
                        </div>
                        {

                        }
                        <button className="btn blue detail" onClick={() => fnClickDetailLink()}>상세</button>
                      </div>
                      <div>
                        <p className="subtit">매출 추이
                          <Popup
                            className="tooltip-wrap grids summary"
                            on="click"
                            trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                            position="bottom center"
                          >
                            <ul className="tooltip-info">
                              <li>
                                <strong>매출 추이</strong>
                                <p>상단에 표시된 날짜를 기준으로 4주 전의 매출액(세포함)과 매출 건수에 대한 추이</p>
                              </li>
                            </ul>
                          </Popup>
                          <span style={{margin:"0 0 0 8px", fontSize:"13px", color:"#666", fontWeight:"normal"}}>(참고. SSG의 경우 매출액 연동이 되지 않아 0으로 나옵니다.)</span>
                        </p>
                        <div className="chart-wrap summary">
                          {<BarLineMultiChart
                            type="bar"
                            options={chart_sale_info.options}
                            data={chart_sale_info.data}
                          />}
                        </div>
                        <div className="summary_box">
                          <div className="boxL">
                            <div className="tit">긍정 리뷰 주별 트렌드</div>
                            <div className="content_box">  
                              <p className="subtit">긍정 리뷰 주요 키워드
                                <Popup
                                  className="tooltip-wrap grids summary"
                                  on="click"
                                  trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                  position="bottom center"
                                >
                                  <ul className="tooltip-info">
                                    <li>
                                      <strong>긍정 리뷰 주요 키워드</strong>
                                      <p>상단에 표시된 날짜를 기준으로 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 3, 4, 5점에 대한 리뷰의 키워드</p>
                                    </li>
                                  </ul>
                                </Popup>
                              </p>
                                <div
                                  className="ag-theme-alpine"
                                  style={{ width: "100%", height: 300, borderWidth: 1 }}
                                >
                                  <AgGridReact
                                    columnDefs={columnDefs}
                                    rowData={state.keyword_list_agr && state.keyword_list_agr.filter(item => item.event_ywkseq === dataN.event_ywkseq)}
                                    headerHeight={50}
                                    rowHeight={42}
                                    defaultColDef={defaultColDef}
                                    onGridReady={onGridReady}
                                    overlayNoRowsTemplate={'<span style="font-size:14px">검색 결과가 없습니다.</span>'}
                                  ></AgGridReact>
                                </div>
                              <p className="subtit">긍정 감성 트렌드 그래프
                                <Popup
                                  className="tooltip-wrap grids summary"
                                  on="click"
                                  trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                  position="bottom center"
                                >
                                  <ul className="tooltip-info">
                                    <li>
                                      <strong>긍정 감성 트렌드</strong>
                                      <p>상단에 표시된 날짜를 기준으로 주별 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 3, 4, 5점에 대한 리뷰의 건수 추이</p>
                                    </li>
                                  </ul>
                                </Popup>
                              </p>
                              <div className="chart-wrap summary">
                                <LineChart type="bar" options={chart_aff_info.options} data={chart_aff_info.data} />
                              </div>
                              {router.query.prdt_cd &&
                                <>
                                  <p className="subtit">긍정 리뷰 SUMMARY
                                    <Popup
                                      className="tooltip-wrap grids summary"
                                      on="click"
                                      trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                      position="bottom center"
                                    >
                                      <ul className="tooltip-info">
                                        <li>
                                          <strong>긍정 감성 SUMMARY</strong>
                                          <p>상단에 표시된 날짜를 기준으로 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 3, 4, 5점에 대한 리뷰의 요약</p>
                                        </li>
                                      </ul>
                                    </Popup>
                                  </p>
                                  <div className="scroll_box">
                                    {
                                      dataN.aff_review?.split("\n").map((txt,idx) => (
                                        <div key={idx}>
                                          {txt === "None" ? "긍정 감성 점수 조건에 맞는 리뷰가 존재하지 않습니다." : txt}
                                        </div>
                                      ))
                                    }
                                  </div>
                                </>
                              }
                            </div>
                          </div>
                          <div className="boxR">
                            <div className="tit type02">
                              부정 리뷰 주별 트렌드
                            </div>
                            <div className="content_box">
                              <p className="subtit">부정 리뷰 주요 키워드
                                <Popup
                                  className="tooltip-wrap grids summary"
                                  on="click"
                                  trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                  position="bottom center"
                                >
                                  <ul className="tooltip-info">
                                    <li>
                                      <strong>부정 리뷰 주요 키워드</strong>
                                      <p>상단에 표시된 날짜를 기준으로 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 1, 2점에 대한 리뷰의 키워드</p>
                                    </li>
                                  </ul>
                                </Popup>
                              </p>
                                <div
                                  className="ag-theme-alpine"
                                  style={{ width: "100%", height: 300, borderWidth: 1 }}
                                >
                                  <AgGridReact
                                    columnDefs={columnDefs}
                                    rowData={state.keyword_list_neg && state.keyword_list_neg.filter(item => item.event_ywkseq === dataN.event_ywkseq)}
                                    headerHeight={50}
                                    rowHeight={42}
                                    defaultColDef={defaultColDef}
                                    onGridReady={onGridReady}
                                    overlayNoRowsTemplate={'<span style="font-size:14px; font-weight:400">검색 결과가 없습니다.</span>'}
                                  ></AgGridReact>
                                </div>
                              <p className="subtit">부정 감성 트렌드 그래프
                                <Popup
                                  className="tooltip-wrap grids summary"
                                  on="click"
                                  trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                  position="bottom center"
                                >
                                  <ul className="tooltip-info">
                                    <li>
                                      <strong>부정 감성 트렌드</strong>
                                      <p>상단에 표시된 날짜를 기준으로 주별 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 1, 2점에 대한 리뷰의 건수 추이</p>
                                    </li>
                                  </ul>
                                </Popup>
                              </p>
                              <div className="chart-wrap summary">
                              <LineChart type="bar" options={chart_den_info.options} data={chart_den_info.data} />
                              </div>
                              { router.query.prdt_cd &&
                                <>
                                  <p className="subtit">부정 리뷰 SUMMARY
                                    <Popup
                                      className="tooltip-wrap grids summary"
                                      on="click"
                                      trigger={<Button content="툴팁" className="tooltip" style={{margin:"2px 0 0 8px"}} />}
                                      position="bottom center"
                                    >
                                      <ul className="tooltip-info">
                                        <li>
                                          <strong>부정 리뷰 SUMMARY</strong>
                                          <p>상단에 표시된 날짜를 기준으로 D-7 ~ D 기간에 AI 모델에 의해 1~5점 척도의 감성 점수 중 1, 2점에 대한 리뷰의 요약</p>
                                        </li>
                                      </ul>
                                    </Popup>
                                  </p>
                                  <div className="scroll_box">
                                    {
                                      dataN.den_review?.split("\n").map((txt,idx) => (
                                        <div key={idx}>
                                          {txt === "None" ? "부정 감성 점수 조건에 맞는 리뷰가 존재하지 않습니다." : txt}
                                        </div>
                                      ))
                                    }
                                  </div>
                                </>
                              }

                            </div>
                          </div>
                        </div>
                      </div>        
                    </div>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </>
        : <div
            style={{fontSize:"20px", height:"600px", lineHeight:"600px", textAlign:"center", fontWeight:"500", color:"#222"}}
          >최근 데이터가 없습니다.</div>
      }

    </>
  );
};

export default PrdReviewOverviewSummaryBody;

PrdReviewOverviewSummaryBody.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
