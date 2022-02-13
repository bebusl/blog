import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NavStyle = styled.nav<{ nav: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  background-color: #ededed;
  width: 250px;
  display: inline-block;
  transform: ${(props) =>
    props.nav ? "translateX(0px)" : "translateX(-260px)"};
  transition-duration: 1s;

  & h4 {
    font-weight: 900;
  }
  & ul {
    list-style-type: none;
  }
`;

const ToggleButton = styled.div<{ nav: boolean }>`
  width: 60px;
  height: 60px;
  text-align: center;
  line-height: 30px;
  position: fixed;
  left: 0;
  top: 80px;
  transform: ${(props) =>
    props.nav ? "translateX(150px)" : "translateX(0px)"};
  transition-duration: 0.7s;
  z-index: 1;
  cursor: pointer;
`;

const SideNav = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <ToggleButton
        onClick={(e) => {
          e.preventDefault();
          setNav(!nav);
        }}
        nav={nav}
      >
        <img
          alt="버거바"
          width="10px"
          src="https://cdn-icons.flaticon.com/png/512/4204/premium/4204600.png?token=exp=1644595427~hmac=db200c0d1cea00509e4bd75e5cdabd46"
        />
      </ToggleButton>
      <NavStyle nav={nav}>
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
    </>
  );
};

export default SideNav;
