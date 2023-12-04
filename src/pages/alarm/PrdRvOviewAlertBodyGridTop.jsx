import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { Checkbox } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import * as ActionTypes from "/src/modules/actionTypes";
import actions from "/src/modules/actions/alarmActions";

const PrdReviewAlertGridTop = (props) => {
  const state = useSelector((state) => (state.alarmCodes));
  const dispatch = useDispatch();
  const gridRef = useRef();
  const [pageSize, setPageSize] = useState(1000);

  useEffect(() => {
    if(state.type === "SET_ALARM_INSERT_SUCCESS" || state.type === "SET_ALARM_DELETE_SUCCESS" ||
      state.type === "SET_ALARM_UPDATE_SUCCESS" || state.type === "SET_ALARM_ONOFF_SUCCESS"){
      dispatch({
        type: ActionTypes.SHOW_POPUP, 
        isPopup: { 
          contentType: ActionTypes.ALERT_POPUP,
          message: 
            state.type === "SET_ALARM_INSERT_SUCCESS" && "등록되었습니다" ||
            state.type === "SET_ALARM_DELETE_SUCCESS" && "삭제되었습니다" ||
            state.type === "SET_ALARM_UPDATE_SUCCESS" && "수정되었습니다" || 
            state.type === "SET_ALARM_ONOFF_SUCCESS" && "알람이 " + (state.alarm_on_yn === "Y" ? "ON" : "OFF") + " 되었습니다",
          onClickEvt: () => {
            gridRef.current.api.applyTransaction({ 
              update : gridRef.current.props.rowData
            });
          }
        }
      })
    }
  },[state]);
  
  const alarmParams = (params) => {
    return {
      id: params.id,
      review_chn: "ALL",
      prdt_di_cd: params.prdt_di_cd,
      prdt_di_nm: params.prdt_di_nm,
      prdt_cat_cd: params.prdt_cat_cd,
      prdt_cat_nm: params.prdt_cat_nm,
      prdt_gcode_cd: params.prdt_gcode_cd,
      prdt_gcode_nm: params.prdt_gcode_nm,
      prdt_mcode_cd: params.prdt_mcode_cd,
      prdt_mcode_nm: params.prdt_mcode_nm,
      prdt_dcode_cd: params.prdt_dcode_cd,
      prdt_dcode_nm: params.prdt_dcode_nm,
      alarm_cond: params.alarm_cond,        
      comp_op: params.comp_op,
      comp_val: params.comp_val,
      comp_val_typ: params.comp_val_typ,
      alarm_insert_yn: params.alarm_insert_yn ? "Y" : "N",
      alarm_on_yn: "Y",
      bat_cycl: params.bat_cycl === "주" ? "W" : "D",
    }
  }

  const defaultColDef = useMemo(() => {
    return {
      //width: 150,
      resizable: true,
    };
  }, []);

  const rowClassRules = useMemo(() => {
    return {
      'toggle_bgcolor': (params) => {
        return params.data.alarm_on_yn === true;
      },
      'insert_bgcolor': (params) => {
        return params.data.alarm_insert_yn === true;
      },
    };
  }, []);

  const getRowId = useMemo(() => {
    return (params) => params.data.id;
  }, []);

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    gridRef.current.api.applyTransaction({ 
      update : gridRef.current.props.rowData
    });
  }, []);

  const fnClickDcodeNm = (params) => {
    dispatch(actions.getAlarmSendList({
      posit_or_negat: 0,
      score: 0,
      prdt_dcode_cd_list : [params.prdt_dcode_cd]
    }));
  };

  const [columnDefs, setColumnDefs] = useState([
    { headerName: "번호", field: "id", minWidth:100, pinned: "left", sortable:true,
      cellRenderer: (params) => {
        return Number(params.data.id+1);
      }
    },
    //{ headerName: "담당", field: "prdt_di_nm", width:150, minWidth:150, pinned: "left", sortable:true, },
    { headerName: "카테고리", field: "prdt_cat_nm", width:150, minWidth:150, pinned: "left", sortable:true },
    { headerName: "대분류", field: "prdt_gcode_nm", width:150, minWidth:150, pinned: "left", sortable:true },
    { headerName: "중분류", field: "prdt_mcode_nm", width:150, minWidth:200, pinned: "left", sortable:true },
    { headerName: "소분류", field: "alarm_handler", width:250, minWidth:200, pinned: "left", sortable:true,
      cellRenderer: (params) => {
        return (
          <>
            {!params.data.alarm_insert_yn
              ? params.data.prdt_dcode_nm
              : <a className="prdt_link" onClick={() => fnClickDcodeNm(params.data)}>{params.data.prdt_dcode_nm}</a>}
          </>
        )
      }
    },
    { headerName: "기준", field: "alarm_cond", minWidth:200, cellEditor: 'agSelectCellEditor', editable: true,
      cellEditorParams: {
        values: ["선택","부정리뷰비율","부정리뷰증감율","부정리뷰건"],
      },
      cellClass: params => { return params.value === '선택' && 'chk-validation'; },
      cellStyle: {cursor:"pointer"},
    },
    { headerName: "조건", field: "comp_op", minWidth:120, cellEditor: 'agSelectCellEditor', editable: true,
      cellEditorParams: {
        values: ["선택","=",">",">=","<","<="],
      },
      cellClass: params => { return params.value === '선택' && 'chk-validation'; },
      cellStyle: {cursor:"pointer"},
    },
    { headerName: "값", field: "comp_val", minWidth:100, editable: true, 
      valueParser: (params) => {
        return params.newValue === "" ? params.newValue : Number(params.newValue);
      },
      cellClass: params => { return (params.value === "" || isNaN(params.value) || params.value > 100 && params.data.comp_val_typ === "%") ? 'chk-validation type02' : ""; }, 
      cellStyle: {cursor:"pointer"},
    },
    { headerName: "단위", field: "comp_val_typ", minWidth:120, cellEditor: 'agSelectCellEditor', editable: true,
      cellEditorParams: {
        values: ["선택","%","건수"],
      },
      cellClass: params => { return params.value === '선택' && 'chk-validation'; },
      cellStyle: {cursor:"pointer"},
    },
    { headerName: "알람 발송 주기", field: "bat_cycl", minWidth:150, cellEditor: 'agSelectCellEditor', editable: true,
      cellEditorParams: {
        values: ["선택","주","일"],
      },
      cellClass: params => { return params.value === '선택' && 'chk-validation'; },
      cellStyle: {cursor:"pointer"},
    },
    { headerName: "알람발송 여부", field: "alarm_send_yn", minWidth:150, cellRenderer: (params) => {
      return params.data.alarm_send_yn ? "Y" : "N"
    }
    },
    { headerName: "관리", field: "alarm_handler", minWidth:185, cellRenderer: (params) => {
      const value = params.data;
      const fnClickAlarmInsert = useCallback(() => {
        dispatch({
          type: ActionTypes.SHOW_POPUP,
          isPopup: {
            contentType: ActionTypes.CONFIRM_POPUP,
            message: "정말 등록하시겠습니까?",
            onClickAgreeEvt: () => { 
              if(value.alarm_cond === "선택" || value.comp_op === "선택" || (value.comp_val === "" || isNaN(value.comp_val)) || (value.comp_val > 100 && value.comp_val_typ === "%") || (Math.sign(value.comp_val) === -1) || value.comp_val_typ === "선택" || value.bat_cycl === "선택"){
                let keyValue = value.alarm_cond === "선택" && 'alarm_cond' || value.comp_op === "선택" && 'comp_op' || (value.comp_val === "" || isNaN(value.comp_val) || value.comp_val > 100 && value.comp_val_typ === "%" || Math.sign(value.comp_val) === -1) && 'comp_val' || value.comp_val_typ === "선택" && 'comp_val_typ' || value.bat_cycl === "선택" && "bat_cycl";
                let messageValue = value.alarm_cond === "선택" && '기준을' || value.comp_op === "선택" && '조건을' || (value.comp_val === "" || isNaN(value.comp_val) || value.comp_val > 100 && value.comp_val_typ === "%" || Math.sign(value.comp_val) === -1) && '값을' || value.comp_val_typ === "선택" && '단위를' || value.bat_cycl === "선택" && "알람 발송 주기를";
                console.log(Math.sign(value.comp_val) + "//" + typeof (Math.sign(value.comp_val) === -1) + "//" + isNaN(value.comp_val));
                  dispatch({ 
                    type: ActionTypes.SHOW_POPUP,
                    isPopup: { 
                      contentType: ActionTypes.ALERT_POPUP,
                      message: messageValue + (
                        isNaN(value.comp_val) === "NaN" 
                          ? " 확인해주세요. \n값은 숫자만 입력할 수 있습니다."
                          : Math.sign(value.comp_val) === -1
                            ? " 확인해주세요. \n값은 항상 양수값이어야 합니다." 
                            : (value.comp_val > 100 && value.comp_val_typ === "%") 
                              ? " 확인해주세요. \n조건이 %일 경우 값은 100을 넘을 수 없습니다." 
                              : " 입력 해주세요."
                      ),
                      onClickEvt: () => {
                        gridRef.current.api.setFocusedCell(params.rowIndex,keyValue);
                        gridRef.current.api.startEditingCell({
                          rowIndex: params.rowIndex,
                          colKey : keyValue,
                        });
                      }
                    } 
                  });
              }else{
                dispatch(actions.setAlarmInsert({
                  ...alarmParams(params.data),
                  alarm_on_yn: "Y",
                }));
                params.data.alarm_on_yn = true;
                params.data.alarm_insert_yn = true;
                params.data.alarm_handler = !params.data.alarm_handler;
              }
            },
            onClickCancelEvt: () => { console.log("취소완료") }
          },
        });
      },[]);

      const fnClickAlarmDelete = () => {
        dispatch({
          type: ActionTypes.SHOW_POPUP,
          isPopup: {
            isOpen: true,
            contentType: ActionTypes.CONFIRM_POPUP,
            message: "정말 삭제하시겠습니까?",
            onClickAgreeEvt: () => { 
              if(value.alarm_on_yn){
                dispatch({ type: ActionTypes.SHOW_POPUP, isPopup: { contentType: ActionTypes.ALERT_POPUP, message: "알람을 OFF 해주세요." } })
              }else{
                dispatch(actions.setAlarmDelete({ prdt_dcode_cd: params.data.prdt_dcode_cd }));
                params.data.alarm_cond = "선택";
                params.data.bat_cycl = "선택";
                params.data.comp_op = "선택";
                params.data.comp_val = "";
                params.data.comp_val_typ = "선택";
                params.data.alarm_on_yn = false;
                params.data.alarm_insert_yn = false;
                params.data.alarm_handler = !params.data.alarm_handler;
              }
            },
            onClickCancelEvt: () => { console.log("취소완료") }
          },
        });
      };

      const fnClickAlarmModify = () => {
        dispatch({
          type: ActionTypes.SHOW_POPUP,
          isPopup: {
            isOpen: true,
            contentType: ActionTypes.CONFIRM_POPUP,
            message: "정말 수정하시겠습니까?",
            onClickAgreeEvt: () => { 
              if(value.alarm_cond === "선택" || value.comp_op === "선택" || (value.comp_val === "" || isNaN(value.comp_val)) || (value.comp_val > 100 && value.comp_val_typ === "%") || (Math.sign(value.comp_val) === -1) || value.comp_val_typ === "선택" || value.bat_cycl === "선택"){
                let keyValue = value.alarm_cond === "선택" && 'alarm_cond' || value.comp_op === "선택" && 'comp_op' || (value.comp_val === "" || isNaN(value.comp_val) || value.comp_val > 100 && value.comp_val_typ === "%" || Math.sign(value.comp_val) === -1) && 'comp_val' || value.comp_val_typ === "선택" && 'comp_val_typ' || value.bat_cycl === "선택" && "bat_cycl";
                let messageValue = value.alarm_cond === "선택" && '기준을' || value.comp_op === "선택" && '조건을' || (value.comp_val === "" || isNaN(value.comp_val) || value.comp_val > 100 && value.comp_val_typ === "%" || Math.sign(value.comp_val) === -1) && '값을' || value.comp_val_typ === "선택" && '단위를' || value.bat_cycl === "선택" && "알람 발송 주기를";
                dispatch({ 
                  type: ActionTypes.SHOW_POPUP,
                  isPopup: { 
                    contentType: ActionTypes.ALERT_POPUP,
                    message: messageValue +
                      isNaN(value.comp_val) === "NaN" 
                        ? " 확인해주세요. \n값은 숫자만 입력할 수 있습니다."
                        : Math.sign(value.comp_val) === -1
                          ? " 확인해주세요. \n값은 항상 양수값이어야 합니다." 
                          : (value.comp_val > 100 && value.comp_val_typ === "%") 
                            ? " 확인해주세요. \n조건이 %일 경우 값은 100을 넘을 수 없습니다." 
                            : " 입력 해주세요.",
                    onClickEvt: () => {
                      gridRef.current.api.setFocusedCell(params.rowIndex,keyValue);
                      gridRef.current.api.startEditingCell({
                        rowIndex: params.rowIndex,
                        colKey: keyValue,
                      });
                    }
                  } 
                })
              }else{  
                dispatch(actions.setAlarmUpdate({
                  ...alarmParams(params.data),
                  alarm_on_yn: params.data.alarm_on_yn ? "Y" : "N",
                }));
                params.data.alarm_handler = !params.data.alarm_handler;
              }
            },
            onClickCancelEvt: () => { console.log("취소완료") }
          },
        });
      }

      return (
        <>
          {!params.data.alarm_insert_yn
            ? <button className="btn small blue" onClick={() => fnClickAlarmInsert()}>등록</button>
            : <>
                <button className="btn small" onClick={() => fnClickAlarmModify()}>수정</button>
                <button className="btn small red" onClick={() => fnClickAlarmDelete()} style={{marginLeft:"10px"}}>삭제</button>  
              </>
          }
        </>
      )}
    },
    { headerName: "알람 On/Off", field: "alarm_handler", minWidth:110, /*checkboxSelection: true,*/
      cellRenderer: (params) => {
        const fnCickAlramSwitch = () => {
          dispatch({
            type: ActionTypes.SHOW_POPUP,
            isPopup: {
              isOpen: true,
              //title: "Login",
              contentType: ActionTypes.CONFIRM_POPUP,
              message: "정말 알람을 " + (!params.data.alarm_on_yn ? "ON" : "OFF") + "하시겠습니까?",
              onClickAgreeEvt: () => { 
                dispatch(actions.setAlarmOnoff({
                  prdt_dcode_cd: params.data.prdt_dcode_cd,
                  alarm_on_yn: !params.data.alarm_on_yn ? "Y" : "N",
                }));
                params.data.alarm_on_yn = !params.data.alarm_on_yn;
                params.data.alarm_handler = !params.data.alarm_handler;
              },
              onClickCancelEvt: () => { console.log("취소완료")  }
            },
          });
        }
        return (
          <Checkbox 
            toggle
            onChange={() => fnCickAlramSwitch(params)}
            checked={params.data.alarm_on_yn}
            disabled={!params.data.alarm_insert_yn ? true : false }
          />
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
          ref={gridRef}
          columnDefs={columnDefs}
          getRowId={getRowId}
          rowData={state.alarm_list}
          headerHeight={60}
          rowHeight={58}
          defaultColDef={defaultColDef}
          rowClassRules={rowClassRules}
          pagination={state.pagination && state.pagination.total_count > pageSize ? true : false}
          paginationPageSize={pageSize}
          rowSelection={'single'}
          singleClickEdit={true}
          onGridReady={onGridReady}
          stopEditingWhenCellsLoseFocus={true}
        ></AgGridReact>
      </div>
    </>
  );
};

export default PrdReviewAlertGridTop;

PrdReviewAlertGridTop.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};
