import { useEffect, useState, useCallback } from "react";
import {
  Button,
  Select,
  Checkbox,
  Input,
  Modal,
  Popup,
  Icon
} from "semantic-ui-react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import CONST from "/src/utils/constant";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import * as commonUtils from "/src/utils/common";
import * as ActionTypes from "/src/modules/actionTypes";
import * as api from "/src/modules/api";
import actions from "/src/modules/actions/searchListActions";

const PrdReviewOviewSearch = (props) => {
  const state = {...commonUtils.setFilterOptRedux()};
  const searchCodes = useSelector((state) => (state.searchCodes));
  const searchFilters = useSelector((state) => (state.searchParams));
  const router = useRouter();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState({
    dicd : false,
    catcd : false,
    vendor : false,
  });
  const [searchParams, setSearchParams] = useState({
    ...state,
    sortingStatusDicd: false,
    sortingStatusCatcd: false,
    sortingStatusVencd: false,
    sortingStatusVennm: false,
    sortingStatusGcodeCd: false,
    sortingStatusGcodeNm: false,
    sortingStatusMcodeCd: false,
    sortingStatusMcodeNm: false,
    sortingStatusDcodeCd: false,
    sortingStatusDcodeNm: false,
    areaTypeCheck : true,
    searchDicdList : [],
    searchDicdListKeyword : "",
    searchCatcdList : [],
    searchCatcdListCheck: [],
    searchCatcdListKeyword : "",
    searchGcodecdList: [],
    searchGcodecdListKeyword : "",
    selectList : [],
  });

  const [searchType, setSearchType] = useState({ 
    sortingStatusDicd: false,
    sortingStatusCatcd: false,
    sortingStatusVencd: false,
    sortingStatusVennm: false,
    sortingStatusGcodeCd: false,
    sortingStatusGcodeNm: false,
    sortingStatusMcodeCd: false,
    sortingStatusMcodeNm: false,
    sortingStatusDcodeCd: false,
    sortingStatusDcodeNm: false,
    areaTypeCheck : true,
    searchKeywordDicd : "",
    searchKeywordDicdList : [],
  });

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      selectList : [
        ...searchCodes.prdt_di_cd_list.filter(item => searchParams.prdt_di_cd_list.some(text => item.prdt_di_cd.includes(text))),
        ...searchCodes.prdt_cat_cd_list.filter(item => searchParams.prdt_cat_cd_list.some(text => item.prdt_cat_cd.includes(text))),
        /*
        ...searchCodes.prdt_gcode_cd_list.filter(item => state.prdt_gcode_cd_list.some(text => item.prdt_gcode_cd.includes(text))),
        ...searchCodes.prdt_mcode_cd_list.filter(item => state.prdt_mcode_cd_list.some(text => item.prdt_mcode_cd.includes(text))),
        ...searchCodes.prdt_dcode_cd_list.filter(item => state.prdt_dcode_cd_list.some(text => item.prdt_gcode_cd.includes(text))),
        */
      ],
    });
  },[searchCodes]);
  

  useEffect(() => {
    const catCode = searchCodes.prdt_cat_cd_list.filter(item => searchParams.selectList.some(text => item.prdt_di_cd.includes(text.prdt_di_cd)));
    const gCode = searchCodes.prdt_gcode_cd_list.filter(item => searchParams.selectList.some(text => item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd)));
    setSearchParams({
      ...searchParams,
      prdt_di_cd_list : [...new Set(searchParams.selectList.filter(item => item.prdt_di_cd).map(item => item.prdt_di_cd))],
      prdt_cat_cd_list : [...new Set(searchParams.selectList.filter(item => item.prdt_cat_cd).map(item => item.prdt_cat_cd))],
      searchDicdList : searchCodes.prdt_di_cd_list.filter(item => item.prdt_di_nm.includes(searchParams.searchDicdListKeyword)),
      searchCatcdList : catCode.filter(item => item.prdt_cat_nm.includes(searchParams.searchCatcdListKeyword))
      //searchCatcdList : catCode.length > 0 ? catCode : searchCodes.prdt_cat_cd_list,
      //searchGcodecdList : gCode.length > 0 ? gCode : searchCodes.prdt_gcode_cd_list,
    });
    console.log(searchParams.searchDicdListKeyword)
  },[searchParams.selectList]);
  //console.log(searchParams.prdt_di_cd_list)
  /*
  useEffect(() => {
    setSearchParams({
      ...searchParams,
      searchCatcdList : searchCodes.prdt_cat_cd_list.filter(item => searchParams.selectList.some(text => item.prdt_di_cd.includes(text.prdt_di_cd))),
      searchGcodecdList : searchCodes.prdt_gcode_cd_list.filter(item => searchParams.selectList.some(text => item.prdt_di_cd.includes(text.prdt_di_cd)))
    });
  },[searchParams.prdt_di_cd_list]);
  */

  useEffect(() => {
    setSearchParams({...searchParams, ...state});
    if(props.type === "hide"){
      dispatch(actions.getSearchList(searchFilters,"hide"));
    }else{
      dispatch(actions.getSearchList(searchFilters));
    } 
  },[router]);

  const fnSearchKeywords = (e, data, list, type, cd, nm) => {
    const searchKeywordType = (
      type === "searchCatcdList" && "prdt_di_cd" ||
      type === "ff" && "" 
    )

    const searchKeywordList = type !== "searchDicdList" && searchCodes[list].filter(item => searchParams.selectList.some(text => item[searchKeywordType].includes(text[searchKeywordType])));
    const item = 
      type === "searchDicdList" 
        ? searchCodes[list].filter(item => item.prdt_di_nm.includes(data.value))
        : cd === "" ? searchKeywordList.filter(item=>item[nm].includes(data.value)) : searchKeywordList.filter(item=>item[cd].includes(data.value) || item[nm].includes(data.value));

    setSearchParams({
      ...searchParams,
      //[type] : item,
      [type] : item,
      [type + "Keyword"] : data.value,
    });
    console.log(searchParams.searchDicdList.filter(item => item.prdt_di_nm.includes(data.value)))
  }

  const fnSearchKeywordClaers = (e, data, type) => {
    const item = searchParams[type];
    setSearchParams({
      ...searchParams,
      [type] : item,
      [type + "Keyword"] : "",
    })
  }

  const fnClickAllCheckbox = (e, data, type, search, cd) => {
    setSearchParams({
      ...searchParams,
      //[type] : data.checked ? searchParams[search].map(item => item[cd]) : [],
      selectList: 
        e.target.checked 
          ? type === "prdt_di_cd_list" ? searchCodes[type] : [] 
          : []
    });
    console.log(searchCodes[type])
  }
  
  const fnClickCheckLists = (e, data, type) => {
    setSearchParams({
      ...searchParams,      
      //[type]: e.target.checked ? [...searchParams[type], data.value] : searchParams[type].filter(item => item !== data.value),
      //selectList: e.target.checked ? [...searchParams.selectList, data] : searchParams.selectList.filter(item => item.id !== data.value),
      selectList: e.target.checked 
        ? [...searchParams.selectList, ...searchCodes[type].filter(item => item[type.replace("_list","")].includes(data.value))]
        : searchParams.selectList.filter(item => item[type.replace("_list","")] !== data.value),
    });
  }

  const fnClickSortings = (e, data, type, cd, nm, sorting) => {
    setSearchParams({ 
      ...searchParams,
      [type] : searchParams[sorting]
        ? searchParams[type].sort((a,b) => a[cd === "" ? nm : cd] < b[cd === "" ? nm : cd] ? -1 : a[cd === "" ? nm : cd] > b[cd === "" ? nm : cd] ? 1 : 0)
        : searchParams[type].sort((a,b) => a[cd === "" ? nm : cd] < b[cd === "" ? nm : cd] ? 1 : a[cd === "" ? nm : cd] > b[cd === "" ? nm : cd] ? -1 : 0),
      [sorting] : !searchParams[sorting],
    });
  }

  const fnClickResetParams = () => {
    router.push(
      { pathname: router.pathname.replace("[...parmas]","search=") }
    );
  }

  const fnClickResetGCode = () => {
    setSearchParams({
      ...searchParams,
      prdt_gcode_cd_list : [],
      prdt_mcode_cd_list : [],
      prdt_dcode_cd_list : [],
    })
  }

  const fnClickSearchType = (e, data) => {
    setSearchParams({
      ...searchParams,
      period:data.value,
      start_date: commonUtils.getDateConvision(state.start_date,"start_date",data.value),
      end_date: commonUtils.getDateConvision(state.end_date,"end_date",data.value)
    })
  }

  const prdFilterGubun = (e, data, type) => {
    if(type==="area_cd"){
      setSearchType({
        ...searchType,
        areaTypeCheck : data.value=== "ALL" ? true : false,
      });
      setSearchParams({
        ...searchParams,
        area_cd: data.value,
        store_cd : "ALL"
      });
    }else if(type==="review_chn"){
      setSearchParams({
        ...searchParams,
        review_chn: data.value,
        score_list: [],
        posit_or_negat_list: []
      });
    }else if(type === "score_list" || type === "posit_or_negat_list"){
      setSearchParams({
        ...searchParams,
        [type]: e.target.checked
        ? [...searchParams[type], data.value]
        : searchParams[type].filter(item => item !== data.value)        
      });

    }else{
      setSearchParams({
        ...searchParams,
        [type]: data.value,
      });
    }
  };
  
  const fnClickRemoveBtn = (data, type) => {
    setSearchParams({
      ...searchParams,
      [type] : searchParams[type].filter(item => item !== data)
    })
  }
  
  const fnClickDateRange = (e, data, type) => {
    if(data.value !== null){
      if(data.value > new Date()){
        popupDispatch("시작일과 종료일은\n오늘 이후의 날짜를 선택할 수 없습니다.");
      }      
      setSearchParams({
        ...searchParams,
        [type]: data.value > new Date() ? commonUtils.getDateStr(new Date(),"dash") : commonUtils.getDateStr(data.value)
      });
    }
  }

  const popupDispatch = (message) => {
    dispatch({
      type: ActionTypes.SHOW_POPUP,
      isPopup: {
        isOpen: true,
        title: "Login",
        contentType: ActionTypes.ALERT_POPUP,
        message: message,
      },
    });
  };

  const fnClickInqRvOview = async() => {
    if(searchParams.start_date > searchParams.end_date){
      popupDispatch("종료일이 시작일보다 빠릅니다. 다시 선택해주세요.");
      return;
    }
    if(commonUtils.getDateDiff(searchParams.start_date,searchParams.end_date) > 180){
      popupDispatch("구매기간 설정은 최대 180일을 넘을 수 없습니다.");
      return;
    }

    const searchUrlParams = {
      page_num: searchParams.page_num,
      page_size:searchParams.page_size,
      period: searchParams.period,
      start_date: searchParams.start_date,
      end_date: searchParams.end_date,
      prdt_di_cd_list: searchParams.prdt_di_cd_list.toString(),
      prdt_cat_cd_list: searchParams.prdt_cat_cd_list.toString(),
      prdt_gcode_cd_list: searchParams.prdt_gcode_cd_list.toString(),
      prdt_mcode_cd_list: searchParams.prdt_mcode_cd_list.toString(),
      prdt_dcode_cd_list : searchParams.prdt_dcode_cd_list.toString(),
      ven_cd_list: searchParams.ven_cd_list.toString(),
      brnd_cd_list: searchParams.brnd_cd_list.toString(),
      review_chn: searchParams.review_chn,
    }
    router.push(
      {
        pathname: router.pathname.replace("[...parmas]","search="),
        query : (
          props.type === "overview_list" 
            ? { ...searchUrlParams }
            : props.type === "overview_detail" && {
              ...searchUrlParams,
              prdt_cd: searchParams.prdt_cd ? searchParams.prdt_cd : "",
              prdt_dcode_nm : searchParams.prdt_dcode_nm,
              area_cd: searchParams.area_cd, 
              store_cd: searchParams.store_cd,
              score_list: searchParams.score_list.toString(),
              posit_or_negat_list: searchParams.posit_or_negat_list.toString(),
            }
        )
      }
      //"prdReview/detail/" + params
    );
  };

  return (
    <div className="search-wrap" style={{display:"block", position:"relative"}}>
      <div className="search-box" style={{display:"flex"}}>
        {/*<><div style={{fontSize:"18px", color:"#222"}}>"checkbox = " + {JSON.stringify(searchParams.prdt_di_cd_list)}</div></>*/}
        <div className="input-box">
          <Select
            style={{ width: "88px" }}
            options={CONST.SELECT_GUBUN_FILTER}
            onChange={(e, data) => prdFilterGubun(e, data, "review_chn")}
            value={searchParams.review_chn}
          />
        </div>
        <div className="input-box line">
          <span className="label">구매기간</span>
          <Select
            style={{ width: "88px" }}
            options={CONST.SELECT_DATE_FILTER}
            onChange={(e, data) => fnClickSearchType(e, data)}
            value={searchParams.period}
          />
          <div className="calendar-wrap">
            {
              searchParams.period === "day" ?
                <>
                  <SemanticDatepicker
                    id="selectedStartDateRange"
                    locale="ko-KR"
                    onChange={(e, data) => fnClickDateRange(e, data, "start_date")}
                    type="month"
                    showToday={false}
                    clearable={false}
                    //error={true}
                    maxDate={new Date()}
                    value={commonUtils.stringToDate(searchParams.start_date)}
                    maxValue={new Date("2023-09-26")}
                  />
                  <span className="space">~</span>
                  <SemanticDatepicker
                    id="selectedEndDateRange"
                    locale="ko-KR"
                    onChange={(e, data) => fnClickDateRange(e, data, "end_date")}
                    type="basic"
                    showToday={false}
                    clearable={false}
                    maxDate={new Date()}
                    value={commonUtils.stringToDate(searchParams.end_date)}
                  />
              </>
              :
              <>
                <Select
                    style={{ width: "180px" }}
                    id={
                      searchParams.period === "week" && "selectedStartWeekRange" ||
                      searchParams.period === "month" && "selectedStartMonthRange" ||
                      searchParams.period === "quarter" && "selectedStartQuarterRange"
                    }
                    options={
                      searchParams.period === "week" && props.period_week.start_date ||
                      searchParams.period === "month" && props.period_month.start_date ||
                      searchParams.period === "quarter" && props.period_quarter.start_date
                    }
                    onChange={(e, data) => fnClickDateRange(e, data, "start_date")}
                    value={searchParams.start_date}
                />
                <span className="space">~</span>
                <Select
                    style={{ width: "180px" }}
                    id={
                      searchParams.period === "week" && "selectedEndWeekRange" ||
                      searchParams.period === "month" && "selectedEndMonthRange" ||
                      searchParams.period === "quarter" && "selectedEndQuarterRange"
                    }
                    options={
                      searchParams.period === "week" && props.period_week.end_date ||
                      searchParams.period === "month" && props.period_month.end_date ||
                      searchParams.period === "quarter" && props.period_quarter.end_date
                    }
                    onChange={(e, data) => fnClickDateRange(e, data, "end_date")}
                    value={searchParams.end_date}
                />
              </>
            }

          </div>
        </div>
      </div>
      <div className="search-box" style={{display:"flex", margin:"10px 0 0 0"}}>
      <div className="input-box">
        <Popup
          open= {searchOpen.dicd}
          onClose={() => setSearchOpen({...searchOpen, dicd: false})}
          onOpen={() => setSearchOpen({...searchOpen, dicd: true})}
          className="select-popup"
          trigger={<Button className="btn-select" 
          content={"담당(" + searchParams.prdt_di_cd_list.length+ ")"}/>}
          content={
            <div>
              <div className="check-list" style={{ width: "300px" }}>
                <Input
                  placeholder="담당명 또는 코드​"
                  id="dicdDataSearch"
                  value={searchParams.searchDicdListKeyword}
                  onChange={(e, data) => fnSearchKeywords(e, data, "prdt_di_cd_list", "searchDicdList", "", "prdt_di_nm")}
                  icon={
                    <Icon
                        name="x"
                        link
                        onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchDicdList")}
                    />
                  }
                />
                <ul>
                  {searchParams.searchDicdList.length > 0 &&
                    <li>
                      <div className="filter-box">
                        <div className="left">
                          <Checkbox
                            label="전체"
                            id="dicdDataAllCheck"
                            onChange={(e, data) => fnClickAllCheckbox(e, data, "prdt_di_cd_list", "searchDicdList", "prdt_di_cd")}
                            checked={searchParams.searchDicdList.length === searchParams.prdt_di_cd_list.length }
                          />
                        </div>
                        <div className="right">
                          <div className="filter-inner">
                            <button onClick={(e, data) => fnClickSortings(e, data, "searchDicdList", "", "prdt_di_nm", "sortingStatusDicd")}>
                              <i className={ "sort amount icon " + (searchParams.sortingStatusDicd ? "down" : "up")}></i>이름순
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  }
                  {searchParams.searchDicdList.length > 0 ?
                    searchParams.searchDicdList.map((item,idx) => {
                    return (
                      <li key={item.prdt_di_nm}>
                        <Checkbox
                          id={item.prdt_di_cd}
                          label={item.prdt_di_nm}
                          value={item.prdt_di_cd}
                          prdt_di_cd={item.prdt_di_cd}
                          onChange={(e, data) => fnClickCheckLists(e, data, "prdt_di_cd_list")}
                          checked={searchParams.prdt_di_cd_list.includes(item.prdt_di_cd)}
                        />
                      </li>
                    )})
                    : <li><p style={{lineHeight:"215px", textAlign:"center"}}>검색 결과가 없습니다.</p></li>
                  }
                </ul>
              </div>
              <div className="result-list" style={{ width: "300px" }}>
                <strong>
                  선택항목
                  <span>({searchParams.prdt_di_cd_list.length})</span>
                  <button className="code_close_icon" onClick={() => setSearchOpen({...searchOpen, dicd: false})}>
                    <i className="close icon"></i>
                  </button>
                </strong>
                <div>
                  <ul>
                    {searchParams.prdt_di_cd_list.map((item,idx) =>
                      <li key={"di_cd_list" + idx}>
                        <button onClick={() => fnClickRemoveBtn(item, "prdt_di_cd_list")}>삭제</button>
                        <span>
                          {searchCodes.prdt_di_cd_list.filter(x => x.prdt_di_cd === item).map(x => x.prdt_di_nm)}
                        </span>
                      </li>
                    )} 
                  </ul>
                </div>
              </div>
            </div>
          }
          on="click"
          flowing
        />
      </div>

      <div className="input-box">
        {<Popup
          className="select-popup"
          open= {searchOpen.catcd}
          onClose={() => setSearchOpen({...searchOpen, catcd: false})}
          onOpen={() => setSearchOpen({...searchOpen, catcd: true})}
          trigger={<Button className="btn-select" 
          content={"팀(" + searchParams.prdt_cat_cd_list.length+ ")"} />}
          content={
            <div>
              <div className="check-list" style={{ width: "300px" }}>
                <Input
                  placeholder="팀명"
                  id="dicdDataSearch"
                  value={searchParams.searchCatcdListKeyword}
                  onChange={(e, data) => fnSearchKeywords(e, data, "prdt_cat_cd_list", "searchCatcdList", "", "prdt_cat_nm")}
                  icon={
                    <Icon
                        name="x"
                        link
                        onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchCatcdList")}
                    />
                }
                />
                <ul>
                  {searchParams.searchCatcdList.length > 0 &&
                    <li>
                      <div className="filter-box">
                        <div className="left">
                          <Checkbox
                            label="전체"
                            id="dicdDataAllCheck"
                            onChange={(e, data) => fnClickAllCheckbox(e, data, "prdt_cat_cd_list", "searchCatcdList", "prdt_cat_cd")}
                            checked={searchParams.searchCatcdList.length === searchParams.prdt_cat_cd_list.length }
                          />
                        </div>
                        <div className="right">
                          <div className="filter-inner">
                            <button onClick={(e, data) => fnClickSortings(e, data, "searchCatcdList", "", "prdt_cat_nm", "sortingStatusCatcd")}>
                              <i className={ "sort amount icon " + (searchParams.sortingStatusCatcd ? "down" : "up")}></i>이름순
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  }
                  {searchParams.searchCatcdList.length > 0 ?
                      searchParams.searchCatcdList.map((item,idx) => {
                      return (
                        <li key={item.prdt_cat_nm}>
                          <Checkbox
                            id={item.prdt_cat_cd}
                            label={item.prdt_cat_nm}
                            value={item.prdt_cat_cd}
                            prdt_cat_cd={item.prdt_cat_cd}
                            onChange={(e, data) => fnClickCheckLists(e, data, "prdt_cat_cd_list")}
                            checked={searchParams.prdt_cat_cd_list.includes(item.prdt_cat_cd)}
                          />
                        </li>
                      )})
                      : <li><p style={{lineHeight:"215px", textAlign:"center"}}>검색 결과가 없습니다.</p></li>
                    }
                </ul>
              </div>
              <div className="result-list" style={{ width: "300px" }}>
                <strong>
                  선택항목
                  <span>({searchParams.prdt_cat_cd_list.length})</span>
                  <button className="code_close_icon" onClick={() => setSearchOpen({...searchOpen, catcd: false})}>
                    <i className="close icon"></i>
                  </button>
                </strong>
                <div>
                  <ul>
                    {searchParams.prdt_cat_cd_list.map((item,idx) =>
                      <li key={"prdt_cat_cd_list" + idx}>
                        <button onClick={() => fnClickRemoveBtn(item, "prdt_cat_cd_list")}>삭제</button>
                        <span>
                          {searchCodes.prdt_cat_cd_list.filter(x => x.prdt_cat_cd === item).map(x => x.prdt_cat_nm)}
                        </span>
                      </li>
                    )} 
                  </ul>
                </div>
              </div>
            </div>
          }
          on="click"
          flowing
        />
        }
      </div>

      <div className="input-box">
        {<Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button className="btn-select plus">
                    분류({searchParams.prdt_gcode_cd_list.length + searchParams.prdt_mcode_cd_list.length + searchParams.prdt_dcode_cd_list.length})
                  </Button>
                  }
        >
          <Modal.Header>분류<button onClick={() => setOpen(false)} className="code_close_icon"><i className="close icon"></i></button></Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <div className="select-popup">
                <div>
                  <div className="check-list">
                    <Input
                      placeholder="대분류명 또는 코드"
                      id="gCodeDataSearch"
                      value={searchCodes.searchKeywordGcodecd}
                      onChange={(e, data) => fnSearchKeywords(e, data, "prdt_gcode_cd_list", "searchGcodecdList", "prdt_gcode_cd", "prdt_gcode_nm")}
                      icon={
                        <Icon
                            name="x"
                            link
                            onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchGcodecdList")}
                        />
                      }
                    />
                    <ul>
                      {searchParams.searchGcodecdList.length > 0 &&
                        <li>
                          <div className="filter-box">
                            <div className="left">
                              <Checkbox
                                label="전체"
                                id="gCodeDataAllCheck"
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "prdt_gcode_cd_list", "searchGcodecdList", "prdt_gcode_cd")}
                                checked={searchParams.searchGcodecdList.length === searchParams.prdt_gcode_cd_list.length }
                              />
                            </div>
                            <div className="right">
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchGcodecdList", "prdt_gcode_cd", "", "sortingStatusGcodeCd")}>
                                  <Popup
                                    size="mini"
                                    content={`코드순`}
                                    trigger={<i className={ "sort numeric icon " + (searchCodes.sortingStatusGcodeCd ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchGcodecdList", "", "prdt_gcode_nm", "sortingStatusGcodeNm")}>
                                  <Popup
                                    size="mini"
                                    content={`이름순`}
                                    trigger={<i className={ "sort amount icon " + (searchCodes.sortingStatusGcodeNm ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      }
                      {searchParams.searchGcodecdList.length > 0 ?
                        searchParams.searchGcodecdList.map((item,idx) => {
                        return (
                          <li key={item.prdt_gcode_cd}>
                            <Checkbox
                              id={item.prdt_gcode_cd}
                              label={item.prdt_gcode_cd + " " + item.prdt_gcode_nm}
                              value={item.prdt_gcode_cd}
                              onChange={(e, data) => fnClickCheckLists(e, data, "prdt_gcode_cd_list")}
                              checked={searchParams.prdt_gcode_cd_list.includes(item.prdt_gcode_cd)}
                            />
                          </li>
                        )})
                        : <li><p style={{lineHeight:"250px", padding:"10px 0 0 0", textAlign:"center", fontWeight:"400"}}>검색 결과가 없습니다.</p></li>
                      }
                    </ul>
                  </div>
                  {/*
                  <div className="check-list">
                    <Input
                      placeholder="중분류명 또는 코드"
                      id="mCodeDataSearch"
                      value={searchCodes.searchKeywordMcodecd}
                      onChange={(e, data) => fnSearchKeyword(e, data, "prdt_mcode_cd_list", "prdt_mcode_cd", "prdt_mcode_nm", "searchKeywordMcodecd")}
                      icon={
                        <Icon
                            name="x"
                            link
                            onClick={(e, data) => fnSearchKeywordClaer(e, data, "prdt_mcode_cd_list", "prdt_mcode_cd", "prdt_mcode_nm", "searchKeywordMcodecd")}
                        />
                      }
                    />
                    <ul>
                      {searchCodes.prdt_mcode_cd_list_keyword.length > 0 &&
                        <li>
                          <div className="filter-box">
                            <div className="left">
                              <Checkbox
                                label="전체"
                                id="mCodeDataAllCheck"
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "prdt_mcode_cd_list", "prdt_mcode_cd", "prdt_mcode_nm")}
                                checked={searchCodes.prdt_mcode_cd_list_keyword.length === searchParams.prdt_mcode_cd_list.length }
                              />
                            </div>
                            <div className="right">
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "prdt_mcode_cd_list_keyword", "prdt_mcode_cd", "", "sortingStatusMcodeCd")}>
                                  <Popup
                                    size="mini"
                                    content={`코드순`}
                                    trigger={<i className={ "sort numeric icon " + (searchCodes.sortingStatusMcodeCd ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "prdt_mcode_cd_list_keyword", "", "prdt_mcode_nm", "sortingStatusMcodeNm")}>
                                  <Popup
                                    size="mini"
                                    content={`이름순`}
                                    trigger={<i className={ "sort amount icon " + (searchCodes.sortingStatusMcodeNm ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      }
                      {searchCodes.prdt_mcode_cd_list_keyword.length > 0 ?
                        searchCodes.prdt_mcode_cd_list_keyword.map((item,idx) => {
                        return (
                          <li key={item.prdt_mcode_cd}>
                            <Checkbox
                              id={item.prdt_mcode_cd}
                              label={item.prdt_mcode_cd + " " + item.prdt_mcode_nm}
                              value={item.prdt_mcode_cd}
                              onChange={(e, data) => fnClickCheckList(e, data, "prdt_mcode_cd_list")}
                              checked={searchParams.prdt_mcode_cd_list.includes(item.prdt_mcode_cd)}
                            />
                          </li>
                        )})
                        : <li><p style={{lineHeight:"250px", padding:"10px 0 0 0", textAlign:"center", fontWeight:"400"}}>검색 결과가 없습니다.</p></li>
                      }
                    </ul>
                  </div>

                  <div className="check-list">
                    <Input
                      placeholder="소분류명 또는 코드"
                      id="dCodeDataSearch"
                      value={searchCodes.searchKeywordDcodecd}
                      onChange={(e, data) => fnSearchKeyword(e, data, "prdt_dcode_cd_list", "prdt_dcode_cd", "prdt_dcode_nm", "searchKeywordDcodecd")}
                      icon={
                        <Icon
                            name="x"
                            link
                            onClick={(e, data) => fnSearchKeywordClaer(e, data, "prdt_dcode_cd_list", "prdt_dcode_cd", "prdt_dcode_nm", "searchKeywordDcodecd")}
                        />
                      }
                    />
                    <ul>
                      {searchCodes.prdt_dcode_cd_list_keyword.length > 0 &&
                        <li>
                          <div className="filter-box">
                            <div className="left">
                              <Checkbox
                                label="전체"
                                id="dCodeDataAllCheck"
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "prdt_dcode_cd_list", "prdt_dcode_cd", "prdt_dcode_nm")}
                                checked={searchCodes.prdt_dcode_cd_list_keyword.length === searchParams.prdt_dcode_cd_list.length }
                              />
                            </div>
                            <div className="right">
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "prdt_dcode_cd_list_keyword", "prdt_dcode_cd", "", "sortingStatusDcodeCd")}>
                                  <Popup
                                    size="mini"
                                    content={`코드순`}
                                    trigger={<i className={ "sort numeric icon " + (searchCodes.sortingStatusDcodeCd ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "prdt_dcode_cd_list_keyword", "", "prdt_dcode_nm", "sortingStatusDcodeNm")}>
                                  <Popup
                                    size="mini"
                                    content={`이름순`}
                                    trigger={<i className={ "sort amount icon " + (searchCodes.sortingStatusDcodeNm ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      }
                      {searchCodes.prdt_dcode_cd_list_keyword.length > 0 ?
                        searchCodes.prdt_dcode_cd_list_keyword.map((item,idx) => {
                        return (
                            <li key={item.prdt_dcode_cd}>
                              <Checkbox
                                id={item.prdt_dcode_cd}
                                label={item.prdt_dcode_cd + " " + item.prdt_dcode_nm}
                                value={item.prdt_dcode_cd}
                                onChange={(e, data) => fnClickCheckList(e, data, "prdt_dcode_cd_list")}
                                checked={searchParams.prdt_dcode_cd_list.includes(item.prdt_dcode_cd)}
                              />
                            </li>
                        )})
                        : <li><p style={{lineHeight:"250px", padding:"10px 0 0 0", textAlign:"center", fontWeight:"400"}}>검색 결과가 없습니다.</p></li>
                      }
                    </ul>
                  </div>
                  */}
                  <div className="result-list">
                    <strong>
                      선택항목
                      <span>({searchParams.prdt_gcode_cd_list.length + searchParams.prdt_mcode_cd_list.length + searchParams.prdt_dcode_cd_list.length})</span>
                    </strong>
                    <div>
                      <ul>
                        {searchParams.prdt_gcode_cd_list.map((item,idx) =>
                          <li key={item + "_cd"}>
                            <button onClick={() => fnClickRemoveBtn(item, "prdt_gcode_cd_list")}>삭제</button>
                            <span>
                              <b className="gCode-label">대분류 </b>{ searchCodes.prdt_gcode_cd_list.filter(x => x.prdt_gcode_cd === item).map(x => x.prdt_gcode_cd) + " " + searchCodes.prdt_gcode_cd_list.filter(x => x.prdt_gcode_cd === item).map(x => x.prdt_gcode_nm) }
                            </span>
                          </li>
                        )} 
                        {searchParams.prdt_mcode_cd_list.map((item,idx) =>
                          <li key={item + "_cd"}>
                            <button onClick={() => fnClickRemoveBtn(item, "prdt_mcode_cd_list")}>삭제</button>
                            <span>
                              <b className="mCode-label">중분류 </b>{ searchCodes.prdt_mcode_cd_list.filter(x => x.prdt_mcode_cd === item).map(x => x.prdt_mcode_cd) + " " + searchCodes.prdt_mcode_cd_list.filter(x => x.prdt_mcode_cd === item).map(x => x.prdt_mcode_nm) }
                            </span>
                          </li>
                        )} 
                        {searchParams.prdt_dcode_cd_list.map((item,idx) =>
                          <li key={item + "_cd"}>
                            <button onClick={() => fnClickRemoveBtn(item, "prdt_dcode_cd_list")}>삭제</button>
                            <span>
                            <b className="dCode-label">소분류 </b> { searchCodes.prdt_dcode_cd_list.filter(x => x.prdt_dcode_cd === item).map(x => x.prdt_dcode_cd) + " " + searchCodes.prdt_dcode_cd_list.filter(x => x.prdt_dcode_cd === item).map(x => x.prdt_dcode_nm) }
                            </span>
                          </li>
                        )} 
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => fnClickResetGCode()} className="btn">
              초기화
            </Button>
            <Button
              content="적용"
              onClick={() => setOpen(false)}
              className="btn blue"
            />
          </Modal.Actions>
        </Modal>
        }
      </div>

      <div className="input-box">
        {/*<Popup
          className="select-popup"
          open= {searchOpen.vendor}
          onClose={() => setSearchOpen({...searchOpen, vendor: false})}
          onOpen={() => setSearchOpen({...searchOpen, vendor: true})}
          trigger={<Button className="btn-select" content={"협력회사(" + searchParams.ven_cd_list.length + ")"}/>}
          content={
            <div>
              <div className="check-list" style={{ width: "400px" }}>
                <Input
                  placeholder="협력회사명 또는 코드​"
                  id="vendorDataSearch"
                  value={searchCodes.searchKeywordVencd}
                  onChange={(e, data) => fnSearchKeyword(e, data, "ven_cd_list", "vendor", "name", "searchKeywordVencd")}
                  icon={
                    <Icon
                        name="x"
                        link
                        onClick={(e, data) => fnSearchKeywordClaer(e, data, "ven_cd_list", "vendor", "name", "searchKeywordVencd")}
                    />
                  }
                  style={{ width: "385px" }}
                />
                <ul>
                  {searchCodes.ven_cd_list_keyword.length > 0 &&
                    <li>
                      <div className="filter-box">
                        <div className="left">
                          <Checkbox
                            label="전체"
                            id="dicdDataAllCheck"
                            onChange={(e, data) => fnClickAllCheckbox(e, data, "ven_cd_list", "vendor", "name")}
                            checked={searchCodes.ven_cd_list_keyword.length === searchParams.ven_cd_list.length }
                          />
                        </div>
                        <div className="right">
                          <div className="filter-inner">
                            <button onClick={(e, data) => fnClickSortings(e, data, "ven_cd_list_keyword", "vendor", "", "sortingStatusVencd")}>
                              <i className={ "sort numeric icon " + (searchCodes.sortingStatusVencd ? "down" : "up")}></i>코드순
                            </button>
                          </div>
                          <div className="filter-inner">
                            <button onClick={(e, data) => fnClickSortings(e, data, "ven_cd_list_keyword", "", "name", "sortingStatusVennm")}>
                              <i className={ "sort amount icon " + (searchCodes.sortingStatusVennm ? "down" : "up")}></i>이름순
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    }
                    {searchCodes.ven_cd_list_keyword.length > 0 ?
                      searchCodes.ven_cd_list_keyword.map((item,idx) => {
                      return (
                        <li key={item.vendor}>
                          <Checkbox
                            id={item.vendor}
                            label={item.vendor + " " + item.name}
                            value={item.vendor}
                            onChange={(e, data) => fnClickCheckList(e, data, "ven_cd_list")}
                            checked={searchParams.ven_cd_list.includes(item.vendor)}
                          />
                        </li>
                      )})
                      : <li><p style={{lineHeight:"215px", textAlign:"center"}}>검색 결과가 없습니다.</p></li>
                    }
                  </ul>
              </div>
              <div className="result-list" style={{ width: "400px" }}>
                <strong>
                  선택항목
                  <span>({searchParams.ven_cd_list.length})</span>
                  <button className="code_close_icon" onClick={() => setSearchOpen({...searchOpen, vendor: false})}>
                    <i className="close icon"></i>
                  </button>
                </strong>
                <div>
                  <ul>
                    {searchParams.ven_cd_list.map((item,idx) =>
                      <li key={"ven_cd_list" + idx}>
                        <button onClick={() => fnClickRemoveBtn(item, "ven_cd_list")}>삭제</button>
                        <span>
                          { searchCodes.ven_cd_list.filter(x => x.vendor === item).map(x => x.vendor) + " " +
                            searchCodes.ven_cd_list.filter(x => x.vendor === item).map(x => x.name)
                          }
                        </span>
                      </li>
                    )} 
                  </ul>
                </div>
              </div>
            </div>
          }
          on="click"
          flowing
        />
        */}</div>
      {
        props.type === "overview_detail" &&
        <>
          <div className="input-box">
            {
              <Select
              style={{ width: "88px" }}
              options={ searchCodes.area_list === undefined ? [{key:"ALL", value:"ALL", text:"권역"}] : searchCodes.area_list}
              value={searchCodes.area_list === undefined || searchParams.area_cd === "" ? "ALL" : searchParams.area_cd}
              onChange={(e, data) => prdFilterGubun(e, data, "area_cd")}
            />
            }
          </div>
          <div className="input-box">
            <Select
              style={{ width: "88px" }}
              options={ searchCodes.store_list === undefined 
                        ? [{key:"ALL", value:"ALL", text:"점포"}] 
                        : searchType.areaTypeCheck ? searchCodes.store_list : searchCodes.store_list.filter(item => item.area_cd === searchParams.area_cd || item.value === "ALL")
              }        
              value={searchCodes.store_list === undefined || searchParams.store_cd === "" ? "ALL" : searchParams.store_cd}
              onChange={(e, data) => prdFilterGubun(e, data, "store_cd")}
            />
          </div>

          <div className="input-box">
            {<Popup
              className="select-popup"
              trigger={<Button className="btn-select" 
              style={{width:"105px"}}
              content={"리뷰평점/감성점수"} />}
              content={
                <div>
                  <div className="check-list flat" style={{ width: "400px" }}>
                    <div className="chk-flat-tit">리뷰평점</div>
                    <ul>
                        {[...Array(parseInt(5))].map((item, idx) => {
                        return (
                          <li key={("score" + idx+1)}>
                            <Checkbox
                              id={String("rv" + idx+1)}
                              label={String(idx+1) + "점"}
                              value={String(idx+1)}
                              onChange={(e, data) => fnClickCheckLists(e, data, "score_list")}
                              checked={searchParams.score_list.includes(String(idx+1))}
                              disabled = {searchParams.review_chn === "EAPP" && idx !== 0 && idx !== 4 && true}
                            />
                          </li>
                        )})
                        }
                    </ul>
                    <div className="chk-flat-tit type02">감성점수</div>
                    <ul>
                        {[...Array(parseInt(5))].map((item, idx) => {
                        return (
                          <li key={("pn"+idx+1)}>
                            <Checkbox
                              id={String("pn" + idx+1)}
                              label={String(idx+1) + "점"}
                              value={String(idx+1)}
                              onChange={(e, data) => fnClickCheckLists(e, data, "posit_or_negat_list")}
                              checked={searchParams.posit_or_negat_list.includes(String(idx+1))}
                            />
                          </li>
                        )})
                        }
                    </ul>
                  </div>
                </div>
              }
              on="click"
              flowing
            />
            }
          </div>
      </>
      }
    </div>
    <div className="btn-group right" style={{position:"absolute",top:"50%", right:"20px", margin:"-23px 0 0 0"}}>
      <button className="btn large btn-reset" onClick={() => fnClickResetParams()}>초기화</button>
      <button className="btn large blue" onClick={() => fnClickInqRvOview()}>
        조회
      </button>
    </div>
    </div>
  );
};

export default PrdReviewOviewSearch;

PrdReviewOviewSearch.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;
  return { pathname };
};


