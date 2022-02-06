import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NavStyle = styled.nav<{ nav: boolean }>`
  position: absolute;
  top: 60px;
  left: 0;
  background-color: #ededed;
  width: 250px;
  display: inline-block;
  transform: ${(props) =>
    props.nav ? "translateX(0px)" : "translateX(-220px)"};
  transition-duration: 1s;
  & button {
    width: 100%;
    margin: 0;
  }
  & button:after {
    content: "a";
    width: 70px;
    height: 70px;
    margin-left: 50%;
    background-image: url("https://icons-for-free.com/iconfiles/png/512/svg+general+ham+list+menu+menu+icon+office+icon-1320185157378483623.png");
    background-size: auto;
  }
  & h4 {
    font-weight: 900;
  }
  & ul {
    list-style-type: none;
  }
`;

const SideNav = () => {
  const [nav, setNav] = useState(false);
  useEffect(() => {
    console.log("현재 nav 값 : ", nav);
  }, [nav]);
  return (
    <NavStyle nav={nav}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setNav(!nav);
        }}
      >
        toggle
      </button>

      <h4>Category</h4>
      <ul>
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
      <h4>Category2</h4>
      <ul>
        <li>menu1</li>
        <li>menu2</li>
        <li>menu3</li>
      </ul>
    </NavStyle>
  );
};

export default SideNav;
