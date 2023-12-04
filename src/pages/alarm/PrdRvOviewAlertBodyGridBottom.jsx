import { useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { useRouter } from "next/router";
import * as commonUtils from "/src/utils/common";
import "ag-grid-community/styles/ag-theme-alpine.css";

const PrdReviewAlertGridBottom = (props) => {
  const state = useSelector((state) => (state.alarmCodes));
  const searchParams = useSelector((state) => (state.searchParams));
  const router = useRouter();
  const [pageSize, setPageSize] = useState(1000);
  const defaultColDef = useMemo(() => {
    return {
      resizable: true,
    };
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
  }, []);

  const fnClickMoveDcodeNm = (params, type) => {
    const searchParamsUrl = {
      page_num : 1,
      page_size:searchParams.page_size,
      period:"day",
      start_date:commonUtils.prevWeek(2),
      end_date:commonUtils.yesterDay(),
      prdt_di_cd_list:params.prdt_di_cd,
      prdt_cat_cd_list:params.prdt_cat_cd,
      prdt_gcode_cd_list:params.prdt_gcode_cd,
      prdt_mcode_cd_list:params.prdt_mcode_cd,
      prdt_dcode_cd_list:params.prdt_dcode_cd,
      review_chn:"ALL",
    };

    router.push(
      {
        pathname: "/prdReview/overview/search=",
        query: type === "dcode"  
          ? { ...searchParamsUrl }
          : { ...searchParamsUrl, search_keyword : params.sku_nm }
      }
    );
  }

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "소분류", field: "prdt_dcode_nm", 
      cellRenderer: (params) => {
        return (
          <a className="prdt_link" onClick={() => fnClickMoveDcodeNm(params.data,"dcode")}>{params.data.prdt_dcode_nm}</a>
        )
      }
    },
    { headerName: "SKU 코드", field: "sku_cd",  },
    { headerName: "SKU 이름", field: "sku_nm", 
      cellRenderer: (params) => {
        return (
          <a className="prdt_link" onClick={() => fnClickMoveDcodeNm(params.data,"sku")}>{params.data.sku_nm}</a>
        )
      }
    },
    { headerName: "조건", field: "alarm_cond" },
    { headerName: "상세값", field: "comp_val", 
      cellRenderer: (params) => {
        return (
          (params.data.bat_cycl === "W" ? "주" : "일") + " " + params.data.comp_val + params.data.comp_val_typ + " " + 
          (params.data.comp_op === "<" && "미만" || params.data.comp_op === "<=" && "이하" || params.data.comp_op === ">" && "초과" || params.data.comp_op === ">=" && "이상")
        )
      }
    },
  ]);

  return (
    <>
      <div
        className="ag-theme-alpine custom"
        style={{ width: "100%", height: 400, borderWidth: 1 }}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={state.alarm_send_list && state.alarm_send_list.length > 0 ? state.alarm_send_list : []}
          headerHeight={60}
          rowHeight={58}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          pagination={state.pagination_send_list && state.pagination_send_list.total_count > pageSize ? true : false}
          paginationPageSize={pageSize}
          overlayNoRowsTemplate={'<span style="font-size:14px; font-weight:400">검색된 주간 알람 현황이 없습니다.</span>'}
        ></AgGridReact>
      </div>
    </>
  );
};

export default PrdReviewAlertGridBottom;

PrdReviewAlertGridBottom.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
