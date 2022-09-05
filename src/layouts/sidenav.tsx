import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import IconButton from "src/components/IconButton";

const SideNav: React.FC<{
  handleTagClick: Function;
}> = ({ handleTagClick }) => {
  const [nav, setNav] = useState(false);
  const { loading, data, error } = useQuery(GET_CATEGORIES, {
    variables: { category_: [] },
    onCompleted: (data_) => console.log("웨이러니?", data_),
    onError: (error_) => console.log("헤헤 에러남", error_),
  });
  return (
    <>
      <IconButton
        onClick={() => {
          setNav((prev) => !prev);
        }}
      />
      <NavStyle nav={nav}>
        {loading && <p>still Loading</p>}
        {data &&
          data.getCategoryInfo.map((adata: any) => (
            <Fragment key={adata.category.name}>
              <h5>
                <Link
                  to="/"
                  onClick={(e) => handleTagClick(e, adata.category.id, [])}
                >
                  {adata.category.name}({adata.category.count})
                </Link>
              </h5>

              <ul>
                {adata.tags.map(
                  (
                    tag: { name: string; count: number; id: string },
                    idx: number
                  ) => (
                    <li
                      key={`tag${adata.category.name}-${idx}`}
                      style={{ cursor: "pointer" }}
                      onClick={(e) => {
                        handleTagClick(e, null, [Number(tag.id)]);
                      }}
                    >
                      {tag.name}({tag.count})
                    </li>
                  )
                )}
              </ul>
            </Fragment>
          ))}
      </NavStyle>
    </>
  );
};

export default SideNav;

const NavStyle = styled.nav<{ nav: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 9999;
  background-color: black;
  width: 250px;
  min-height: 100vh;
  display: inline-block;
  transform: ${({ nav }) => (nav ? "translateX(0)" : "translateX(-260px)")};
  transition-duration: 1s;
  margin: 0;
  & h5 {
    font-weight: 900;
  }
  & ul {
    list-style-type: none;
  }
`;

const category_info = gql`
  fragment categoryInfo on CategoryCountType {
    name
    count
    id
  }
`;

const tags_info = gql`
  fragment tagsInfo on TagCountType {
    name
    count
    id
  }
`;

const GET_CATEGORIES = gql`
  ${category_info}
  ${tags_info}
  query category($category_: [ID]) {
    getCategoryInfo(ids: $category_) {
      category {
        ...categoryInfo
      }
      tags {
        ...tagsInfo
      }
    }
  }
`;
