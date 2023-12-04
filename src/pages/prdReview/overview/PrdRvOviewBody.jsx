import { useEffect, useState, useMemo, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
import * as commonUtils from "/src/utils/common";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import {Button, Modal } from "semantic-ui-react";
import { Chart as ChartJS, LinearScale, CategoryScale, BarElement, PointElement, LineElement, Legend, Tooltip, LineController, BarController } from "chart.js";
import { Sparklines, SparklinesLine } from 'react-sparklines';
import CustomGridHeader from '/src/component/CustomGridHeader';
import actions from "/src/modules/actions/setHistoryActions";
import PrdOviewBodyLayer from './PrdOviewBodyLayer';
const PrdReviewOviewBody = () => {
  ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const gridRef = useRef();
  const state = useSelector((state) => (state.prdRvOviewCodes));
  const isLoading = useSelector((state) => (state.commonCodes.loading));
  const [open, setOpen] = useState(false);
  const searchParams = commonUtils.setFilterOptRedux();
  const [data, setData] = useState([]);
  const [prdtCd, setPrdtCd] = useState({
    rv_docde_cd:null, 
    rv_prdt_cd:null,
    rv_stat: null
  });

  const fnClickSvgModal = (props) => {
    setOpen(true);
    setPrdtCd({
      rv_dcode_cd: props.data.rv_dcode_cd,
      rv_prdt_cd : props.data.rv_prdt_cd,
      rv_stat : 
        props.data.rv_prdt === null && props.data.dcd_senti_den_review_stat === "01"|| props.data.rv_prdt !== null && props.data.sku_senti_den_review_stat === "01"
        ? "red" : props.data.rv_prdt === null && props.data.dcd_senti_den_review_stat === "02" || props.data.rv_prdt !== null && props.data.sku_senti_den_review_stat === "02" ? "#ff7f00"
        : "black"
    });
  }

  useEffect(() => {
    setData([...state.promotion_list].filter(item =>item.rv_prdt === null));
  },[state.promotion_list])

  const columnDefs = [
    {
      headerName: "채널",
      field: "rv_gubun",
      width: 100,
      minWidth: 100,
      maxWidth: 100,
      resizable:true,
      pinned: "left",
      sortable: true,
      cellRenderer: (params) => {
        return (
          <>
            {params.data.rv_gubun}
          </>
        );
      },
    },
    {
      headerName: "대분류",
      field: "rv_gcode",
      width: 150,
      minWidth:150,
      resizable:true,
      pinned: "left",
      sortable: true,
      cellRenderer: (params) => {
        return (
          <>
            {params.data.rv_gcode}
          </>
        );
      },
    },
    {
      headerName: "중분류",
      field: "rv_mcode",
      width: 150,
      minWidth:150,
      resizable:true,
      pinned: "left",
      sortable: true,
      cellRenderer: (params) => {
        return (
          <>
            {params.data.rv_mcode}
          </>
        );
      },
    },
    {
      headerName: "소분류/상품명",
      field: "rv_dcode",
      pinned: "left",
      minWidth: 300,
      sortable: true,
      //sort: 'asc',
      cellRenderer: (params) => {
        const fnClickTogglePrdt = useCallback((params,idx,paramsInfo) => {
          params.toggle = !params.toggle; 
          const itemsToUpdate = [];
          const index = paramsInfo.node.parent.allLeafChildren.findIndex(item => item.data.rv_dcode_cd === params.rv_dcode_cd)

          if(params.toggle){  
            itemsToUpdate.push(
              state.promotion_list.filter(item => item.rv_prdt_cd !== null && item.rv_dcode_cd === params.rv_dcode_cd)
            );
          }else{
            itemsToUpdate.push(
              state.promotion_list.filter(item => item.rv_prdt_cd !== null && item.rv_dcode_cd === params.rv_dcode_cd)
            );
          }

          gridRef.current.api.applyTransaction({ 
            add: params.toggle ? itemsToUpdate.flat() : null,  
            addIndex:params.toggle ? index+1 : null,
            remove: params.toggle ? null : itemsToUpdate.flat(),
            update : data
          });
        }, []);
        
        return (
          <>
            <div className={"prdt_summary " + (params.data.rv_prdt === null ? "" : "indent")}>
              { params.data.rv_prdt === null &&
                <button
                  className="icon_depth"
                  onClick={() => fnClickTogglePrdt(params.data,params.rowIndex, params)}></button>
              }            
              <a className="prdt_link"
                onClick={() => fnClickRvUrlParams(params.data,"summary")}
              > 
                {params.data.rv_prdt_cd !== null && <i className="caret right icon"></i>}
                {params.data.rv_prdt_cd === null ? params.data.rv_dcode : params.data.rv_prdt}</a>              
            </div>
          </>
        );
      },
    },
    {
      headerName: "소분류/상품 코드",
      field: "rv_code",
      width: 150,
      minWidth: 150,
      maxWidth: 150,
      resizable:false,
      //sortable: true,
      cellRenderer: (params) => {
        return (
          <>
            {params.data.rv_prdt_cd === null ? params.data.rv_dcode_cd : params.data.rv_prdt_cd}
          </>
        );
      },
    },
    { 
    headerName: "AI 분석 부정 리뷰 추이(8주)", 
    field: "senti_den_review", 
    width: 245,
    minWidth: 245,
    maxWidth: 245,
    headerComponent: CustomGridHeader,
    cellClass: 'oviewSvgBox',
    onCellClicked: fnClickSvgModal,
    cellRenderer: (params) => {
      return (
        <>
          {
           <div 
            className={"svg-line " + (
                params.data.rv_prdt === null && params.data.dcd_senti_den_review_stat === "01"|| params.data.rv_prdt !== null && params.data.sku_senti_den_review_stat === "01"
                ? "red" : params.data.rv_prdt === null && params.data.dcd_senti_den_review_stat === "02" || params.data.rv_prdt !== null && params.data.sku_senti_den_review_stat === "02" ? "yellow"
                : "green"
                )
              } 
              style={{width:"inherit", height:"42px"}}>
              <Sparklines 
                data={
                  params.data.rv_prdt === null 
                    ? [
                        params.data.dcd_senti_den_review_cnt_8,
                        params.data.dcd_senti_den_review_cnt_7,
                        params.data.dcd_senti_den_review_cnt_6,
                        params.data.dcd_senti_den_review_cnt_5,
                        params.data.dcd_senti_den_review_cnt_4,
                        params.data.dcd_senti_den_review_cnt_3,
                        params.data.dcd_senti_den_review_cnt_2,
                        params.data.dcd_senti_den_review_cnt_1
                      ]
                    : [
                        params.data.sku_senti_den_review_cnt_8,
                        params.data.sku_senti_den_review_cnt_7,
                        params.data.sku_senti_den_review_cnt_6,
                        params.data.sku_senti_den_review_cnt_5,
                        params.data.sku_senti_den_review_cnt_4,
                        params.data.sku_senti_den_review_cnt_3,
                        params.data.sku_senti_den_review_cnt_2,
                        params.data.sku_senti_den_review_cnt_1
                      ]
                }
              >
                <SparklinesLine 
                  style={{ fill: "none" }}
                  color={
                    params.data.rv_prdt === null
                    ? params.data.dcd_senti_den_review_stat === "01" 
                        ? "red" : params.data.dcd_senti_den_review_stat === "02" ? "#ff7f00"
                        : "#222222"
                    : params.data.sku_senti_den_review_stat === "01" 
                        ? "red" : params.data.sku_senti_den_review_stat === "02" ? "#ff7f00"
                        : "#222222"
                  }
                /></Sparklines>
            </div>
          }
        </>
      );
    },
  },
  { headerName: "리뷰 평점 평균", field: "rv_grade", headerComponent: CustomGridHeader,minWidth:160, sortable: false },
  { headerName: "전체 리뷰 수", field: "rv_count", headerComponent: CustomGridHeader, minWidth:160, sortable: false},
  { headerName: "긍정 리뷰 수", field: "rv_posit", headerComponent: CustomGridHeader,minWidth:160, sortable: false, 
    cellRenderer: (params) => {
      return <>
        <a className="prdt_link"
          onClick={() => fnClickRvUrlParams(params.data,"detail","rv_posit")}
        >{params.value}</a>
      </>
    }
  },
  { headerName: "부정 리뷰 수", field: "rv_negat", headerComponent: CustomGridHeader, minWidth:160, sortable: false,
    cellRenderer: (params) => {
      return <>
        <a className="prdt_link"
          onClick={() => fnClickRvUrlParams(params.data,"detail","rv_negat")}
        >{params.value}</a>
      </>
    }
  },
  { headerName: "부정 리뷰 비율(%)", field: "rv_negat_ratio", headerComponent: CustomGridHeader, minWidth:180, sortable: false },
  { headerName: "VOC 건수", headerComponent: CustomGridHeader, field: "voc_count", minWidth: 120, maxWidth:150, cellStyle: { justifyContent: "right" }, sortable: false,
    cellRenderer: (params) => {
      return <>{commonUtils.priceStr(params.value)}</>;
    },
  },
  { headerName: "세포함 순매출", field: "tot_sale_amt", headerComponent: CustomGridHeader, minWidth:150, cellStyle: { justifyContent: "right" }, sortable: false,
    cellRenderer: (params) => {
      return <>{commonUtils.priceStr(params.value)}</>;
    },
  },
  { headerName: "수량", field: "tot_sale_qty", minWidth: 120, maxWidth:150, cellStyle: { justifyContent: "right" }, sortable: false,
    cellRenderer: (params) => {
      return <>{commonUtils.priceStr(params.value)}</>;
    },
  },
  {
    headerName: "리뷰 상세",
    field: "rv_href",
    minWidth: 105,
    maxWidth: 105,
    cellRenderer: (params) => {
      return (
        <>
          <button
            className="btn small"
            onClick={() => fnClickRvUrlParams(params.data,"detail")}
          >
            상세
          </button>
        </>
      );
    },
  },
  ]

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);
  
  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const rowClassRules = useMemo(() => {
    return {
      'dcode_bgcolor': (params) => {
        var res = params.data.rv_prdt;
        return res === null;
      },
      'toggle_bgcolor': (params) => {
        var res = params.data.toggle;
        return res === true && params.data.rv_prdt === null;
      },
    };
  }, []);
  
  const fnClickRvUrlParams = (params, type, depth) => {
    const summaryParams = {
      page_num: searchParams.page_num,
      page_size: searchParams.page_size,
      period: searchParams.period,
      start_date: searchParams.start_date,
      end_date: searchParams.end_date,
      review_chn: searchParams.review_chn,
      area_cd : searchParams.area_cd,
      store_cd : searchParams.store_cd,
    }
    const detailParams = {
      ...summaryParams,
      prdt_gcode_cd_list: params.rv_gcode_cd,
      prdt_mcode_cd_list: params.rv_mcode_cd,
      prdt_dcode_cd_list: params.rv_dcode_cd,
    }

    router.push(
      {
        pathname: "/prdReview/overview/"+type+"/search=",
        query: 
        type === "summary" 
          ? params.rv_prdt === null
            ? { ...summaryParams,
                prdt_dcode_nm : params.rv_dcode,
                prdt_dcode_cd_list:params.rv_dcode_cd,
              }
            : { ...summaryParams, 
                prdt_dcode_cd_list : [],
                prdt_dcode_nm : params.rv_dcode,
                prdt_nm : params.rv_prdt,
                prdt_cd :  params.rv_prdt_cd,
              }
          : type === "detail"
            ? depth 
              ? params.rv_prdt === null 
                ? {...detailParams, score_list:depth === "rv_posit" ? "3,4,5" : "1,2" }
                : {...detailParams, score_list:depth === "rv_posit" ? "3,4,5" : "1,2", search_keyword: params.rv_prdt }
              : params.rv_prdt === null
                ? {...detailParams }
                : {...detailParams, search_keyword: params.rv_prdt }
          : {}
      }
      //"prdReview/detail/" + params
    );
  };

  const paginationNumberFormatter = useCallback((params) => {
    return '' + params.value.toLocaleString() + '';
  }, []);

  const fnClickExcelDownload = useCallback(async () => {
    const columnDefs = [
      { headerName: "채널", field: "rv_gubun" },
      { headerName: "대분류", field: "rv_gcode" },
      { headerName: "중분류", field: "rv_mcode" },
      { headerName: "소분류", field: "rv_dcode" },
      { headerName: "상품명", field: "rv_prdt" },
      { headerName: "소분류/상품 코드", field: "rv_code"},
      { headerName: "AI 분석 부정 리뷰 추이(8주)", field: "senti_den_review" },
      { headerName: "리뷰 평점 평균", field: "rv_grade" },
      { headerName: "전체 리뷰 수", field: "rv_count" },
      { headerName: "긍정 리뷰 수", field: "rv_posit" },
      { headerName: "부정 리뷰 수", field: "rv_negat" },
      { headerName: "부정 리뷰 비율(%)", field: "rv_negat_ratio" },
      { headerName: "VOC 건수", field: "voc_count" },
      { headerName: "세포함 순매출", field: "tot_sale_amt" },
      { headerName: "수량", field: "tot_sale_qty" },
    ];

    const excel = state.promotion_list.map(item => {
      return {
        rv_gubun: item.rv_gubun,
        rv_gcode: item.rv_gcode,
        rv_mcode: item.rv_mcode,
        rv_dcode: item.rv_dcode,
        rv_prdt: item.rv_prdt === null ? item.rv_dcode : item.rv_prdt,
        rv_code: item.rv_prdt_cd === null ? item.rv_dcode_cd : item.rv_prdt_cd,
        senti_den_review: item.sku_senti_den_review_cnt_1 === null ? commonUtils.reviewData(item,"dcd_senti_den_review_cnt").toString() : commonUtils.reviewData(item,"sku_senti_den_review_cnt").toString(),
        rv_grade: item.rv_grade,
        rv_count: item.rv_count,
        rv_posit: item.rv_posit,
        rv_negat: item.rv_negat,
        rv_negat_ratio: item.rv_negat_ratio,
        voc_count: item.voc_count,
        tot_sale_amt: item.tot_sale_amt,
        tot_sale_qty: item.tot_sale_qty,
      }
    }).sort((a,b) => a.rv_gcode < b.rv_gcode ? -1 : (a.rv_gcode === b.rv_gcode ) ? 0 : 1);

    const option = {
      fileName: "리뷰 Overview",
      columnDefs: columnDefs,
    };
    dispatch(actions.setHistoryExcel("overview"));
    commonUtils.excelDownload(excel, option);
  }, [state.promotion_list]);

  return (
    <>
      <div className="ag-top-info">
        <strong className="result">
          결과 
          <span>
            {!isLoading && commonUtils.priceStr(state.pagination.total_count)}
          </span>
        </strong>
        <button
          className="btn btn-excel"
          onClick={() => fnClickExcelDownload()}
        >
          엑셀 다운로드
        </button>
      </div>
      
      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",
          height: 600,
          borderWidth: 1,
        }}
      >
        <AgGridReact
          ref={gridRef}
          columnDefs={columnDefs}
          rowData={data.length > 0 && data}
          headerHeight={60}
          rowHeight={58}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onFirstDataRendered={onGridReady}
          rowClassRules={rowClassRules}
          onGridSizeChanged={onGridReady}
          animateRows={true}
          pagination={true}
          paginationPageSize={100}
          paginationNumberFormatter={paginationNumberFormatter}
          overlayNoRowsTemplate={'<span style="font-size:14px; font-weight:400">검색 결과가 없습니다.</span>'}
        ></AgGridReact>
      </div>
      <Modal
        className="oview_modal"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>AI 분석 부정 리뷰 추이 vs. 고객 부정 평가 리뷰 추이<button onClick={() => setOpen(false)} className="code_close_icon"><i className="close icon"></i></button></Modal.Header>
        <Modal.Content>
            <PrdOviewBodyLayer code={prdtCd}/>
        </Modal.Content>
        <Modal.Actions>
          <Button content="확인" onClick={() => setOpen(false)} className="btn blue"/>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default PrdReviewOviewBody;

PrdReviewOviewBody.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
