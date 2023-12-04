import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Icon, Button, Form, Input } from "semantic-ui-react";
import * as commonUtil from "/src/component/Common";
import * as backendAPI from "/src/component/BackendAPI";
import * as ActionTypes from "/src/modules/actionTypes";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  const togglePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  const handleOnKeyPress = (e) => {
    e.stopPropagation();
    if (e.key === "Enter") {
      //setShowPassword(true);
      //login();
    }
  };

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
  const login = async () => {
    let user_id = document.getElementById("user_id").value;
    let passwd = document.getElementById("passwd").value;

    user_id = commonUtil.removeStrSpace(user_id);
    passwd = commonUtil.removeStrSpace(passwd);

    if (!user_id) {
      popupDispatch("사번을 입력해 주세요");
      document.getElementById("user_id").value = "";
      document.getElementById("user_id").focus();
      return;
    }

    if (!passwd) {
      popupDispatch("password를 입력해 주세요");
      document.getElementById("passwd").value = "";
      document.getElementById("passwd").focus();
      return;
    }

    let response = {};
    try {
      const userIp = await backendAPI.getClientIpCall();

      response = await backendAPI.postAdminLoginCall(user_id, passwd, userIp);
      console.log(JSON.stringify(response));
      response.status = 200;

      if (response.data.login_status === 1) {
        // console.log(JSON.stringify(response))
        localStorage.setItem("LOGIN_FAIL_CNT", 1);

        // sessionStorage.setItem("USER_ID", "11111");
        // sessionStorage.setItem("USER_NAME", "홍길동");
        // sessionStorage.setItem("USER_DEPARTMENT", "개발팀");
        // sessionStorage.setItem("API_TOKEN", "tokenvalue");
        sessionStorage.setItem("USER_ID", response.data.user_id);
        sessionStorage.setItem("USER_NAME", response.data.user_info.userName);
        sessionStorage.setItem(
          "USER_DEPARTMENT",
          response.data.user_info.department
        );
        sessionStorage.setItem("API_TOKEN", response.data.api_token);
        router.push("/prdReview/dashboard/search=");
      } else {
        if (localStorage.getItem("LOGIN_FAIL_CNT") > 4) {
          popupDispatch(
            `5회 이상 로그인 실패하여 로그인할 수 없습니다.\n다시 로그인이 가능하려면 \n담당자에게 연락해 주시길 바랍니다.`
          );
        } else {
          let loginFailCnt = commonUtil.isEmpty(
            localStorage.getItem("LOGIN_FAIL_CNT")
          )
            ? 1
            : Number(localStorage.getItem("LOGIN_FAIL_CNT"));
          localStorage.setItem("LOGIN_FAIL_CNT", loginFailCnt + 1);
          document.getElementById("user_id").value = "";
          document.getElementById("passwd").value = "";
          document.getElementById("user_id").focus();
          popupDispatch(
            `로그인 ${loginFailCnt}회 실패하였습니다.\n5회 연속 실패할 경우 로그인 계정이 잠기게 되므로 정확히 입력해 주시길 바랍니다`
          );
        }
        //router.push("/login");
      }
    } catch (e) {
      console.error(e);
      document.getElementById("user_id").value = "";
      document.getElementById("passwd").value = "";
      document.getElementById("user_id").focus();
      popupDispatch("로그인 실패하였습니다.");
    }
  };

  function reset() {
    document.querySelector("#user_id").value = "";
    document.querySelector("#passwd").value = "";
    document.getElementById("user_id").focus();
  }

  useEffect(() => {
    document.getElementById("user_id").focus();
  }, []);

  return (
    <>
      <div className="login-wrap">
        <Form>
          <h1>
            <img src="./images/emart_logo.png" style={{ width: "150px" }} />
            <span>이마트 e-Trend 시스템</span>
          </h1>
          <Form.Field>
            <Input id="user_id" placeholder="사번" maxLength="6"/>
          </Form.Field>
            <div className="pass-wrap">
              <Form.Field>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="passwd"
                  placeholder="블라섬 비밀번호"
                  maxLength="20"
                />
              </Form.Field>
              <button
                className={`${isActive ? "" : "active"}`}
                type="button"
                onClick={() => 
                  togglePasswordVisibility()
                  //handleClick();
                }
              >
                {/* {showPassword ? "숨기기" : "보이기"} */}
                {showPassword ? <Icon name="eye" /> : <Icon name="eye slash" />}
              </button>
            </div>
          
          <Button color="yellow" onClick={login} size="big">
            로그인
          </Button>
        </Form>
      </div>
    </>
  );
}

Login.getInitialProps = async (ctx) => {
  const pathname = ctx.pathname;

  return { pathname };
};
