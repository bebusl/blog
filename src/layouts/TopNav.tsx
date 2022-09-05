import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { setToken } from "@utils/fetch";
import DefaultContainer from "./DefaultContainer";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { logoff } from "src/store/authReducer";

const TopNavStyle = styled.ul`
  list-style-type: none;
  z-index: 10;
  height: 60px;
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0 auto;
  background-color: black;
  color: white;

  & li {
    line-height: 60px;
    float: left;
    color: white;
    margin: auto 20px;
  }

  & li *,
  & li *:hover {
    color: white;
  }
  & li:after {
    clear: both;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const TopNav = () => {
  const { isLogin, authToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <TopNavStyle>
      <DefaultContainer flexDirection="row" justifyContent="space-between">
        <div>
          <Link to="/">BlogHome</Link>
        </div>
        {isLogin && (
          <div>
            <Link to="/writing">글쓰기</Link>
            <Link to="/admin">관리자페이지</Link>
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                dispatch(logoff());
                setToken(authToken, true, undefined)
                  .get("/user/logout")
                  .then((res) => console.log("로그아웃 결과", res))
                  .catch((e) => console.log("로그아웃에러", e));
              }}
            >
              로그아웃
            </Link>
          </div>
        )}
        {!isLogin && <Link to="/login">로그인</Link>}
      </DefaultContainer>
    </TopNavStyle>
  );
};

export default TopNav;
