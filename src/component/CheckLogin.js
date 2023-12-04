import Axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import * as Common from "../component/Common";

export default function CheckLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  async function checkLogin() {

    if (Common.isEmpty(sessionStorage.getItem("API_TOKEN")))
      router.push("/login");
  }

  useEffect(() => {
    checkLogin();
  }, []);

  return <></>;
}
