import React from "react";
import loadable from "@loadable/component";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "@pages/Login";
import Main from "@pages/Main";
import Writing from "@pages/Writing";
import Test from "@pages/Test";
//const LogIn = loadable(() => import('@pages/LogIn'));

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="writing" element={<Writing />}></Route>
        <Route path="test" element={<Test value="jinhee" />}></Route>
        {/* <Route path="" element={}></Route> */}
      </Routes>
    </div>
  );
}
