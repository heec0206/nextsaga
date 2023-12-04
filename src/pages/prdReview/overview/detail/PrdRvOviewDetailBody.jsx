import { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import * as commonUtils from "/src/utils/common";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Popup } from "semantic-ui-react";
import CustomGridHeader from '/src/component/CustomGridHeader';
import actions from "/src/modules/actions/setHistoryActions";

const PrdReviewOverview = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => (state.prdRvOviewDetailCodes));
  const isLoading = useSelector((state) => (state.commonCodes.loading));
  const [data, setData] = useState([]);

  useEffect(() => {
    state.detail_list && setData([...state.detail_list].sort((a,b) => a.sku_nm < b.sku_nm ? -1 : (a.sku_nm === b.sku_nm ) ? 0 : 1));
  },[state])

  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    //params.api.sizeColumnsToFit();
  }, []);

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "채널", field: "review_chn", width: 100, pinned: "left", sortable:true },
    {
      headerName: "대분류",
      field: "prdt_gcode_nm",
      sortable:true,
      pinned: "left",
      width:150,
    },
    {
      headerName: "중분류",
      field: "prdt_mcode_nm",
      sortable:true,
      pinned: "left",
      width:150,
    },
    {
      headerName: "소분류",
      field: "prdt_dcode_nm",
      sortable:true,
      pinned: "left",
      width:150,
    },
    {
      headerName: "상품명",
      field: "sku_nm",
      minWidth: 300,
      pinned: "left",
      sortable:true
    },
    {
      headerName: "협력회사명",
      field: "ven_nm",
      sortable:true
    },
    {
      headerName: "리뷰 내용",
      field: "COMMENTS",
      sortable:true,
      minWidth: 450,
      cellRenderer: (params) => {
        return (
          <Popup
          className=""
          trigger={<span className="ellips-txt">{params.data.COMMENTS}</span>}
          content={params.data.COMMENTS}
          style={{maxWidth:"450px"}}
          inverted
        />
        );
      },
    },
    {
      headerName: "고객평점",
      headerComponent: CustomGridHeader,
      sortable:true,
      field: "score",
    },
    {
      headerName: "감성점수",
      headerComponent: CustomGridHeader,
      sortable:true,
      field: "sor_score",
    },
    {
      headerName: "점포명",
      field: "str_nm",
      sortable:true,
    },
    {
      headerName: "구매일자",
      field: "order_dt",
      sortable:true,
    },
    {
      headerName: "작성일자",
      field: "dt",
      sortable:true,
    },
  ]);

  const paginationNumberFormatter = useCallback((params) => {
    return '' + params.value.toLocaleString() + '';
  }, []);

  const fnClickExcelDownload = useCallback(async () => {
    const option = {
      fileName: "리뷰 상세",
      columnDefs: columnDefs,
    };
    const excel = state.detail_list;
    dispatch(actions.setHistoryExcel("detail"));
    commonUtils.excelDownload(excel, option);
  }, [state.detail_list]);

  return (
    <>
      <div className="ag-top-info">
        <strong className="result">
          결과
          <span>
            {!isLoading && state.pagination && commonUtils.priceStr(state.pagination.total_count)}
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
        style={{ width: "100%", height: 600, borderWidth: 1 }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={data.length > 0 && data}
          headerHeight={50}
          rowHeight={42}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          alwaysShowHorizontalScroll={true}
          animateRows={true}
          pagination={true}
          paginationPageSize={100}
          paginationNumberFormatter={paginationNumberFormatter}
          overlayNoRowsTemplate={'<span style="font-size:14px; font-weight:400">검색 결과가 없습니다.</span>'}
        ></AgGridReact>
      </div>
    </>
  );
};

export default PrdReviewOverview;

PrdReviewOverview.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
