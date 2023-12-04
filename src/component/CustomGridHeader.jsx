import React, { useEffect, useRef, useState } from 'react';
import { Popup, Button } from "semantic-ui-react";

export default (props) => {
  let info = "";
  props.displayName === "AI 분석 부정 리뷰 추이(8주)" && (info = 
    "입력한 구매기간 검색 조건 중 마지막 날을 기준으로 이전 8주간 텍스트가 있는 리뷰에 대해 AI 모델을 통해 1~5점 감성 점수를 추출하여 부정 리뷰(1,2점에 해당)에 해당하는 건수를 소분류별/상품별로 볼 수 있는 미니 트렌드. 검정색 ( 특이사항 없음) 주황색 (부정 감성 건수가 3주 이상 상승), 붉은색 (부정 감성 건수가 4주 이상 상승) <br/><br/>*참고. AI 분석 부정 리뷰 추이는 사용자가 평가한 부정 리뷰 점수와 달리 AI 모델을 통해서 생성된 리뷰 점수를 기반으로 하고 있습니다. 따라서 부정 평가 리뷰 건수가 0으로 표시되더라도 AI 분석 부정 건수는 0보다 큰 값이 나올 수 있습니다.");
  props.displayName === "VOC 건수" && (info = "채팅 상담만을 기준으로 접수된 VoC 건수");
  props.displayName === "리뷰 평점 평균" && (info = "고객이 상품에 대해 직접 평가한 1~5점 척도의 점수에 대한 평균");
  props.displayName === "전체 리뷰 수" && (info = "고객이 상품에 대해 직접 평가한 리뷰 전체 건수");
  props.displayName === "긍정 리뷰 수" && (info = "고객이 상품에 대해 직접 평가한 1~5점 척도의 점수 중 3, 4, 5점에 대한 리뷰의 건수");
  props.displayName === "부정 리뷰 수" && (info = "고객이 상품에 대해 직접 평가한 1~5점 척도의 점수 중 1, 2점에 대한 리뷰의 건수");
  props.displayName === "부정 리뷰 비율(%)" && (info = "부정 리뷰 수/전체 리뷰 수");
  props.displayName === "세포함 순매출" && (info = "영수증 데이터 기반의 매출 금액으로 에누리 제외 세금 포함 매출 총액");
  props.displayName === "고객평점" && (info = "고객이 상품에 대해 직접 평가한 1~5점 척도의 점수");
  props.displayName === "감성점수" && (info = "AI 모델에 의한 1~5점 척도의 감성 점수");

  const onSortRequested = () => {
    let width = props.column.colDef.minWidth;
    let key = props.column.colDef.key;
    if(props.column.sort === undefined || props.column.sort === null){
      props.setSort('asc');
      props.columnApi.setColumnWidth(key,width+20);
    }else if(props.column.sort === "asc"){
      props.setSort('desc');
    }else if(props.column.sort === "desc"){
      props.setSort('');
      props.columnApi.setColumnWidth(key,width);
    }
  };

  useEffect(() => {
    //props.column.addEventListener('sortChanged', onSortChanged);
  }, []);

  let sort = null;
  if (props.enableSorting) {
    sort = (
      <div 
        className="ag-sort-indicator-container" 
        onClick={() => onSortRequested()}
        style={{ flex: "1 1 auto", overflow: "hidden", alignItems: "center", textOverflow: "ellipsis", alignSelf: "stretch", cursor:"pointer"}}
      >
        <span>{props.displayName}</span>
        {props.column.sort === "asc" && 
          <span className="ag-sort-indicator-icon ag-sort-ascending-icon">
            <span className="ag-icon ag-icon-asc" unselectable="on" role="presentation"></span>
          </span>
        }
        {props.column.sort === "desc" && 
          <span className="ag-sort-indicator-icon ag-sort-descending-icon">
            <span className="ag-icon ag-icon-desc" unselectable="on" role="presentation"></span>
          </span>
        }
      
      </div>
    );
  }else{
    sort = props.displayName
  }

  return (
    <>      
      {sort}
      <Popup
          className="tooltip-wrap grids"
          on="click"
          trigger={<Button content="툴팁" className="tooltip grids" />}
          position="top center"
        >
          <ul className="tooltip-info">
            <li>
              <strong>{props.displayName}</strong>
              <p>
                {info.split("<br/>").map((item, idx) => {
                  return (
                    <span key={idx}>
                        {item}
                        <br/>
                    </span>
                  )
                })}
              </p>
            </li>
          </ul>
        </Popup>
    </>
  );
};