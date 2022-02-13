import React, { useState, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
//validation해야하고, focus하는 거 하고 keypress hook만들어두자~
const SplitView = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh;
  & div,
  & textarea {
    height: 100%;
    width: 50%;
  }
`;

const Tag = styled.button`
  color: #d3cdcd;
  font-size: 0.7rem;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  border: 1px solid #d3cdcd;
  box-shadow: gray 1px 1px 5px;
`;

const Writing = () => {
  const [attachment, setAttachment] = useState("");
  const [tags, setTags] = useState<any>(["태그1", "태그2"]);
  const [title, setTitle] = useState<any>("테스트 타이틀");
  const [markdown, setMarkdown] = useState("테스트 컨텐츠 내용");
  const tagRef = useRef<any>(null);
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
      $content: String
      $thumbnail: ID
    ) {
      createPost(
        input: {
          title: $title
          tags: $tags
          content: $content
          thumbnail: $thumbnail
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
        authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
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
      //const { fileId } = data;
      posting({
        variables: {
          title: title,
          tags: tags,
          content: markdown,
          thumbnail: fileId,
        },
      });
    },

    context: {
      headers: {
        authorization: `Bearer ${window.localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    },
  });

  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          upload({
            variables: {
              file: attachment,
            },
          });
          // posting({
          //   variables: {
          //     title: title,
          //     tags: tags,
          //     content: markdown,
          //     file: attachment,
          //   },
          // });
          //sendFile({ variables: { file: attachment } });
        }}
      >
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          value={title}
          onInput={(e) => {
            e.preventDefault();
            setTitle(e.currentTarget.value);
          }}
        ></input>

        <div>
          <span>태그</span>
          <span
            style={{
              display: "inline-block",
              width: "150px",
              height: "2rem",
              backgroundColor: "rgba(0,0,0,0.1)",
            }}
            contentEditable
            ref={tagRef}
            onKeyPress={(e) => {
              const text = tagRef.current.innerText.trim();
              if (e.key === "Enter" && text.length > 0) {
                setTags([...tags, text]);
                tagRef.current.innerText = "";
              }
            }}
          ></span>
          <div>
            {tags.map((tag: any, idx: Number) => {
              return <Tag key={idx as React.Key}>{tag}</Tag>;
            })}
          </div>
        </div>
        <SplitView>
          <textarea
            onChange={(e) => {
              e.preventDefault();
              setMarkdown(e.target.value);
            }}
          ></textarea>
          <div>
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </SplitView>

        <input
          type="file"
          onChange={(e: any) => {
            setAttachment(e.target.files[0]);
          }}
        ></input>
        <button type="submit">글 작성</button>
      </form>
    </>
  );
};

export default Writing;
