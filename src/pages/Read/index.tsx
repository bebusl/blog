import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";

const Title = styled.div`
  font-size: 2.5rem;
  color: #333131;
`;
const Tags = styled.div`
  & span {
    font-size: 0.9rem;
    color: #4d4b4b;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.3rem 1rem;
    border-radius: 10px;
    margin-right: 1rem;
  }
  margin: 1rem auto;
`;
const Content = styled.div`
  width: 720px;
`;

const GET_POST = gql`
  query category($postId: ID) {
    getPost(postId: $postId) {
      title
      content
      tags
    }
  }
`;

const Read = () => {
  const { id } = useParams();

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  return (
    <>
      {/* {data && console.log("DATA", data)} */}
      {data && (
        <div>
          <Title>{data.getPost.title}</Title>
          <Tags>
            {data.getPost.tags.map((tag: string, idx: Number) => {
              return <span key={idx as React.Key}>#{tag}</span>;
            })}
          </Tags>
          <Content>{data.getPost.content}</Content>
        </div>
      )}
      {loading && <p>로딩중입니다.</p>}
      {error && <p>페이지 로딩에 실패했습니다.</p>}
    </>
  );
};

export default Read;
