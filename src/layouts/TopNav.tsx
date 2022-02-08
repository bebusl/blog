import React, { useState } from "react";
import styled from "styled-components";

const TopNavStyle = styled.ul`
  list-style-type: none;
  z-index: 10;
  height: 60px;
  width: 100vw;
  position: sticky;
  background-color: black;
  color: white;

  & li {
    line-height: 60px;
    float: left;
    color: white;
    margin: auto 20px;
  }
  & li:after {
    clear: both;
  }
  & li:last-child:before {
    content: "";
    display: inline-block;
    width: calc(100vw - 400px);
    height: auto;
    background-color: red;
  }
`;

const TopNav = () => {
  return (
    <TopNavStyle>
      <li>nav1</li>
      <li>nav2</li>
      <li>nav3</li>
      <li>로그인</li>
    </TopNavStyle>
  );
};

export default TopNav;
