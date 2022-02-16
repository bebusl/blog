import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
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

const GET_CATEGORIES = gql`
  query category($category: [ID]) {
    getCategoryInfo(ids: $category) {
      category {
        name
        count
      }
      tags {
        name
        count
      }
    }
  }
`;

const SideNav = () => {
  const [nav, setNav] = useState(false);
  const { loading, data, error } = useQuery(GET_CATEGORIES, {
    variables: { category: [] },
    onCompleted: (data) => console.log("성공", data),
  });
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
        {data &&
          data.getCategoryInfo.map((adata: any) => (
            <>
              <h4>
                {adata.category.name}({adata.category.count})
              </h4>
              <ul>
                {adata.tags.map(
                  (tag: { name: string; count: number }, idx: number) => (
                    <li key={`tag-${idx}`}>
                      {tag.name}({tag.count})
                    </li>
                  )
                )}
              </ul>
            </>
          ))}
        {/* {testData && (
          <>
            <h4>
              {testData.category.name}({testData.category.count})
            </h4>
            <ul>
              {testData.tags.map((tag, idx) => (
                <li key={`tag-${idx}`}>
                  {tag.name}({tag.count})
                </li>
              ))}
            </ul>
          </>
        )} */}
      </NavStyle>
    </>
  );
};

export default SideNav;

/**
 * [
    {
        "__typename": "CategoryInfoType",
        "category": {
            "__typename": "PostCountType",
            "name": "미등록 태그",
            "count": 1
        },
        "tags": [
            {
                "__typename": "PostCountType",
                "name": "tag",
                "count": 1
            }
        ]
    }
]
 */
