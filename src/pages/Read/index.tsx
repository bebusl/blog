import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownViewer from "src/components/MarkdownViewer";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "src/store/hooks";
import styled from "styled-components";
import ContentIndex from "src/components/ContentIndex";

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
  const navigate = useNavigate();
  if (data) console.log(data.getPost.content);
  const { authToken, isLogin } = useAppSelector((state) => state.auth);
  const commentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const addScript = document.createElement("script");
    addScript.async = true;
    addScript.src = "https://utteranc.es/client.js";
    addScript.setAttribute("repo", "sancy1003/chanstory-comments");
    addScript.setAttribute("issue-term", "pathname");
    addScript.setAttribute("theme", "github-light");
    addScript.setAttribute("crossorigin", "anonymous");

    commentRef.current?.appendChild(addScript);
  }, []);

  const [delete_post, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    context: {
      headers: {
        authorization: `Bearer ${authToken}`, //토큰 넣어주기!
      },
    },
  });

  return (
    <>
      {loading && <p>로딩중입니다.</p>}
      {error && <p>페이지 로딩에 실패했습니다.</p>}
      {data && (
        <PostContainer>
          <Title>{data.getPost.title}</Title>

          <Tags>
            {data.getPost.tags.map((tag: string, idx: Number) => {
              return <span key={idx as React.Key}>#{tag}</span>;
            })}
          </Tags>
          <ContentIndex content={data.getPost.content} />
          <ContentWrapper>
            <MarkdownViewer content={data.getPost.content} />
          </ContentWrapper>
        </PostContainer>
      )}
      <div ref={commentRef} />
      {isLogin && (
        <button
          onClick={(e) => {
            e.preventDefault();
            delete_post({
              variables: { postId: id },
              onCompleted: () => {
                navigate(-1);
              },
              onError: (err) => console.log(err),
            });
          }}
        >
          삭제하기
        </button>
      )}
      {deleteLoading && <p>포스트 삭제 중...</p>}
    </>
  );
};

export default Read;

const Title = styled.div`
  font-size: 4rem;
  font-weight: 700;
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

const PostContainer = styled.article`
  padding: 1rem;
  width: 80%;
  @media screen and (max-width: 800px) {
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  padding: 1em;
`;
