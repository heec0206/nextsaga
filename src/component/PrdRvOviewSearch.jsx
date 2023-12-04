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
  const router = useRouter();
  const dispatch = useDispatch();
  const state = {...commonUtils.setFilterOptRedux()};
  const searchCodes = useSelector((state) => (state.searchCodes));
  const searchFilters = useSelector( (state) => (state.searchParams));
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState({
    dicd : false,
    catcd : false,
    vendor : false,
  });
  const paramsDefs = {
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
    searchMcodecdList: [],
    searchMcodecdListKeyword : "",
    searchDcodecdList: [],
    searchDcodecdListKeyword : "",
    searchVencdList: [],
    searchVencdListKeyword : "",
    selectList : [],
    searchKeyword: "",
    selectListVen: [],
  };

  const [searchParams, setSearchParams] = useState({
    ...state,
    ...paramsDefs
  });

  useEffect(() => {
    setSearchParams({
      ...searchParams,
      selectList : [
        ...searchCodes.prdt_di_cd_list.filter(item => searchParams.prdt_di_cd_list.some(text => item.prdt_di_cd.includes(text))),
        ...searchCodes.prdt_cat_cd_list.filter(item => searchParams.prdt_cat_cd_list.some(text => item.prdt_cat_cd.includes(text))),
        ...searchCodes.prdt_gcode_cd_list.filter(item => searchParams.prdt_gcode_cd_list.some(text => item.prdt_gcode_cd.includes(text))),
        ...searchCodes.prdt_mcode_cd_list.filter(item => searchParams.prdt_mcode_cd_list.some(text => item.prdt_mcode_cd.includes(text))),
        ...searchCodes.prdt_dcode_cd_list.filter(item => searchParams.prdt_dcode_cd_list.some(text => item.prdt_dcode_cd.includes(text))),
        ...searchCodes.ven_cd_list.filter(item => searchParams.ven_cd_list.some(text => item.ven_cd.includes(text))),
      ],
    });
  },[searchCodes]);
  
  useEffect(() => {
    const filter = searchParams.selectList.filter(item => !item.ven_cd);
    const filters = searchParams.selectList.filter(item => item.ven_cd);
    const catCode = searchCodes.prdt_cat_cd_list.filter(item => filter.some(text => item.prdt_di_cd.includes(text.prdt_di_cd)));
    const gCode = searchCodes.prdt_gcode_cd_list.filter(item => filter.some(text => item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd)));
    const mCode = searchCodes.prdt_mcode_cd_list.filter(item => filter.some(text => 
      item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd) && item.prdt_gcode_cd.includes(text.prdt_gcode_cd)
    ));
    const dCode = searchCodes.prdt_dcode_cd_list.filter(item => filter.some(text => 
      item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd) && item.prdt_gcode_cd.includes(text.prdt_gcode_cd) && item.prdt_mcode_cd.includes(text.prdt_mcode_cd)
    ));
    const venCode = searchCodes.ven_cd_list.filter(item => searchParams.selectList.some(text => 
      item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd) && item.prdt_gcode_cd.includes(text.prdt_gcode_cd) && item.prdt_mcode_cd.includes(text.prdt_mcode_cd) && item.prdt_dcode_cd.includes(text.prdt_dcode_cd)
    ));

    const resCdList = (type) => {
      return [...new Set(searchParams.selectList.filter(item => item[type]).map(item => item[type]))]
    }
    
    setSearchParams({
      ...searchParams,
      prdt_di_cd_list : [...new Set(filter.filter(item => item.prdt_di_cd).map(item => item.prdt_di_cd))],
      prdt_cat_cd_list : [...new Set(filter.filter(item => item.prdt_cat_cd).map(item => item.prdt_cat_cd))],
      prdt_gcode_cd_list : [...new Set(filter.filter(item => item.prdt_gcode_cd).map(item => item.prdt_gcode_cd))],
      prdt_mcode_cd_list : [...new Set(filter.filter(item => item.prdt_mcode_cd).map(item => item.prdt_mcode_cd))],
      prdt_dcode_cd_list : [...new Set(filter.filter(item => item.prdt_dcode_cd).map(item => item.prdt_dcode_cd))],
      //ven_cd_list : [...new Set(filters.filter(item => item.ven_cd).map(item => item.ven_cd))],
      ven_cd_list : [...new Set(filters.filter(item => 
        filter.some(text => 
          item.prdt_di_cd !== (text.prdt_di_cd) && item.prdt_cat_cd !== (text.prdt_cat_cd) &&
          item.prdt_gcode_cd !== (text.prdt_gcode_cd) && item.prdt_mcode_cd !== (text.prdt_mcode_cd) &&
          item.prdt_dcode_cd !== (text.prdt_dcode_cd)
        )).map(item => item.ven_cd))
      ],
      searchDicdList : searchCodes.prdt_di_cd_list.filter(item => item.prdt_di_nm.includes(searchParams.searchDicdListKeyword)),
      searchCatcdList : catCode.filter(item => item.prdt_cat_nm.includes(searchParams.searchCatcdListKeyword)),
      searchGcodecdList : gCode.filter(item => item.prdt_gcode_cd.includes(searchParams.searchGcodecdListKeyword) || item.prdt_gcode_nm.includes(searchParams.searchGcodecdListKeyword)),
      searchMcodecdList : mCode.filter(item => item.prdt_mcode_cd.includes(searchParams.searchMcodecdListKeyword) || item.prdt_mcode_nm.includes(searchParams.searchMcodecdListKeyword)),
      searchDcodecdList : dCode.filter(item => item.prdt_dcode_cd.includes(searchParams.searchDcodecdListKeyword) || item.prdt_dcode_nm.includes(searchParams.searchDcodecdListKeyword)),
      searchVencdList : venCode.filter(item => item.ven_cd.includes(searchParams.searchVencdListKeyword) || item.ven_nm.includes(searchParams.searchVencdListKeyword))
    });
  },[searchParams.selectList]);

  useEffect(() => {
    if(router.query.page_num){
      setSearchParams({ 
        ...searchParams,
        //start_date : searchParams.start_date,
        //end_date : searchParams.end_date,
      })
    }else{
      setSearchParams({  ...state, ...paramsDefs })
    }

    let searchFiltersParams = {
      ...searchFilters,
      params: 
        router.pathname.includes("overview/[") && "overview" || router.pathname.includes("detail/[") && "detail" ||
        router.pathname.includes("dashboard/[") && "dashboard" || ""
    }
    if(props.type === "hide"){
      dispatch(actions.getSearchList(searchFiltersParams,"hide"));
    }else{
      dispatch(actions.getSearchList(searchFiltersParams));
    }
  },[router]);

  const fnSearchAny = (e, data, type) => { //, list, type, cd, nm) => {
    const searchKeywordType = "searchKeyword"

    setSearchParams({
      ...searchParams,
      [type] : data.value,
      //[type + "Keyword"] : data.value,
    });
  }


  const fnSearchKeywords = (e, data, list, type, cd, nm) => {
    const venCode = searchCodes.ven_cd_list.filter(item => searchParams.selectList.some(text => 
      item.prdt_di_cd.includes(text.prdt_di_cd) && item.prdt_cat_cd.includes(text.prdt_cat_cd) && item.prdt_gcode_cd.includes(text.prdt_gcode_cd) && item.prdt_mcode_cd.includes(text.prdt_mcode_cd) && item.prdt_dcode_cd.includes(text.prdt_dcode_cd)
    ));
    const searchKeywordType = (
      type === "searchCatcdList" && "prdt_di_cd" ||
      type === "searchGcodecdList" && "prdt_cat_cd" ||
      type === "searchMcodecdList" && "prdt_gcode_cd" ||
      type === "searchDcodecdList" && "prdt_mcode_cd"
    )

    const searchKeywordList = type !== "searchDicdList" && type !== "searchVencdList" && searchCodes[list].filter(item => searchParams.selectList.some(text => item[searchKeywordType].includes(text[searchKeywordType])));
    const item = 
      type === "searchDicdList" 
        ? searchCodes[list].filter(item => item.prdt_di_nm.includes(data.value))
        : type === "searchVencdList"
          ? venCode.filter(item => item.ven_cd.includes(data.value) || item.ven_nm.includes(data.value))
          : cd === "" ? searchKeywordList.filter(item=>item[nm].includes(data.value)) : searchKeywordList.filter(item=>item[cd].includes(data.value) || item[nm].includes(data.value));

    setSearchParams({
      ...searchParams,
      [type] : item,
      [type + "Keyword"] : data.value,
    });
  }

  const fnSearchKeywordClaers = (e, data, type) => {
    const item = searchParams[type];
    setSearchParams({
      ...searchParams,
      [type] : type === "search_keyword" ? "" : item,
      [type + "Keyword"] : "",
    })
  }

  const fnClickAllCheckbox = (e, data, type, code, select) => {
    setSearchParams({
      ...searchParams,
      [select]: 
        e.target.checked 
          ? Array.from(new Set([
              ...searchParams[select],
              ...searchParams[type]
            ]))
          : searchParams[select].filter(item => !item.ven_cd && !searchParams[type].some(text => item[code+"_cd"] === text[code+"_cd"] || item[code+"_nm"] === text[code+"_nm"])),
    });
  }

  const fnClickCheckLists = (e, data, type, select, check) => {
    setSearchParams({
      ...searchParams,      
      [select]: check === true && 
        e.target.checked 
          ? [...searchParams[select], ...searchCodes[type].filter(item => item[type.replace("_list","")].includes(data.value))]
          : searchParams[select].filter(item => 
              Array.isArray(item.prdt_dcode_cd) 
              ? !item[type.replace("_list","")].includes(data.value)
              : item[type.replace("_list","")] !== data.value
            ),
      [type]: check === false && e.target.checked
        ? [...searchParams[type], data.value]
        : searchParams[type].filter(item => item !== data.value),
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
    router.push({ pathname: router.pathname.replace("[...parmas]","search=") });
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
      setSearchParams({
        ...searchParams,
        areaTypeCheck : data.value=== "ALL" ? true : false,
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
    console.log(searchParams.start_date + "//" + searchParams.end_date);
    if(data.value !== null){
      if(data.value > new Date()){
        popupDispatch("시작일과 종료일은\n오늘 이후의 날짜를 선택할 수 없습니다.");
      }
      
      if(props.type === "dashboard"){
        setSearchParams({
          ...searchParams,
          [type]: data.value > commonUtils.stringToDate(commonUtils.yesterDay()) ? commonUtils.getDateStr(commonUtils.stringToDate(commonUtils.yesterDay()),"dash") : commonUtils.getDateStr(data.value),
          end_date : commonUtils.stringToDate(commonUtils.getStartEndDate(data.value,"last")) > commonUtils.stringToDate(commonUtils.yesterDay()) ? commonUtils.getDateStr(commonUtils.stringToDate(commonUtils.yesterDay())) : commonUtils.getStartEndDate(data.value,"last")
        });
      }else{
        setSearchParams({
          ...searchParams,
          [type]: data.value > new Date() ? commonUtils.getDateStr(new Date(),"dash") : commonUtils.getDateStr(data.value),
        });
      }
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
      prdt_dcode_cd_list: searchParams.prdt_dcode_cd_list.toString(),
    }

    router.push(
      {
        pathname: router.pathname.replace("[...parmas]","search="),
        query : (
          props.type === "dashboard" && { ...searchUrlParams } 
          || props.type === "overview_list" && {
            ...searchUrlParams,
            prdt_dcode_cd_list : searchParams.prdt_dcode_cd_list.toString(),
            ven_cd_list: searchParams.ven_cd_list.toString(),
            brnd_cd_list: searchParams.brnd_cd_list.toString(),
            review_chn: searchParams.review_chn,
            search_keyword: searchParams.search_keyword,
          } 
          || props.type === "overview_detail" && {
            ...searchUrlParams,
            prdt_dcode_cd_list : searchParams.prdt_dcode_cd_list.toString(),
            ven_cd_list: searchParams.ven_cd_list.toString(),
            brnd_cd_list: searchParams.brnd_cd_list.toString(),
            review_chn: searchParams.review_chn,
            prdt_cd: searchParams.prdt_cd ? searchParams.prdt_cd : "",
            prdt_dcode_nm : searchParams.prdt_dcode_nm,
            area_cd: searchParams.area_cd, 
            store_cd: searchParams.store_cd,
            score_list: searchParams.score_list.toString(),
            posit_or_negat_list: searchParams.posit_or_negat_list.toString(),
            search_keyword: searchParams.search_keyword,
          }
        )
      }
      //"prdReview/detail/" + params
    );
  }; 

  return (
    <div className="search-wrap" style={{display:"block", position:"relative"}}>
      { props.type !== "dashboard" &&
        <div className="search-box" style={{display:"flex"}}>
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
                      datePickerOnly={true}
                      value={commonUtils.stringToDate(searchParams.start_date)}
                      maxDate={commonUtils.stringToDate(commonUtils.yesterDay())}
                    />
                    <span className="space">~</span>
                    <SemanticDatepicker
                      id="selectedEndDateRange"
                      locale="ko-KR"
                      onChange={(e, data) => fnClickDateRange(e, data, "end_date")}
                      type="basic"
                      showToday={false}
                      clearable={false}
                      datePickerOnly={true}
                      maxDate={commonUtils.stringToDate(commonUtils.yesterDay())}
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
      }
      <div className="search-box" style={{display:"flex", margin:"10px 0 0 0"}}>
        {props.type === "dashboard" && 
          <div className="calendar-wrap">
            <>
              <Select
                  style={{ width: "180px" }}
                  id="selectedStartMonthRange"
                  options={props.period_month.start_date.filter((item,idx) => (idx+1) !== props.period_month.start_date.length)}
                  onChange={(e, data) => fnClickDateRange(e, data, "start_date")}
                  value={searchParams.start_date}
              />
            </>
          </div>
        }
      <div className="input-box">
        <Popup
          open= {searchOpen.dicd}
          onClose={() => setSearchOpen({...searchOpen, dicd: false})}
          onOpen={() => setSearchOpen({...searchOpen, dicd: true})}
          className="select-popup"
          trigger={<Button className={"btn-select"}
          content={"담당(" + searchParams.prdt_di_cd_list.length+ ")"}/>}
          content={
            <div>
              <div className="check-list" style={{ width: "300px" }}>
                <Input
                  placeholder="담당명"
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
                            onChange={(e, data) => fnClickAllCheckbox(e, data, "searchDicdList", "prdt_di","selectList")}
                            checked={
                              searchParams.searchDicdListKeyword === "" 
                                ? searchParams.searchDicdList.length === searchParams.prdt_di_cd_list.length
                                : searchParams.searchDicdList.length === searchParams.selectList.filter(item => item.prdt_di_nm && item.prdt_di_nm.includes(searchParams.searchDicdListKeyword)).length 
                            }
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
                          onChange={(e, data) => fnClickCheckLists(e, data, "prdt_di_cd_list", "selectList", true)}
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
          trigger={<Button className={"btn-select" + (searchParams.prdt_di_cd_list.length > 0 ? "" : " searchGray disabled")}
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
                            id="catcdDataAllCheck"
                            onChange={(e, data) => fnClickAllCheckbox(e, data, "searchCatcdList", "prdt_cat", "selectList")}
                            checked={
                              searchParams.searchCatcdListKeyword === "" 
                                ? searchParams.searchCatcdList.length === searchParams.prdt_cat_cd_list.length
                                : searchParams.searchCatcdList.length === searchParams.selectList.filter(item => item.prdt_cat_nm && item.prdt_cat_nm.includes(searchParams.searchCatcdListKeyword)).length 
                            }
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
                            onChange={(e, data) => fnClickCheckLists(e, data, "prdt_cat_cd_list", "selectList", true)}
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
          trigger={<Button className={"btn-select plus" + (searchParams.prdt_cat_cd_list.length > 0 ? "" : " searchGray disabled")}>
                    분류({searchParams.prdt_gcode_cd_list.length + searchParams.prdt_mcode_cd_list.length + searchParams.prdt_dcode_cd_list.length})
                  </Button>
                  }
          //style={{width:props.type === "dashboard" ? "807px" : "1024px"}}
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
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "searchGcodecdList", "prdt_gcode", "selectList")}
                                checked={
                                  searchParams.searchGcodecdListKeyword === "" 
                                    ? searchParams.searchGcodecdList.length === searchParams.prdt_gcode_cd_list.length
                                    : searchParams.searchGcodecdList.length === searchParams.selectList.filter(item => 
                                        item.prdt_gcode_nm && (item.prdt_gcode_cd.includes(searchParams.searchGcodecdListKeyword) || item.prdt_gcode_nm.includes(searchParams.searchGcodecdListKeyword))).length 
                                }
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
                              onChange={(e, data) => fnClickCheckLists(e, data, "prdt_gcode_cd_list", "selectList", true)}
                              checked={searchParams.prdt_gcode_cd_list.includes(item.prdt_gcode_cd)}
                            />
                          </li>
                        )})
                        : <li><p style={{lineHeight:"250px", padding:"10px 0 0 0", textAlign:"center", fontWeight:"400"}}>검색 결과가 없습니다.</p></li>
                      }
                    </ul>
                  </div>
                  
                  <div className="check-list">
                    <Input
                      placeholder="중분류명 또는 코드"
                      id="mCodeDataSearch"
                      value={searchParams.searchMcodecdListKeyword}
                      onChange={(e, data) => fnSearchKeywords(e, data, "prdt_mcode_cd_list", "searchMcodecdList", "prdt_mcode_cd", "prdt_mcode_nm")}
                      icon={
                        <Icon
                            name="x"
                            link
                            onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchMcodecdList")}
                        />
                      }
                    />
                    <ul>
                      {searchParams.searchMcodecdList.length > 0 &&
                        <li>
                          <div className="filter-box">
                            <div className="left">
                              <Checkbox
                                label="전체"
                                id="mCodeDataAllCheck"
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "searchMcodecdList", "prdt_mcode", "selectList")}
                                checked={
                                  searchParams.searchMcodecdListKeyword === "" 
                                    ? searchParams.searchMcodecdList.length === searchParams.prdt_mcode_cd_list.length
                                    : searchParams.searchMcodecdList.length === searchParams.selectList.filter(item => 
                                        item.prdt_mcode_nm && (item.prdt_mcode_cd.includes(searchParams.searchMcodecdListKeyword) || item.prdt_mcode_nm.includes(searchParams.searchMcodecdListKeyword))).length 
                                }
                              />
                            </div>
                            <div className="right">
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchMcodecdList", "prdt_mcode_cd", "", "sortingStatusMcodeCd")}>
                                  <Popup
                                    size="mini"
                                    content={`코드순`}
                                    trigger={<i className={ "sort numeric icon " + (searchCodes.sortingStatusMcodeCd ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchMcodecdList", "", "prdt_gcode_nm", "sortingStatusMcodeNm")}>
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
                      {searchParams.searchMcodecdList.length > 0 ?
                        searchParams.searchMcodecdList.map((item,idx) => {
                        return (
                          <li key={item.prdt_mcode_cd}>
                            <Checkbox
                              id={item.prdt_mcode_cd}
                              label={item.prdt_mcode_cd + " " + item.prdt_mcode_nm}
                              value={item.prdt_mcode_cd}
                              onChange={(e, data) => fnClickCheckLists(e, data, "prdt_mcode_cd_list", "selectList", true)}
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
                      onChange={(e, data) => fnSearchKeywords(e, data, "prdt_dcode_cd_list", "searchDcodecdList", "prdt_dcode_cd", "prdt_dcode_nm")}
                      icon={
                        <Icon
                            name="x"
                            link
                            onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchDcodecdList")}
                        />
                      }
                    />
                    <ul>
                      {searchParams.searchDcodecdList.length > 0 &&
                        <li>
                          <div className="filter-box">
                            <div className="left">
                              <Checkbox
                                label="전체"
                                id="dCodeDataAllCheck"
                                onChange={(e, data) => fnClickAllCheckbox(e, data, "searchDcodecdList", "prdt_dcode", "selectList")}
                                checked={
                                  searchParams.searchDcodecdListKeyword === "" 
                                    ? searchParams.searchDcodecdList.length === searchParams.prdt_dcode_cd_list.length
                                    : searchParams.searchDcodecdList.length === searchParams.selectList.filter(item => 
                                        item.prdt_dcode_nm && (item.prdt_dcode_cd.includes(searchParams.searchDcodecdListKeyword) || item.prdt_dcode_nm.includes(searchParams.searchDcodecdListKeyword))).length 
                                }
                              />
                            </div>
                            <div className="right">
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchDcodecdList", "prdt_dcode_cd", "", "sortingStatusDcodeCd")}>
                                  <Popup
                                    size="mini"
                                    content={`코드순`}
                                    trigger={<i className={ "sort numeric icon " + (searchCodes.sortingStatusDcodeCd ? "down" : "up")}></i>}
                                  />
                                </button>
                              </div>
                              <div className="filter-inner">
                                <button onClick={(e, data) => fnClickSortings(e, data, "searchDcodecdList", "", "prdt_dcode_nm", "sortingStatusDcodeCd")}>
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
                      {searchParams.searchDcodecdList.length > 0 ?
                        searchParams.searchDcodecdList.map((item,idx) => {
                        return (
                            <li key={item.prdt_dcode_cd}>
                              <Checkbox
                                id={item.prdt_dcode_cd}
                                label={item.prdt_dcode_cd + " " + item.prdt_dcode_nm}
                                value={item.prdt_dcode_cd}
                                onChange={(e, data) => fnClickCheckLists(e, data, "prdt_dcode_cd_list","selectList",true)}
                                checked={searchParams.prdt_dcode_cd_list.includes(item.prdt_dcode_cd)}
                              />
                            </li>
                        )})
                        : <li><p style={{lineHeight:"250px", padding:"10px 0 0 0", textAlign:"center", fontWeight:"400"}}>검색 결과가 없습니다.</p></li>
                      }
                    </ul>
                  </div>
                  
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

      {props.type !== "dashboard" &&
        <div className="input-box">
          <Popup
            className="select-popup"
            open= {searchOpen.vendor}
            onClose={() => setSearchOpen({...searchOpen, vendor: false})}
            onOpen={() => setSearchOpen({...searchOpen, vendor: true})}
            trigger={<Button className={"btn-select plus" + (searchParams.prdt_dcode_cd_list.length > 0 ? "" : " searchGray disabled")} content={"협력회사(" + searchParams.ven_cd_list.length + ")"}/>}
            content={
              <div>
                <div className="check-list" style={{ width: "400px" }}>
                  <Input
                    placeholder="협력회사명 또는 코드​"
                    id="vendorDataSearch"
                    value={searchParams.searchVencdListKeyword}
                    onChange={(e, data) => fnSearchKeywords(e, data, "ven_cd_list", "searchVencdList", "ven_cd", "ven_nm")}
                    icon={
                      <Icon
                          name="x"
                          link
                          onClick={(e, data) => fnSearchKeywordClaers(e, data, "searchVencdList")}
                      />
                    }
                    style={{ width: "385px" }}
                  />
                  <ul>
                    {searchParams.searchVencdList.length > 0 &&
                      <li>
                        <div className="filter-box">
                          <div className="left">
                            <Checkbox
                              label="전체"
                              id="venCdDataAllCheck"
                              onChange={(e, data) => fnClickAllCheckbox(e, data, "searchVencdList", "ven", "selectList")}
                              checked={
                                searchParams.searchVencdListKeyword === "" 
                                  ? searchParams.searchVencdList.length === searchParams.ven_cd_list.length
                                  : searchParams.searchVencdList.length === searchParams.selectList.filter(item => 
                                    item.ven_cd && item.ven_cd.includes(searchParams.searchVencdListKeyword) || item.ven_nm && item.ven_nm.includes(searchParams.searchVencdListKeyword)).length 
                              }
                            />
                          </div>
                          <div className="right">
                            <div className="filter-inner">
                              <button onClick={(e, data) => fnClickSortings(e, data, "searchVencdList", "ven_cd", "", "sortingStatusVencd")}>
                                <i className={ "sort numeric icon " + (searchParams.sortingStatusVencd ? "down" : "up")}></i>코드순
                              </button>
                            </div>
                            <div className="filter-inner">
                              <button onClick={(e, data) => fnClickSortings(e, data, "searchVencdList", "", "ven_nm", "sortingStatusVennm")}>
                                <i className={ "sort amount icon " + (searchParams.sortingStatusVennm ? "down" : "up")}></i>이름순
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                      }
                      {searchParams.searchVencdList.length > 0 ?
                        searchParams.searchVencdList.map((item,idx) => {
                        return (
                          <li key={item.ven_cd}>
                            <Checkbox
                              id={item.ven_cd}
                              label={item.ven_cd + " " + item.ven_nm}
                              value={item.ven_cd}
                              onChange={(e, data) => fnClickCheckLists(e, data, "ven_cd_list","selectList",true)}
                              checked={searchParams.ven_cd_list.includes(item.ven_cd)}
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
                            { searchCodes.ven_cd_list.filter(x => x.ven_cd === item).map(x => x.ven_cd) + " " +
                              searchCodes.ven_cd_list.filter(x => x.ven_cd === item).map(x => x.ven_nm)
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
        </div>
      }
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
                        : searchParams.areaTypeCheck ? searchCodes.store_list : searchCodes.store_list.filter(item => item.area_cd === searchParams.area_cd || item.value === "ALL")
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
                              onChange={(e, data) => fnClickCheckLists(e, data, "score_list", "selectList", false)}
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
                              onChange={(e, data) => fnClickCheckLists(e, data, "posit_or_negat_list", "selectList", false)}
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
  { props.type !== "dashboard" &&
    <div className="input-box">
      <Input 
        placeholder="검색어"
        id="keywordDataSearch"
        value={searchParams.search_keyword}
        onChange={(e, data) => fnSearchAny(e, data,"search_keyword")}// "prdt_cat_cd_list", "searchCatcdList", "", "prdt_cat_nm")}
        onKeyDown={(e) => (e.key === 'Enter') && fnClickInqRvOview() }
        icon={
          <Icon
            className= "close icon"
            name="x"
            link
            onClick={(e, data) => fnSearchKeywordClaers(e, data, "search_keyword")}
          />
        }
      />
    </div>

  
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
