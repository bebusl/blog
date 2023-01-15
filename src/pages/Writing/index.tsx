import React, { useState, useRef, FormEventHandler } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MarkdownViewer from "src/components/MarkdownViewer";
import { useAppSelector } from "src/store/hooks";

const Writing = () => {
  const [attachment, setAttachment] = useState<File>();
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
    <form
      onSubmit={handleSubmit}
      style={{
        width: "100%",
        height: "80vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Title
        title="title"
        type="text"
        name="title"
        placeholder="제목을 입력해주세요"
        value={title}
        onInput={(e) => {
          e.preventDefault();
          setTitle(e.currentTarget.value);
        }}
      />

      <TagsWrapper>
        {tags.map((tag: any, idx: Number) => (
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
        ))}
        <span
          title="tag-input"
          ref={tagRef}
          contentEditable
          placeholder="태그를 입력하세요"
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
      </TagsWrapper>
      <SplitView>
        <textarea
          onChange={(e) => {
            e.preventDefault();
            setMarkdown(e.target.value);
          }}
          style={{ resize: "none", border: "none" }}
        />
        <div>
          <MarkdownViewer content={markdown} />
        </div>
      </SplitView>
      <ThumbnailSelectBtn htmlFor="thumbnail">
        썸네일 이미지 선택
      </ThumbnailSelectBtn>
      <input
        type="file"
        id="thumbnail"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const target = e.target;
          if (target.files) setAttachment(target.files[0]);
        }}
      />
      <button type="submit" style={{ margin: 0 }}>
        글 작성
      </button>
    </form>
  );
};

export default Writing;

const SplitView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 60vh;
  height: 100%;
  width: 100%;
  & div,
  & textarea {
    height: 100%;
    width: 50%;
  }
  *:nth-child(2) {
    background-color: #ebebeb;
  }
`;

const Title = styled.input`
  background-color: inherit;
  border: none;
  font-size: 3rem;
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
  margin: 0.5rem 0;
  input {
    border: none;
  }
  [contenteditable="true"]:empty:before {
    content: attr(placeholder);
    display: inline-block;
    color: #b0adad;
  }
`;

const ThumbnailSelectBtn = styled.label`
  font-weight: bold;
  background-color: #2f2f2f;
  color: white;
  width: fit-content;
  cursor: pointer;
  & + input {
    background-color: red;
    display: none;
  }
`;
