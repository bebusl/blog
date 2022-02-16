import React, { useState } from "react";
import { List } from "src/shared/List";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import SideNav from "src/layouts/sidenav";
const LMain = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

const GET_POST = gql`
  query GET_POST($tags: [ID]!, $page: Int!, $size: Int!) {
    getAllPost(tags: $tags, page: $page, size: $size) {
      postId
      title
      content
      tags
      createdDate
      thumbnail
      author {
        userId
      }
    }
  }
`;

const Main = () => {
  //const [post, setPost] = useState([]);

  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_POST, {
    variables: { tags: [], page: 0, size: 10 },
    pollInterval: 1000 * 30,
  });
  const src = "http://180.231.130.252:8000/file/serve/";
  return (
    <div>
      <SideNav></SideNav>
      <LMain>
        {!loading && !data && <div>포스트가 없습니다.</div>}
        {data &&
          data.getAllPost.map((post: any, idx: Number) => (
            <List
              style={{
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/read/${post.postId}`);
              }}
              key={`list${idx}`}
            >
              <img alt="img" src={`${src}${post.thumbnail}`}></img>
              <div>{post.title}</div>
              <div>{post.createdDate}</div>
              <div>{post.content}</div>
            </List>
          ))}
        {loading && <div>Loading...</div>}
      </LMain>
    </div>
  );
};

export default Main;
