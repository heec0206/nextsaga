import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import CONST from "/src/utils/constant";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import * as commonUtils from "/src/utils/common";
import { Popup, Button } from "semantic-ui-react";

export const excelDownload = (excelData, option) => {
  const excelFileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const excelFileExtension = ".xlsx";
  const excelFileName = `${option.fileName}-${dateFormat(new Date(), "")}`;

  const displayColumn = option.columnDefs.map((i) => i.headerName);
  const ws = XLSX.utils.aoa_to_sheet([[`${option.fileName}`], displayColumn]);
  const ow = option.width && option.width.map((item) => {return ({wpx : item})});
  const rowKey = [];
  option.columnDefs.map((i) => {
    rowKey.push(i.field);
  });

  excelData.map((item,idx) => {
    const value = rowKey.reduce((acc, key) => {
      if (item.hasOwnProperty(key)) {
        acc.push(item[key]);
      }
      return acc;
    }, []);
    XLSX.utils.sheet_add_aoa(ws, [value], { origin: -1 });
    ws["!cols"] = ow ? ow : [];
  });

  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelButter = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
};

export const getStartEndDate = (date, type) => {
  date = stringToDate(date);
  const result = new Date(date.getFullYear(), type==="first" ? date.getMonth() : date.getMonth()+1, type==="first" ? 1 : 0);
  return getDateStr(result)
}

export const getDateStr = (myDate, type) => {
  if(typeof myDate === "string"){
    myDate = stringToDate(myDate);
  };
  let year = myDate.getFullYear();
  let month = myDate.getMonth() + 1;
  let day = myDate.getDate();
  month = month < 10 ? "0" + String(month) : String(month);
  day = day < 10 ? "0" + String(day) : String(day);

  if(type === "dash"){
    return String(year + "-" + month + "-" + day);
  }else if(type === "dashMmdd"){
    return String(month + "-" + day);
  }else if (type === "slashMmdd"){
    return String(year + "/" + month + "/" + day);
  }else if (type === "Yymm"){
    return String(year + "년 " + month + "월");
  }else{
    return String(year + month + day);
  }
};

export const getDateConvision = (date, start, type) => { 
  let now = stringToDate(date);
  let nowDayOfWeek = now.getDay()-4;
  let nowDay = now.getDate();
  let nowMonth = now.getMonth();
  let nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0;
  let weekStartDate = new Date(nowYear, nowMonth, (nowDay - nowDayOfWeek - 7));
  let weekEndDate = new Date(nowYear, nowMonth, (nowDay + (-1 - nowDayOfWeek)));
  let monthStartDate = new Date(nowYear, nowMonth, 1);
  let monthEndDate = new Date(nowYear, nowMonth+1, 0);
  let quarter = Math.ceil((nowMonth+ 1)/3);
  let quarterStartDate = new Date(nowYear, (quarter === 1 && "0" || quarter === 2 && "3" || quarter === 3 && "6" || quarter === 4 && "9"),1);
  let quarterEndDate = new Date(nowYear, (quarter*3),0);
  
  if(type === "day"){
    if(stringToDate(date) > stringToDate(yesterDay())){
      date = yesterDay()
    }
    return date;
  }else if(type === "week"){
    if(start === "start_date"){
      return getDateStr(weekStartDate);
    }else{
      let nowDayOfWeek = 3 - new Date().getDay();
      let yDay = new Date(new Date().setDate(new Date().getDate() + nowDayOfWeek));
      return weekEndDate > stringToDate(yesterDay()) ? getDateStr(yDay) : getDateStr(weekEndDate);
    };
  }else if(type==="month"){
    if(start === "start_date"){
      return getDateStr(monthStartDate);
    }else{
      let yDay = new Date(stringToDate(yesterDay()).getFullYear(), stringToDate(yesterDay()).getMonth()+1, 0);
      return monthEndDate > stringToDate(yesterDay()) ? getDateStr(yDay) : getDateStr(monthEndDate);
    }
  }else if(type==="quarter"){
    if(start === "start_date"){
      if(getDateStr(quarterStartDate) === getDateStr(new Date(nowYear, 9,1))){
        quarterStartDate = new Date(nowYear, 6,1)
      }
      return getDateStr(quarterStartDate);
    }else{
      if(getDateStr(quarterEndDate) === getDateStr(new Date(nowYear, 12,0))){
        quarterEndDate = new Date(nowYear, 9,0)
      }
      return getDateStr(quarterEndDate);
    }
  }
}

export const getDatePrevWeek = (std,prev,type) => {
  let stdDate = new Date(std);
  let endDate = new Date(std);

  let stdMonth = stdDate.getDate();
  let endMonth = endDate.getDate()+6;

  stdDate.setDate(stdMonth - (prev*7));
  endDate.setDate(endMonth - (prev*7));

  return ( 
    type === "mmdd" 
      ? getDateStr(stdDate,"dash").slice(-5) + "~" + getDateStr(endDate,"dash").slice(-5)
      : type === "startDate"
        ? getDateStr(stdDate,"dash") 
        : getDateStr(stdDate,"dash") + "~" + getDateStr(endDate,"dash")
  )
};

export const today = () => {
  let d = new Date();
  return getDateStr(d);
};

export const lastWeek = () => {
  let d = new Date();
  let dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - 7);
  return getDateStr(d);
};

export const lastMonth = () => {
  var d = new Date();
  var monthOfYear = d.getMonth();
  d.setMonth(monthOfYear - 1);
  return getDateStr(d);
};

export const yesterDay = () => {
  let today = new Date();
  let yDay = new Date(today.setDate(today.getDate() -1));
  return getDateStr(yDay);
};

export const lastMonths = (date, month) => {
  var d = new Date(stringToDate(date));
  var monthOfYear = d.getMonth();
  d.setMonth(monthOfYear - month);
  return getDateStr(d,"Yymm");
};

export const prevWeek = (week) => {
  let d = new Date();
  let dayOfMonth = d.getDate();
  d.setDate(dayOfMonth - (7*week));
  return getDateStr(d);
};

export const priceStr = (res) => {
  return Number(res)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const stringToDate = (date, type) => {
  if (date.length !== 8) {
    return new Date();
  } else {
    if(type === "dash"){
      return (date.substr(0, 4) + "-" + date.substr(4, 2) + "-" + date.substr(6, 2));
    }else{
      return new Date(
        date.substr(0, 4) +
        "-" +
        date.substr(4, 2) +
        "-" +
        date.substr(6, 2)
      );
    }

  }
};

export const reviewData = (data,key) => {
  return data && Object.keys(data).filter(item => item.includes(key)).map(item => {return data[item]});
}

export const reviewDate = (date, number, type) => {
  return (
    [...Array(parseInt(number))].map((n, index) => {
       return ( 
        type 
          ? commonUtils.getDatePrevWeek(date,index,type)
          : commonUtils.getDatePrevWeek(date,index,"")
      ) 
    })
  ).flat()
}

export const getDateDiff = (d1, d2) => {
  let startDate = d1;
  let endDate = d2;
  if(d1.length === 8){
    startDate = commonUtils.stringToDate(startDate);
  }
  if(d2.length === 8){
    endDate = commonUtils.stringToDate(endDate);
  }
  const diffDate = new Date(startDate).getTime() - new Date(endDate).getTime();
  
  return Math.abs(diffDate / (1000 * 60 * 60 * 24));
}

export const setFilterOptRedux = (type) => {
  const router = useRouter().query;
  const state = useSelector((state) => state.searchParams);
  const pathname = useRouter().pathname;
  return (
    router.page_num ?
    {
      ...state,
      page_num: router.page_num,
      page_size: router.page_size,
      period: router.period,
      start_date: router.start_date,
      end_date: router.end_date,
      prdt_di_cd_list: router.prdt_di_cd_list ? router.prdt_di_cd_list.includes(",") ? router.prdt_di_cd_list.split(",") : [router.prdt_di_cd_list] : [],
      prdt_cat_cd_list: router.prdt_cat_cd_list ? router.prdt_cat_cd_list.includes(",") ? router.prdt_cat_cd_list.split(",") : [router.prdt_cat_cd_list] : [],
      prdt_gcode_cd_list : router.prdt_gcode_cd_list ? router.prdt_gcode_cd_list.includes(",") ? router.prdt_gcode_cd_list.split(",") : [router.prdt_gcode_cd_list] : [],
      prdt_mcode_cd_list : router.prdt_mcode_cd_list ? router.prdt_mcode_cd_list.includes(",") ? router.prdt_mcode_cd_list.split(",") : [router.prdt_mcode_cd_list] : [],
      prdt_dcode_cd_list : router.prdt_dcode_cd_list ? router.prdt_dcode_cd_list.includes(",") ? router.prdt_dcode_cd_list.split(",") : [router.prdt_dcode_cd_list] : [],
      ven_cd_list :router.ven_cd_list ? router.ven_cd_list.includes(",") ? router.ven_cd_list.split(",") : [router.ven_cd_list] : [],
      review_chn: router.review_chn ? router.review_chn : "",
      prdt_nm : router.prdt_nm ? router.prdt_nm : "",
      prdt_cd : router.prdt_cd ? router.prdt_cd : "",
      area_cd : router.area_cd ? router.area_cd : "",
      store_cd : router.store_cd ? router.store_cd : "",
      score : router.score ? router.score : 0,
      score_list : router.score_list ? router.score_list.includes(",") ? router.score_list.split(",") : [router.score_list] : [],
      posit_or_negat : router.posit_or_negat ? router.posit_or_negat : 0,
      posit_or_negat_list : router.posit_or_negat_list ? router.posit_or_negat_list.includes(",") ? router.posit_or_negat_list.split(",") : [router.posit_or_negat_list] : [],
    }
    : { ...state,
      period: pathname.includes("dashboard") ? "month" : state.period,
      start_date: pathname.includes("dashboard") ? commonUtils.getStartEndDate(lastMonth(1),"first") : state.start_date,
      end_date: pathname.includes("dashboard") ? commonUtils.getStartEndDate(lastMonth(1),"last") : state.end_date,
      }
  );
};

export const setAlarmOptRedux = (type) => {
  const state = useSelector((state) => state.searchParams);
  return {
    page_num: 1,
    page_size: state.page_size,
    period: "day",
    review_chn: "ALL",
    store_cd:"ALL",
    score: 0,
    posit_or_negat: 0,
    start_date: state.start_date,
    end_date: state.end_date
  };
};

export const getDateTwoYearsFirstDayCnt = () => {
  const currentDate = new Date();
  const targetDate = new Date(currentDate.getFullYear() - 2, 0, 1);
  const timeDiff = Math.abs(currentDate.getTime() - targetDate.getTime());
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

export const getWeekDayListByDate = (dayOfWeekNum, prevStartDay) => {
  if (dayOfWeekNum === null) dayOfWeekNum = 1;

  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - prevStartDay
  ); // prevStartDay 일자 전의 날짜 가져오기

  const mondays = [];
  const dateIterator = oneYearAgo;

  while (dateIterator <= currentDate) {
    if (dateIterator.getDay() === dayOfWeekNum) {
      // 1은 월요일을 나타냅니다.
      mondays.push(new Date(dateIterator)); // 배열에 월요일 날짜 추가
    }
    dateIterator.setDate(dateIterator.getDate() + 1); // 다음 날짜로 이동
  }

  return mondays;
};

export const getMonthDayListByDate = (prevStartDay) => {
  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - prevStartDay
  ); // prevStartDay 일자 전의 날짜 가져오기

  const months = [];
  const dateIterator = oneYearAgo;

  while (dateIterator <= currentDate) {
    if (dateIterator.getDate() === 1) {
      // 1은 월의 첫째날
      months.push(new Date(dateIterator)); // 배열에 추출된 월 추가
    }
    dateIterator.setDate(dateIterator.getDate() + 1); // 다음 날짜로 이동
  }

  return months;
};

export const getQuarterDayListByDate = (prevStartDay) => {
  const currentDate = new Date();
  const oneYearAgo = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - prevStartDay
  ); // prevStartDay 일자 전의 날짜 가져오기

  var dateArray = [];
  var currentQuarter = Math.floor((currentDate.getMonth() - 1) / 3) + 1;
  var startQuarter = Math.floor((oneYearAgo.getMonth() - 1) / 3) + 1;
  var currentYear = currentDate.getFullYear();
  var startYear = oneYearAgo.getFullYear();

  for (var year = startYear; year <= currentYear; year++) {
    var startQuarterRange = year === startYear ? startQuarter : 1;
    var endQuarterRange = year === currentYear ? currentQuarter : 4;

    for (
      var quarter = startQuarterRange;
      quarter <= endQuarterRange;
      quarter++
    ) {
      var startDate = new Date(year, 3 * (quarter - 1), 1);
      var endDate = new Date(year, 3 * quarter, 0);
      if (endDate > currentDate) {
        endDate = currentDate;
      }
      dateArray.push(startDate);
    }
  }

  return dateArray;
};

export const dateFormat = (inputDay, type) => {
  const year = inputDay.getFullYear();
  const month = inputDay.getMonth() + 1;
  const date = inputDay.getDate();

  if (type === "dash") {
    return `${year}-${month >= 10 ? month : "0" + month}-${date >= 10 ? date : "0" + date
      }`;
  } else {
    return `${year}${month >= 10 ? month : "0" + month}${date >= 10 ? date : "0" + date
      }`;
  }
};

export const quarterString = (dateStr) => {
  if (dateStr === "01") return "1Q";
  if (dateStr === "04") return "2Q";
  if (dateStr === "07") return "3Q";
  if (dateStr === "10") return "4Q";

  return "1Q";
};

export const settingInitWeekSelectOptions = () => {
  let startWeekValueOptionList = [];
  let endWeekValueOptionList = [];

  commonUtils
      .getWeekDayListByDate(4, commonUtils.getDateTwoYearsFirstDayCnt())
      .map((item, index) => {
          startWeekValueOptionList.push({
              key: commonUtils.dateFormat(item, ""),
              value: commonUtils.dateFormat(item, ""),
              text: `${commonUtils.dateFormat(item, "dash")}~${commonUtils.dateFormat(
                  new Date(item.setDate(item.getDate() + 6)),
                  "dash"
              )}`,
          });

          let endDateItem = new Date(item);
          let endDateItemVal = new Date(
              endDateItem.setDate(endDateItem.getDate())
          );
          let endDateItemBeginVal = new Date(
              endDateItem.setDate(item.getDate() - 6)
          );
          endWeekValueOptionList.push({
              key: commonUtils.dateFormat(endDateItemVal, ""),
              value: commonUtils.dateFormat(endDateItemVal, ""),
              text: `${commonUtils.dateFormat(
                  endDateItemBeginVal,
                  "dash"
              )}~${commonUtils.dateFormat(endDateItemVal, "dash")}`,
          });
      });

  return {
      start_date: startWeekValueOptionList,
      end_date: endWeekValueOptionList,
  };
};

export const settingInitMonthSelectOptions = () => {
  let startMonthValueOptionList = [];
  let endMonthValueOptionList = [];

  commonUtils
      .getMonthDayListByDate(commonUtils.getDateTwoYearsFirstDayCnt())
      .map((item, index) => {
          startMonthValueOptionList.push({
              key: commonUtils.dateFormat(item, ""),
              value: commonUtils.dateFormat(item, ""),
              text: `${commonUtils.dateFormat(item, "dash").substr(0, 7)}(월)`,
          });

          let endMonthDay = new Date(
              item.getFullYear(),
              item.getMonth() + 1,
              0
          ).getDate();
          endMonthValueOptionList.push({
              key:
                commonUtils.dateFormat(item, "").substr(0, 6) + String(endMonthDay),
              value:
                commonUtils.dateFormat(item, "").substr(0, 6) + String(endMonthDay),
              text: `${commonUtils.dateFormat(item, "dash").substr(0, 7)}(월)`,
          });
      });

  return {
      start_date: startMonthValueOptionList,
      end_date: endMonthValueOptionList,
  };
};

export const settingInitQuarterSelectOptions = () => {
  let startQuarterValueOptionList = [];
  let endQuarterValueOptionList = [];

  commonUtils
      .getQuarterDayListByDate(commonUtils.getDateTwoYearsFirstDayCnt())
      .map((item, index) => {
          startQuarterValueOptionList.push({
              key: commonUtils.dateFormat(item, ""),
              value: commonUtils.dateFormat(item, ""),
              text: `${commonUtils
                  .dateFormat(item, "")
                  .substr(0, 4)}(년)-${commonUtils.quarterString(
                    commonUtils.dateFormat(item, "").substr(4, 2)
                  )}`,
          });

          let endQuarterDay = new Date(
              item.getFullYear(),
              item.getMonth() + 3,
              item.getDate() - 1
          );
          endQuarterValueOptionList.push({
              key: commonUtils.dateFormat(endQuarterDay, ""),
              value: commonUtils.dateFormat(endQuarterDay, ""),
              text: `${commonUtils
                  .dateFormat(item, "")
                  .substr(0, 4)}(년)-${commonUtils.quarterString(
                    commonUtils.dateFormat(item, "").substr(4, 2)
                  )}`,
          });
      });

  return {
      start_date: startQuarterValueOptionList,
      end_date: endQuarterValueOptionList,
  };
};