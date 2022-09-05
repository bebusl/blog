import React, { useLayoutEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { client as axios } from "@utils/fetch";
import { useDispatch } from "react-redux";
import setCookie from "./utils/setCookie";
import TopNav from "./layouts/TopNav";
import { login, logoff } from "./store/action";
import DefaultContainer from "./layouts/DefaultContainer";
import DefaultRoutes from "./routes/defaultRoutes";
//const LogIn = loadable(() => import('@pages/LogIn'));
//여기서 5초마다 실행되게 하면 되자너?!
export default function App() {
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    function refreshedToken(cookie: String) {
      const refresh_token = cookie.split("=")[1];
      if (refresh_token) {
        axios
          .post("/user/refresh", {
            refresh_token: refresh_token,
          })
          .then((res) => {
            if (res.data.refresh_token === null) {
              setCookie("refreshToken", "", 0);
              dispatch(logoff());
            } else {
              setCookie("refreshToken", res.data.refresh_token, 7);
              dispatch(login(res.data.user, res.data.auth_token));
            }
          })
          .catch((error) => console.log("ERROR", error));
      }
    }

    refreshedToken(document.cookie);
    const interval = setInterval(() => {
      refreshedToken(document.cookie);
      //리프레시토큰보내고 새로운 토큰 받아오기
    }, 1000 * 60 * 40); //40분마다 실행
    interval;
    return clearInterval(interval);
  }, []); //이렇게보다 요청할때마다하는게 나을수도,,?

  return (
    <div>
      <TopNav />
      <DefaultContainer>
        <DefaultRoutes />
      </DefaultContainer>
    </div>
  );
}
