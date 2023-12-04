import Axios from "axios";
import { CommentActions } from "semantic-ui-react";
import * as Common from "./Common";
import * as commonUtil from "/src/component/Common";

/**
 * 로그인 세션 만료 예외처리
 * @param {*} returnStr
 */
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
 * 사용자 로그인
 * @param {*} user_id
 * @param {*} passwd
 * @param {*} userIp
 * @returns
 */
export const postAdminLoginCall = async (user_id, passwd, userIp) => {
  let REQUEST_URL = `/proxy/api/ad/login`;
  console.log(REQUEST_URL);

  let returnStr = "";
  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
      "usr-ip": userIp,
    },
    data: {
      usr_id: user_id,
      passwd: passwd,
    },
  })
    .then((resp) => {
      console.log(`response:`);
      console.log(resp);
      returnStr = resp.data;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      returnStr = ex.response.data;
    })
    .finally(() => {
      console.log("api request end..");
    });

  return Common.isEmpty(returnStr) ? { returnStr } : returnStr;
};

export const getClientIpCall = async () => {
  let returnStr = "";
  let REQUEST_URL = `/api/clientIp`;
  console.log(`request: ${REQUEST_URL}`);

  await Axios({
    method: "POST",
    url: REQUEST_URL,
    headers: {
      accept: "application/json",
    },
  })
    .then((resp) => {
      console.log(`response:`);
      console.log(resp);
      returnStr = resp.data.userIp;
    })
    .catch((ex) => {
      console.error("api requset fail: " + ex);
      returnStr = ex.response.data;
      return returnExceptionStaus(returnStr);
    })
    .finally(() => {
      console.log("api request end..");
    });

  console.log("returnStr" + returnStr);

  return Common.isEmpty(returnStr) ? {} : returnStr;
};
