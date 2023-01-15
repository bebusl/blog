import React from "react";
import { useParams } from "react-router-dom";
import MarkdownViewer from "src/components/MarkdownViewer";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "src/store/hooks";
import styled from "styled-components";

const GET_POST = gql`
  query category($postId: ID) {
    getPost(postId: $postId) {
      title
      content
      tags
    }
  }
`;

const DELETE_POST = gql`
  mutation delete_post($postId: ID) {
    deletePost(postId: $postId) {
      success
    }
  }
`;

const Read = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_POST, {
    variables: { postId: id },
  });

  const auth_token = useAppSelector((state) => state.auth.authToken);

  const [delete_post, { loading: deleteLoading, data: deleteData }] =
    useMutation(DELETE_POST, {
      context: {
        headers: {
          authorization: `Bearer ${auth_token}`, //토큰 넣어주기!
        },
      },
    });

  return (
    <>
      {data && (
        <div>
          <Title>{data.getPost.title}</Title>

          <Tags>
            {data.getPost.tags.map((tag: string, idx: Number) => {
              return <span key={idx as React.Key}>#{tag}</span>;
            })}
          </Tags>
          <MarkdownViewer content={data.getPost.content} />
        </div>
      )}
      <button
        onClick={(e) => {
          e.preventDefault();
          delete_post({
            variables: { postId: id },
            onCompleted: (data) => console.log(data),
            onError: (err) => console.log(err),
          });
        }}
      >
        삭제하기
      </button>
      <button onClick={(e) => {}}>수정하기</button>
      {loading && <p>로딩중입니다.</p>}
      {error && <p>페이지 로딩에 실패했습니다.</p>}
    </>
  );
};

export default Read;

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
