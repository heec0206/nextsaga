import Axios from "axios";
import * as Common from "src/component/Common";

const returnExceptionStaus = (returnStr) => {
  if (returnStr.status !== 200) {
    if (returnStr.status === 401) {
      alert("로그인 세션이 만료되었습니다");
      document.location.href = "/login";
    } else {
      alert(`오류가 발생했습니다 [${returnStr.message}]`);
      returnStr = returnStr;
    }
  }
};

/**
 * 상품 리뷰 Overview 조회
 * @param {*} searchParam
 * @returns
 */

export const getFilterInquire = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/ov/overview-list`;
  let returnStr = "";

  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
};

export const getFilterInquireLayer = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/ec/echart-list`;
  let returnStr = "";

  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
};

/**
 * 상품 리뷰 Overview Detail 조회
 * @param {*} searchParam
 * @returns
 */

export const getFilterDetailInquire = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/dt/detail-list`;
  let returnStr = "";

  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
};

/**
 * 상품 리뷰 Overview Summary 조회
 * @param {*} searchParam
 * @returns
 */

export const getFilterSumInquire = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/rs/summary_list`;
  let returnStr = "";

  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
};

export const getDicdListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/dicd/list";
  //const REQUEST_URL = "https://dev-api-etrend.emart.com/api/v1/ov/dicd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      prdt_di_cd: params.prdt_di_cd_list,
      prdt_di_nm: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getcatCdListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/catcd/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      prdt_di_cd: params.prdt_di_cd_list,
      prdt_di_nm: [],
      prdt_cat_cd: params.prdt_cat_cd_list,
      prdt_cat_nm: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(returnStr);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getVendorListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/vendor/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      vendor: [],
      name: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(returnStr);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getGcodeListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/gcode/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      prdt_di_cd: params.prdt_di_cd_list,
      prdt_di_nm: [],
      prdt_cat_cd: params.prdt_cat_cd_list,
      prdt_cat_nm: [],
      prdt_gcode_cd: params.prdt_gcode_cd_list,
      prdt_gcode_nm: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(returnStr);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getMcodeListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/mcode/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      prdt_di_cd: params.prdt_di_cd_list,
      prdt_di_nm: [],
      prdt_cat_cd: params.prdt_cat_cd_list,
      prdt_cat_nm: [],
      prdt_gcode_cd: params.prdt_gcode_cd_list,
      prdt_gcode_nm: [],
      prdt_mcode_cd: params.prdt_mcode_cd_list,
      prdt_mcode_nm: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(returnStr);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getDcodeListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/dcode/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      prdt_di_cd: params.prdt_di_cd_list,
      prdt_di_nm: [],
      prdt_cat_cd: params.prdt_cat_cd_list,
      prdt_cat_nm: [],
      prdt_gcode_cd: params.prdt_gcode_cd_list,
      prdt_gcode_nm: [],
      prdt_mcode_cd: params.prdt_mcode_cd_list,
      prdt_mcode_nm: [],
      prdt_dcode_cd: params.prdt_dcode_cd_list,
      prdt_dcode_nm: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(ex.response.data);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getAreaListInquire = async (params) => {
  const REQUEST_URL = "/proxy/api/cm/" + params.params + "/area/list";
  //const REQUEST_URL = "https://dev-etrend.emart.com/proxy/api/ov/catcd/list";
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
    data : {
      area: [],
      store: []
    }
  })
    .then((res) => {
      returnStr = res.data.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      //return returnExceptionStaus(returnStr);
    });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

/**
 * 상품 리뷰 대시보드 Overview Dashboard 조회
 * @param {*} searchParam
 * @returns
 */

export const getDashboardInquire = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/db/dashboard-list`;
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

/**
 * excel params history
 * @param {*} searchParam
 * @returns
 */

export const setExcelHistory = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/cm/` + searchParam + "/excel";
  // /overview - overview, detail - 상세, rs - summary
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    //data: searchParam,
  })
  .then((res) => {
    //returnStr = res.data.data;
    console.log(JSON.stringify(res));
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    //return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getAlarmListInquire = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-list`;
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const setAlarmInsert = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-insert`;
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const setAlarmDelete = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-delete`;
  let returnStr = "";
  await Axios({
    method: "delete",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const setAlarmUpdate = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-update`;
  let returnStr = "";
  await Axios({
    method: "PUT",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const setAlarmOnoff = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-onoff`;
  let returnStr = "";
  await Axios({
    method: "PUT",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}

export const getAlarmSendList = async (searchParam) => {
  const REQUEST_URL = `/proxy/api/al/alarm-send-list`;
  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "api-token": sessionStorage.getItem("API_TOKEN")
    },
    data: searchParam,
  })
  .then((res) => {
    returnStr = res.data.data;
  })
  .catch((ex) => {
    console.error("api requset fail: " + ex);
    return returnExceptionStaus(ex.response.data);
  });
  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
}


