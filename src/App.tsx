import React, { useEffect, useLayoutEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { client as axios, client } from "@utils/fetch";
import { useSelector } from "react-redux";
import Login from "@pages/Login";
import Main from "@pages/Main";
import Writing from "@pages/Writing";
import Test from "@pages/Test";
import Read from "@pages/Read";
import Admin from "@pages/Admin";
import { RootState } from "./store/rootReducer";
//const LogIn = loadable(() => import('@pages/LogIn'));
//여기서 5초마다 실행되게 하면 되자너?!
export default function App() {
  useEffect(() => {
    // if (document.cookie) {
    //   console.log("COOKIE", document.cookie);

    //   console.log(document.cookie.split("=")[1]);
    // }
    const interval = setInterval(() => {
      console.log("document.cookie", document.cookie);
      if (document.cookie) {
        axios
          .post("/user/refresh", {
            refresh_token: `${document.cookie.split("=")[1]}`,
          })
          .then((res) => console.log(res))
          .catch((error) => console.log("ERROR", error));
      }
      //리프레시토큰보내고 새로운 토큰 받아오기
    }, 1000 * 60 * 40); //40분마다 실행
    interval;
  }, []); //이렇게보다 요청할때마다하는게 나을수도,,?
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="writing" element={<Writing />}></Route>
        <Route path="test" element={<Test value="jinhee" />}></Route>
        <Route path="read/:id" element={<Read />}></Route>
        <Route path="admin" element={<Admin />}></Route>
      </Routes>
    </div>
  );
}
