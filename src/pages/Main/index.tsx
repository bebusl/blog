import React, { useState } from "react";
import { List } from "src/shared/List";
import TopNav from "src/layouts/TopNav";
import SideNav from "src/layouts/sidenav";
import styled from "styled-components";
import { useQuery, gql } from "@apollo/client";
import { useDispatch, useSelector, useStore } from "react-redux";
import { login } from "src/store/action";
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
  const redux = useSelector((state) => state);
  const dispatch = useDispatch(); //dispatch에 action넣어서 수송~

  const { data, error, loading } = useQuery(GET_POST, {
    variables: { tags: [], page: 0, size: 10 },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const src = "https://cold-cougar-89.loca.lt/file/serve/";
  return (
    <div>
      <TopNav></TopNav>
      <SideNav></SideNav>

      <LMain>
        {!loading && !data && <div>포스트가 없습니다.</div>}
        {data &&
          data.getAllPost.map((post: any, idx: Number) => (
            <List key={`list${idx}`}>
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
