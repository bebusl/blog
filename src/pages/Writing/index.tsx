import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Writing = () => {
  const [markdown, setMarkdown] = useState(``);
  return (
    <>
      <textarea
        onChange={(e) => {
          e.preventDefault();
          setMarkdown(e.target.value);
        }}
      ></textarea>

      <ReactMarkdown>{markdown}</ReactMarkdown>
      <button
        onClick={(e) => {
          e.preventDefault();
          console.log("글 등록 요청 보냇쎄여~~");
        }}
      >
        글 작성
      </button>
    </>
  );
};

export default Writing;
