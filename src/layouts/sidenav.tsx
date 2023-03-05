import React, { useState, Fragment } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import IconButton from "src/components/IconButton";

const SideNav = () => {
  const [openSideBar, setOpenSideBar] = useState(false);
  const { loading, data } = useQuery(GET_CATEGORIES, {
    variables: { category_: [] },
  });

  return (
    <Container>
      <IconButton
        onClick={() => {
          setOpenSideBar((prev) => !prev);
        }}
      />
      <NavStyle nav={openSideBar}>
        {loading && <p>still Loading</p>}
        {data &&
          data.getCategoryInfo.map((adata: any) => (
            <Fragment key={adata.category.name}>
              <Link
                to={`/?category=${adata.category.id}`}
                style={{ fontWeight: 900 }}
              >
                {adata.category.name}({adata.category.count})
              </Link>

              <ul>
                {adata.tags.map(
                  (tag: { name: string; count: number; id: string }) => (
                    <Link
                      to={`/?tags=${tag.id}`}
                      key={tag.id}
                      style={{ fontSize: "0.8rem" }}
                    >
                      {tag.name}({tag.count})
                    </Link>
                  )
                )}
              </ul>
            </Fragment>
          ))}
      </NavStyle>
    </Container>
  );
};

export default SideNav;

const Container = styled.div`
  width: 50px;
  z-index: 10000;
  background-color: black;
  position: fixed;
  top: 0;
  left: 0;
`;

const NavStyle = styled.nav<{ nav: boolean }>`
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 9999;
  background-color: black;
  border: none;
  width: 250px;
  min-height: 100vh;
  display: inline-block;
  transform: ${({ nav }) => (nav ? "translateX(0)" : "translateX(-250px)")};
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
