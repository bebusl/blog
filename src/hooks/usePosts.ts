import { gql, useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useMemo } from "react";
import { useLocation } from "react-router";
import { useSearchParams } from "react-router-dom";

function usePosts() {
  const [searchParams] = useSearchParams();
  const [getPosts, { loading, error, data }] = useLazyQuery(GET_POST, {
    pollInterval: 0,
  });
  const category = searchParams.get("category");
  const tags =
    searchParams
      .get("tags")
      ?.split(",")
      .map((tag) => +tag) ?? [];

  useEffect(() => {
    getPosts({
      variables: {
        category: category ? +category : null,
        tags: tags,
        page: 0,
        size: 10,
      },
    });
  }, [searchParams]);

  return { loading, error, data };
}

export default usePosts;

const GET_POST = gql`
  query GET_POST($category: ID, $tags: [ID]!, $page: Int!, $size: Int!) {
    getAllPost(category: $category, tags: $tags, page: $page, size: $size) {
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
