import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import Login from "@pages/Login";
import Writing from "@pages/Writing";
import Read from "@pages/Read";
import Admin from "@pages/Admin";

const DefaultRoutes = () => (
  <div style={{ margin: "30px auto", width: "100%" }}>
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="writing" element={<Writing />} />
      {/* <Route path="test" element={<Test value="jinhee" />} /> */}
      <Route path="post/:id" element={<Read />} />
      <Route path="admin" element={<Admin />} />
    </Routes>
  </div>
);

export default DefaultRoutes;
