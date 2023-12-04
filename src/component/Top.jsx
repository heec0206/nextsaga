import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import * as commonUtil from "/src/component/Common";

const Top = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const logout = () => {
    Axios.get("/api/logout").then((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem("USER_ID");
        sessionStorage.removeItem("API_TOKEN");
        router.push("/login");
      }
    });
  };

  useEffect(() => {
    setUserId(
      typeof window !== "undefined" ? sessionStorage.getItem("USER_ID") : null
    );
    setUserName(
      typeof window !== "undefined" ? sessionStorage.getItem("USER_NAME") : null
    );

    if (commonUtil.isEmpty(sessionStorage.getItem("API_TOKEN"))) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <div
        className="logo"
        style={{ cursor: "pointer" }}
        onClick={() => router.push("/prdReview/dashboard/search=")}
      >
        <img src="/images/emart_logo.png" style={{ width: "80px" }} />
        <span>이마트 e-Trend 시스템</span>
      </div>
      <div className="top-info">
        <a href="#" className="name">
          {userName}({userId})
        </a>
        <a href="#" className="logout" onClick={logout}>
          로그아웃
        </a>
      </div>
    </>
  );
};

export default Top;
