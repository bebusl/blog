import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { setToken } from "@utils/fetch";
import DefaultContainer from "./DefaultContainer";
import { useAppSelector, useAppDispatch } from "src/store/hooks";
import { logoff } from "src/store/authReducer";

const TopNav = () => {
  const { isLogin, authToken } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const blogTitle = localStorage.getItem("blog-title") || "Blog Home";

  return (
    <TopNavStyle>
      <DefaultContainer flexDirection="row" justifyContent="space-between">
        <div>
          <Link to="/">{blogTitle}</Link>
        </div>
        {isLogin && (
          <MenuBox>
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
          </MenuBox>
        )}
        {!isLogin && <Link to="/login">로그인</Link>}
      </DefaultContainer>
    </TopNavStyle>
  );
};

export default TopNav;

const TopNavStyle = styled.ul`
  list-style-type: none;
  z-index: 10;
  height: 60px;
  width: 100vw;
  position: sticky;
  top: 0;
  left: 0;
  margin: 0;
  background-color: #323232;
  color: white;

  & li {
    line-height: 60px;
    float: left;
    color: white;
    margin: auto1 1rem;
  }

  & li:after {
    clear: both;
  }
`;

const MenuBox = styled.div`
  display: flex;
  gap: 10px;
`;
