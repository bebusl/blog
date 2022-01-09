import React, { useState, useEffect } from "react";
import styled from "styled-components";

const NavStyle = styled.nav<{ nav: boolean }>`
  background-color: #ededed;
  width: 250px;
  transform: ${(props) =>
    props.nav ? "translateX(250px)" : "translateX(-230px)"};
  transition-duration: 1s;
  & button {
    width: 90%;
  }
  & h4 {
    background-color: #6d6d6d;
    font-weight: 900;
  }
  & ul {
    list-style-type: none;
  }
`;

const Nav = () => {
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

export default Nav;
