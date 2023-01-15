import React, { useState, useRef, FormEventHandler } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useAppSelector } from "src/store/hooks";

const Writing = () => {
  const [attachment, setAttachment] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState<string>("");
  const [markdown, setMarkdown] = useState("");
  const tagRef = useRef<HTMLSpanElement>(null);
  const token = useAppSelector((state) => state.auth.authToken);
  const navigate = useNavigate();
  const SEND_FILE = gql`
    mutation upload($file: Upload!) {
      upload(file: $file) {
        realName
        fileId
        originalName
      }
    }
  `;
  const POSTING = gql`
    mutation createPost(
      $title: String!
      $tags: [String]!
      $content: String!
      $thumbnail: ID
    ) {
      createPost(
        input: {
          title: $title
          tags: $tags
          content: $content
          thumbnail: $thumbnail
          attachments: []
        }
      ) {
        postId
        tags
      }
    }
  `;

  const [posting, { loading, error, data }] = useMutation(POSTING, {
    onError: (error) => {
      console.error("에러남", error);
    },
    onCompleted: (data) => {
      console.log("성공", data);
      navigate("/");
    },
    context: {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  const [upload, result] = useMutation(SEND_FILE, {
    onCompleted: (data) => {
      console.log(data);
      const {
        upload: { fileId },
      } = data;
      posting({
        variables: {
          title: title,
          tags: tags,
          content: markdown,
          thumbnail: fileId,
        },
      });
    },
    onError: (error) => {
      console.log("ERROR", error);
    },

    context: {
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  });

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (attachment) upload({ variables: { file: attachment } });
    else
      posting({
        variables: { title, tags, content: markdown, thumbnail: null },
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onInput={(e) => {
            e.preventDefault();
            setTitle(e.currentTarget.value);
          }}
        />

        <div>
          <span>태그</span>
          <TagsWrapper>
            <span
              contentEditable
              ref={tagRef}
              onKeyPress={(e) => {
                const text = tagRef.current?.innerText.trim();
                if (e.key === "Enter" && text && text.length > 0) {
                  e.preventDefault();
                  // contentEditable에서 enter를 입력하면 기본적으로 <br /> 엘레먼트가 추가된다.
                  // 우리는 Enter를 태그 추가의 의미로 사용할 것이므로 삭제!
                  setTags([...tags, text]);
                  if (tagRef.current) tagRef.current.innerText = "";
                }
              }}
            />
            <div>
              {tags.map((tag: any, idx: Number) => {
                return (
                  <Tag
                    key={idx as React.Key}
                    onClick={(e) => {
                      setTags((prev) => {
                        const idx = prev.indexOf(tag);
                        prev.splice(idx, 1);
                        const cur = [...prev];
                        return cur;
                      });
                    }}
                  >
                    {tag}
                  </Tag>
                );
              })}
            </div>
          </TagsWrapper>
        </div>
        <SplitView>
          <textarea
            onChange={(e) => {
              e.preventDefault();
              setMarkdown(e.target.value);
            }}
            style={{ resize: "none" }}
          />
          <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </SplitView>
        <label htmlFor="thumbnail">썸네일 이미지 선택</label>
        <input
          type="file"
          id="thumbnail"
          onChange={(e: any) => {
            setAttachment(e.target.files[0]);
          }}
        />
        <button type="submit">글 작성</button>
      </form>
    </>
  );
};

export default Writing;

const SplitView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  width: 80vw;
  & div,
  & textarea {
    height: 100%;
    width: 50%;
  }
`;

const Tag = styled.button`
  color: #4d4b4b;
  font-size: 0.7rem;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid #d3cdcd;
  box-shadow: gray 1px 1px 5px;
  :after {
    content: " X";
  }
`;

const TagsWrapper = styled.div`
  background-color: aliceblue;
  border-radius: 10px;
`;
