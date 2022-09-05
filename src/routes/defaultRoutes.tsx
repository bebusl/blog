import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "@pages/Main";
import Login from "@pages/Login";
import Writing from "@pages/Writing";
import Test from "@pages/Test";
import Read from "@pages/Read";
import Admin from "@pages/Admin";

const DefaultRoutes = () => (
  <Routes>
    <Route path="/" element={<Main />} />
    <Route path="login" element={<Login />} />
    <Route path="writing" element={<Writing />} />
    <Route path="test" element={<Test value="jinhee" />} />
    <Route path="post/:id" element={<Read />} />
    <Route path="admin" element={<Admin />} />
  </Routes>
);

export default DefaultRoutes;
