import React, { useState } from "react";
import { List } from "src/shared/List";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import usePosts from "src/hooks/usePosts";
import SideNav from "src/layouts/SideNav";

const LMain = styled.div`
  width: 1080px;
  margin: 0 auto;
`;

const Main = () => {
  const [id, setId] = useState<{
    categoryId: number | null;
    tags: number[] | null;
  }>({ categoryId: null, tags: [] });
  const navigate = useNavigate();
  const { data, loading, error } = usePosts();
  const src = "https://jh-blog-api.yoonleeverse.com/file/serve/";

  return (
    <div>
      <SideNav />
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
              <img alt="img" src={`${src}${post.thumbnail}`}></img>
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
    </div>
  );
};

export default Main;
