import React from "react";
import { List } from "src/shared/List";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import usePosts from "src/hooks/usePosts";

const LMain = styled.div`
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
`;

const src = "https://jh-blog-api.yoonleeverse.com/file/serve/";

const Main = () => {
  const navigate = useNavigate();
  const { data, loading, error } = usePosts();

  return (
    <LMain>
      {!loading && !data && <div>포스트가 없습니다.</div>}
      {data?.getAllPost?.length > 0 ? (
        data.getAllPost?.map((post: any, idx: Number) => (
          <List
            style={{
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/post/${post.postId}`);
            }}
            key={`list${idx}`}
          >
            <img
              alt="img"
              src={`${src}${post.thumbnail}`}
              width="200px"
              onError={(e) => {
                const element = e.currentTarget;
                if (element) element.src = "images/test.png";
              }}
            />
            <div>{post.title}</div>
            <div>{new Date(post.createdDate).toLocaleString("ko-KR")}</div>
            <div>{post.content}</div>
          </List>
        ))
      ) : (
        <div>포스트가 없습니다</div>
      )}
      {loading && <div>Loading...</div>}
    </LMain>
  );
};

export default Main;
