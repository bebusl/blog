import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "src/store/rootReducer";
import { useDispatch } from "react-redux";
import { logoff } from "src/store/action";
import { setToken } from "@utils/fetch";

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

const TopNav = () => {
  const isLogin = useSelector((state: RootState) => state.isLogin);
  const auth_token = useSelector((state: RootState) => state.authToken);
  const dispatch = useDispatch();
  return (
    <TopNavStyle>
      {isLogin && (
        <>
          <li>
            <Link to="/">BlogHome</Link>
          </li>
          <li>
            <Link to="/writing">글쓰기</Link>
          </li>
          <li>
            <Link to="/admin">관리자페이지</Link>
          </li>
          <li>
            <Link
              to=""
              onClick={(e) => {
                e.preventDefault();
                dispatch(logoff());
                setToken(auth_token, true, undefined)
                  .get("/user/logout")
                  .then((res) => console.log("로그아웃 결과", res))
                  .catch((e) => console.log("로그아웃에러", e));
              }}
            >
              로그아웃
            </Link>
          </li>
        </>
      )}
      {!isLogin && (
        <>
          <>
            <li>
              <Link to="/">BlogHome</Link>
            </li>
            <li>
              <Link to="/login">로그인</Link>
            </li>
          </>
        </>
      )}
    </TopNavStyle>
  );
};

export default TopNav;
