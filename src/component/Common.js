
import * as FileSaver from "file-saver";
import { isElement } from "lodash";
import * as XLSX from "xlsx";


// 문자열 empty 상태 체크 
export const isEmpty = (str) => {

  // str = str.replace(/(\s*)/g, "");
  if (typeof str == "undefined" || str == null || str == "" || str == NaN) return true;
  else return false;
};

// 공백문자 제거 
export const removeStrSpace = (str) => {
  return str.replace(/(\s*)/g, "");
};


export const removeLoginSessionStorage = () => {
  sessionStorage.removeItem("USER_ID");
  sessionStorage.removeItem("EARS_API_TOKEN");
};

export const uuidVal = () => {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const evaluateResultChecker = (str) => {
  if (!isEmpty(str)) {
    let json = jsonRegulerFormatter(str);

    if (json.isValid === "true") return true;
    else return false;
  } else return true;
};


export const jsonRegulerFormatter = (str) => {
  try {

    str = str.replace("('", '(');
    str = str.replace("')", ')');
    let jsonStr = str.replace(/\'/gi, '"');

    let json = JSON.parse(jsonStr);
    if (typeof json === 'object') {
      return json;
    } else return "";

  } catch (e) {

    return "";
  }
}





export const jsonPretty = (json) => {
  let jsonObj = jsonRegulerFormatter(json);
  const json_str = JSON.stringify(jsonObj, null, 4);

  return json_str;
}


export const jsonStrToObj = (str) => {
  const jsonObj = JSON.parse(str);
  return jsonObj;
}



// dateformatter d : yyyy-MM-dd, else : yyyyMMdd
export const dateFormatter = (date, type) => {
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  if (type === "d")
    return year + '-' + month + '-' + day
  else
    return year + month + day;
};


export const dateFormatStr = () => {

  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1;  // 월
  let date = today.getDate();  // 날짜
  let hours = today.getHours(); // 시
  let minutes = today.getMinutes();  // 분
  let seconds = today.getSeconds();  // 초
  let milliseconds = today.getMilliseconds(); // 밀

  return String(year) + String(month) + String(date) + String(hours) + String(minutes) + String(seconds);


}


// 숫자 3자리 콤마 제공
export const numberCommaFormatter = (number) => {

  if (isEmpty(number)) return 0;
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // return number.toLocaleString('ko-KR');
}


export const validateDecimalNumber = (number) => {
  return number.replace(/[^0-9.]/g, '');
}

export const validateNumber = (number) => {
  return number.replace(/[^0-9]/g, '');
}

// 엑셀 Exception별 메시지 
export const excelExceptionMessage = (errStr) => {

  if (errStr.indexOf('ECMA-376') !== -1) {
    return "엑셀파일을 암호해제후 다시 시도해 주세요";
  } else {
    return "오류가 발생했습니다";
  }

}



export const DISCOUNT_TYPE_SELECT_LIST = [{
  "key": "1",
  "value": "상품에누리",   //  10% ~
  "text": "상품에누리"
}, {
  "key": "2",
  "value": "매가변경",
  "text": "매가변경"
}, {
  "key": "3", // 1+1 ~
  "value": "N+1",
  "text": "N+1"
}];


export const DISCOUNT_TYPE_ENURY_DETAIL_SELECT_LIST = [{
  "key": "0",
  "value": "0(%)",
  "text": "0(%)"
}, {
  "key": "1",
  "value": "10(%)",
  "text": "10(%)"
}, {
  "key": "2",
  "value": "20(%)",
  "text": "20(%)"
}, {
  "key": "3",
  "value": "30(%)",
  "text": "30(%)"
}, {
  "key": "4",
  "value": "40(%)",
  "text": "40(%)"
}, {
  "key": "5",
  "value": "50(%)",
  "text": "50(%)"
}];



export const DISCOUNT_TYPE_NPLUS_DETAIL_SELECT_LIST = [{
  "key": "6",
  "value": "1+1",
  "text": "1+1"
}, {
  "key": "7",
  "value": "2+1",
  "text": "2+1"
}];


export const EVENT_POS_SELECT_LIST = [{
  "key": "1",
  "value": "앤캡",
  "text": "앤캡"
}, {
  "key": "2",
  "value": "평대",
  "text": "평대"
}, {
  "key": "3",
  "value": "아일랜드",
  "text": "아일랜드"
}, {
  "key": "4",
  "value": "보이드",
  "text": "보이드"
}, {
  "key": "5",
  "value": "본매대",
  "text": "본매대"
}];


/**
 * # 매대 유형(보이드), [앤캡, 평대, 보이드, 아일랜드, 본매대]
    position: list = [0, 0, 1, 0, 0]
 */
export const getArrPointByPosition = (position) => {

  let retArr = [];

  switch (position) {
    case '앤캡':
      retArr = [1, 0, 0, 0, 0];
      break;
    case '평대':
      retArr = [0, 1, 0, 0, 0];
      break;
    case '보이드':
      retArr = [0, 0, 1, 0, 0];
      break;
    case '아일랜드':
      retArr = [0, 0, 0, 1, 0];
      break;
    case '본매대':
      retArr = [0, 0, 0, 0, 1];
      break;
    default:
      retArr = [1, 0, 0, 0, 0];
      break;
  }

  return retArr;
}


/*
    # 프로모션 1(상품에누리), [꼬리표출력, 상품에누리, 매가변경, 기타행사, 포인트적립, S-POINT에누리, 카드사에누리, 쿠폰에누리, 1+1, 2+1]
    promo1: list = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
*/
export const getArrPointByProm1 = (eventType, disRate) => {

  let retArr = [];

  if (eventType === "상품에누리") {
    retArr = [0, 1, 0, 0, 0, 0, 0, 0, 0, 0];

  } else if (eventType === "매가변경") {
    retArr = [0, 0, 1, 0, 0, 0, 0, 0, 0, 0];

  } else if (eventType === "N+1") {
    if (disRate === "1+1") {
      retArr = [0, 0, 0, 0, 0, 0, 0, 0, 1, 0];

    } else if (disRate === "2+1") {
      retArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
    }
  }

  return retArr;
}



export const excelDownload = (excelData, unitWon) => {

  if (isEmpty(unitWon)) unitWon = 1;
  const unitDisp = "(" + getUnitDisplay(unitWon) + ")";

  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const excelFileName = `상품본부_협력사_실적분석"-${dateFormatStr()}`;

  let excelHeaderGubunColumn = [``, ``, `${excelData[0].upper[0].gubun_nm}`, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``, ``];

  excelData[0].followers.map((item) => (
    excelHeaderGubunColumn.push(`${item.gubun_nm}`),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``),
    excelHeaderGubunColumn.push(``)

  ));


  // upper +  title 
  let excelHeadColumn = ['구분(업체명)', '구분(업체코드)', '매출', '매출 신장률', '구성비', '구성비차', '매장매출', '매장매출 신장률', '상품이익액', '상품이익액차', '상품이익률', '상품이익률차', '영업이익액', '영업이익액차', '영업이익률', '영업이익률차'];


  // follers title 
  excelData[0].followers.map((item) => (
    excelHeadColumn.push("매출"),
    excelHeadColumn.push("매출신장률"),
    excelHeadColumn.push("구성비"),
    excelHeadColumn.push("구성비차"),
    excelHeadColumn.push("매장매출"),
    excelHeadColumn.push("매장매출 신장률"),
    excelHeadColumn.push("상품이익률"),
    excelHeadColumn.push("상품이익률차"),
    excelHeadColumn.push("영업이익률"),
    excelHeadColumn.push("영업이익률차")
  ));


  const ws = XLSX.utils.aoa_to_sheet([
    [`상품본부_협력사_실적분석 결과`],
    [``],
    [``],
    excelHeaderGubunColumn,
    excelHeadColumn
  ]);


  const merge = { s: { r: 3, c: 2 }, e: { r: 3, c: 15 } };
  if (!ws['!merges']) ws['!merges'] = [];
  ws['!merges'].push(merge);


  let followersMerge = {};

  excelData[0].followers.map((item, index) => (

    followersMerge = { s: { r: 3, c: 16 + (index * 10) }, e: { r: 3, c: 25 + (index * 10) } },
    ws['!merges'].push(followersMerge)
  ));





  excelData.map((item) => {

    let followerArr = []

    item.followers.map((sitem) => (
      followerArr.push(sitem.net_rsprc_amt_pp),
      followerArr.push(sitem.up_amt),
      followerArr.push(sitem.ven_ms),
      followerArr.push(sitem.ven_ms_diff),
      followerArr.push(sitem.net_rsprc_amt),
      followerArr.push(sitem.up_amt_str),
      followerArr.push(sitem.profit_r),
      followerArr.push(sitem.profit_r_diff),
      followerArr.push(sitem.sale_profit_r),
      followerArr.push(sitem.sale_profit_r_diff)
    ))


    XLSX.utils.sheet_add_aoa(
      ws,
      [
        [
          item.vndr_nm,
          item.vndr_cd,
          item.upper[0].net_rsprc_amt_pp,
          item.upper[0].up_amt,
          item.upper[0].ven_ms,
          item.upper[0].ven_ms_diff,
          item.upper[0].net_rsprc_amt,
          item.upper[0].up_amt_str,
          item.upper[0].sale_profit_tot,
          item.upper[0].sale_profit_tot_diff,
          item.upper[0].profit_r,
          item.upper[0].profit_r_diff,
          item.upper[0].sale_profit,
          item.upper[0].sale_profit_diff,
          item.upper[0].sale_profit_r,
          item.upper[0].sale_profit_r_diff,

        ].concat(followerArr)
      ],
      { origin: -1 }
    );
    ws['!cols'] = [
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 100 },
      { wpx: 200 }
    ]
    return false;
  });

  const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
  const excelButter = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  FileSaver.saveAs(excelFile, excelFileName + excelFileExtension);
}

/**
 * Dee 
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns 
 */
export const objCompare = (obj1, obj2) => {
  const Obj1_keys = Object.keys(obj1);
  const Obj2_keys = Object.keys(obj2);
  if (Obj1_keys.length !== Obj2_keys.length) {
    return false;
  }
  for (let k of Obj1_keys) {
    if (obj1[k] !== obj2[k]) {
      return false;
    }
  }
  return true;
}


export const removeArrayItem = (array, item) => {

  let idx = array.indexOf(item);

  while (idx > -1) {
    array.splice(idx, 1);
    idx = array.indexOf(item);
  }

  return array;
}



export const getUnitWonOptions = () => {
  return [
    { key: '1', value: '1', text: '원 단위 표시' },
    { key: '1000', value: '1000', text: '천원 단위 표시' },
    { key: '10000', value: '10000', text: '만원 단위 표시' },
    { key: '1000000', value: '1000000', text: '백만원 단위 표시' },
    { key: '100000000', value: '100000000', text: '억원 단위 표시' }
  ];
}

export const getGrapheTypeOptions = () => {
  return [
    { key: '1', value: '1', text: '바블챠트' },
    { key: '2', value: '2', text: '막대그래프챠트' },
    { key: '3', value: '3', text: '꺽은선그래프' },
    { key: '4', value: '4', text: '파이챠트' },
  ];
}

export const getViewPartnerCountOptions = () => {
  return [
    { key: '1', value: '1', text: '1개' },
    { key: '2', value: '2', text: '2개' },
    { key: '3', value: '3', text: '3개' },
    { key: '4', value: '4', text: '4개' },
    { key: '5', value: '5', text: '5개' },
    { key: '10', value: '10', text: '10개' },
    { key: '20', value: '20', text: '20개' },
    { key: '30', value: '30', text: '30개' },
    { key: '50', value: '50', text: '50개' },
  ];
}



export const handleXAxisOptions = () => {
  return [
    { key: 'x0', value: 'net_rsprc_amt_pp', text: '매출' },
    { key: 'x1', value: 'up_amt', text: '매출신장률' },
    { key: 'x2', value: 'ven_ms', text: '구성비' },
    { key: 'x3', value: 'ven_ms_diff', text: '구성비차' },
    { key: 'x4', value: 'sale_profit_tot', text: '상품이익액' },
    { key: 'x5', value: 'sale_profit_tot_diff', text: '상품이익액차' },
    { key: 'x6', value: 'profit_r', text: '상품이익률' },
    { key: 'x7', value: 'profit_r_diff', text: '상품이익률차' },
    { key: 'x8', value: 'sale_profit', text: '영업이익액' },
    { key: 'x9', value: 'sale_profit_diff', text: '영업이익액차' },
    { key: 'x10', value: 'sale_profit_r', text: '영업이익률' },
    { key: 'x11', value: 'sale_profit_r_diff', text: '영업이익률차' },
    { key: 'x12', value: 'net_rsprc_amt', text: '매장매출' },
    { key: 'x13', value: 'up_amt_str', text: '매장매출신장률' },

  ];
}

export const handleYAxisOptions = () => {
  return [
    { key: 'y0', value: 'net_rsprc_amt_pp', text: '매출' },
    { key: 'y1', value: 'up_amt', text: '매출신장률' },
    { key: 'y2', value: 'ven_ms', text: '구성비' },
    { key: 'y3', value: 'ven_ms_diff', text: '구성비차' },
    { key: 'y4', value: 'sale_profit_tot', text: '상품이익액' },
    { key: 'y5', value: 'sale_profit_tot_diff', text: '상품이익액차' },
    { key: 'y6', value: 'profit_r', text: '상품이익률' },
    { key: 'y7', value: 'profit_r_diff', text: '상품이익률차' },
    { key: 'y8', value: 'sale_profit', text: '영업이익액' },
    { key: 'y9', value: 'sale_profit_diff', text: '영업이익액차' },
    { key: 'y10', value: 'sale_profit_r', text: '영업이익률' },
    { key: 'y11', value: 'sale_profit_r_diff', text: '영업이익률차' },
    { key: 'y12', value: 'net_rsprc_amt', text: '매장매출' },
    { key: 'y13', value: 'up_amt_str', text: '매장매출신장률' },
  ];
}

export const getUnitDisplay = (selectedUnitWon) => {

  return selectedUnitWon === "1" ? "원" : (selectedUnitWon === "10" ? "십원" : (selectedUnitWon === "100" ? "백원" : (selectedUnitWon === "1000" ? "천원" : "")));
}

export const dateFormat = (day) => {
  return day.getFullYear() +
    '-' + ((day.getMonth() + 1) < 9 ? "0" + (day.getMonth() + 1) : (day.getMonth() + 1)) +
    '-' + ((day.getDate()) < 9 ? "0" + (day.getDate()) : (day.getDate()));
}


export const onlyNumber = (event) => {
  event = event || window.event;
  var keyID = (event.which) ? event.which : event.keyCode;
  if ((keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 10 || keyID == 13) return;
  else return false;
}


export const removeChar = (event) => {

  event = event || window.event;
  var keyID = (event.which) ? event.which : event.keyCode;

  if (keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 || keyID == 10 || keyID == 13) return;
  else event.target.value = event.target.value.replace(/[^0-9]/g, "");
}


export const randomfGenerateColor = () => {
  return "#" + Math.round(Math.random() * 0xffffff).toString(16);
}


export const randomGenerateRGBColor = () => {
  const x = Math.floor(Math.random() * 256);
  const y = Math.floor(Math.random() * 256);
  const z = Math.floor(Math.random() * 256);
  return "rgba(" + x + "," + y + "," + z + ", 0.9)";
}


export const shuffle = (array) => {
  array.sort(() => Math.random() - 0.5);
}

export const randomFixedRGBColor = () => {

  const fixedRGBColorArr = [
    // 'rgb(41, 128, 185)',
    // 'rgb(142, 68, 173)',
    // 'rgb(155, 89, 182)',
    // 'rgb(231, 76, 60)',
    // 'rgb(192, 57, 43)',
    // 'rgb(52, 152, 219)',
    // 'rgb(241, 196, 15)',
    // 'rgb(46, 204, 113)',
    // 'rgb(39, 174, 96)',
    // 'rgb(22, 160, 133)',
    // 'rgb(26, 188, 156)',
    // 'rgb(41, 128, 185)',
    // 'rgb(127, 140, 141)',
    // 'rgb(44, 62, 80)',
    // 'rgb(52, 73, 94)',
    // 'rgb(211, 84, 0)',
    // 'rgb(230, 126, 34)',
    // 'rgb(243, 156, 18)'

    'rgba(41, 128, 185, 0.9)',
    'rgba(142, 68, 173, 0.9)',
    'rgba(155, 89, 182, 0.9)',
    'rgba(231, 76, 60, 0.9)',
    'rgba(192, 57, 43, 0.9)',
    'rgba(52, 152, 219, 0.9)',
    'rgba(241, 196, 15, 0.9)',
    'rgba(46, 204, 113, 0.9)',
    'rgba(39, 174, 96, 0.9)',
    'rgba(22, 160, 133, 0.9)',
    'rgba(26, 188, 156, 0.9)',
    'rgba(41, 128, 185, 0.9)',
    'rgba(127, 140, 141, 0.9)',
    'rgba(44, 62, 80, 0.9)',
    'rgba(52, 73, 94, 0.9)',
    'rgba(211, 84, 0, 0.9)',
    'rgba(230, 126, 34, 0.9)',
    'rgba(243, 156, 18, 0.9)'

  ];

  shuffle(fixedRGBColorArr);
  return fixedRGBColorArr[0];
}

// { key: 'x0', value: 'net_rsprc_amt_pp', text: '매출' },
// { key: 'x1', value: 'up_amt', text: '매출신장률' },
// { key: 'x2', value: 'ven_ms', text: '구성비' },
// { key: 'x3', value: 'ven_ms_diff', text: '구성비차' },
// { key: 'x4', value: 'sale_profit_tot', text: '상품이익액' },
// { key: 'x5', value: 'sale_profit_tot_diff', text: '상품이익액차' },
// { key: 'x6', value: 'profit_r', text: '상품이익률' },
// { key: 'x7', value: 'profit_r_diff', text: '상품이익률차' },
// { key: 'x8', value: 'sale_profit', text: '영업이익액' },
// { key: 'x9', value: 'sale_profit_diff', text: '영업이익액차' },
// { key: 'x10', value: 'sale_profit_r', text: '영업이익률' },
// { key: 'x11', value: 'sale_profit_r_diff', text: '영업이익률차' },
// { key: 'x12', value: 'net_rsprc_amt', text: '매장매출' },
// { key: 'x13', value: 'up_amt_str', text: '매장매출신장률' },



/**
 * upper : 매출, 구성비, 매장매출, 상품이익액, 상품이익률, 영업이익액, 영업이익률
 * followers : 매출, 구성비, 매장매출, 상품이익률, 영업이익률
 * @param {*} net_rsprc_amt_pp 
 * @param {*} ven_ms_diff 
 * @returns 
 */
export const valueUpperZeroConvertHypon = (net_rsprc_amt_pp, ven_ms, net_rsprc_amt, sale_profit_tot, profit_r, sale_profit, sale_profit_r) => {

  if (net_rsprc_amt_pp === 0 && ven_ms === '0.0' && net_rsprc_amt === 0 && sale_profit_tot === 0 && profit_r === '0.0' && sale_profit === 0 && sale_profit_r === '0.0') {
    return false;
  } else
    return true;
}


export const valueFollowersZeroConvertHypon = (net_rsprc_amt_pp, ven_ms, net_rsprc_amt, profit_r, sale_profit_r) => {

  if (net_rsprc_amt_pp === 0 && ven_ms === '0.0' && net_rsprc_amt === 0 && profit_r === '0.0' && sale_profit_r === '0.0') {
    return false;
  } else
    return true;
}





