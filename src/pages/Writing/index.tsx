import React, { FormEvent, useState, useRef } from "react";
import { useMutation, gql } from "@apollo/client";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

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
  background-color: white;
  border-radius: 10px;
  border: 1px solid gray;
  box-shadow: gray 5px 5px 5px;
`;

const Writing = () => {
  const [attachment, setAttachment] = useState("");
  const [tags, setTags] = useState<any>([]);
  const [innertext, setInnerText] = useState<any>("");
  const [markdown, setMarkdown] = useState("");
  const tagRef = useRef<any>(null);
  const SEND_FILE = gql`
    mutation upload($file: Upload) {
      upload(file: $file) {
        realName
        fileId
      }
    }
  `;
  const [sendFile, { loading, error, data }] = useMutation(SEND_FILE, {
    onCompleted: (data) => {
      console.log("완료! ,", data);
    },
  });

  return (
    <>
      <form
        onSubmit={(e: any) => {
          e.preventDefault();
          sendFile({ variables: { file: attachment } });
        }}
      >
        <div>
          {tags.map((tag: any) => {
            return <Tag>{tag}</Tag>;
          })}
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
                console.log("useRef", tagRef.current.innerText, tagRef.current);
                setTags([...tags, text]);
                tagRef.current.innerText = "";
                console.log("HTML", tagRef.current.inner);
              }
            }}
          >
            {}
          </span>
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
            console.log("::", e.target.files);
            setAttachment(e.target.files[0]);
          }}
        ></input>
        <button
          type="submit"
          // onClick={(e) => {
          //   e.preventDefault();
          //   console.log("글 등록 요청 보냇쎄여~~");
          // }}
        >
          글 작성
        </button>
      </form>
    </>
  );
};

export default Writing;
