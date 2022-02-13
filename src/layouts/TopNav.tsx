import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "src/store/rootReducer";

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

  & li * {
    color: white;
  }
  & li:after {
    clear: both;
  }

  & li:last-child:before {
    content: "";
    display: inline-block;
    width: calc(100vw - 20rem);
    height: 30px;
    margin: 0;
  }
  & li *:hover {
    color: white;
  }
`;

const TopNav = () => {
  const isLogin = useSelector((state: RootState) => state.isLogin);
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
            <Link to="/logout">로그아웃</Link>
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
