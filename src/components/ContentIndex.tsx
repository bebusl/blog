import React from "react";
import styled from "styled-components";

interface ContentIndexProps {
  content: string;
}

function countNumbersign(sentence: string) {
  let cnt = 0;
  for (let char of sentence) {
    if (char !== "#") break;
    cnt++;
  }
  return cnt;
}

function splitNewLine(content: string) {
  return content.split("\n");
}

function ContentIndex({ content }: ContentIndexProps) {
  const registeredName: { [key: string]: number } = {};
  const contentIndex: { depth: number; headerName: string; link: string }[] =
    [];
  splitNewLine(content).forEach((t) => {
    const numbersignCnt = countNumbersign(t);
    if (numbersignCnt) {
      let headerName = t.slice(numbersignCnt + 1);
      headerName = headerName.replace(" ", "-");
      const data = { depth: numbersignCnt, headerName, link: "" };

      if (registeredName.hasOwnProperty(headerName)) {
        const duplicatedCnt = registeredName[headerName];
        registeredName[headerName] += 1;
        headerName += `-${duplicatedCnt}`;
      } else {
        registeredName[headerName] = 1;
      }
      data.link = headerName;
      contentIndex.push(data);
    }
  });

  return (
    <FloatBox>
      <p>
        <b>목차</b>
      </p>
      {contentIndex.map((index) => (
        <p style={{ paddingLeft: `${(index.depth - 1) * 10}px` }}>
          <a href={"#" + index.link} style={{ color: "gray" }}>
            {index.headerName}
          </a>
        </p>
      ))}
    </FloatBox>
  );
}

export default React.memo(ContentIndex);

const FloatBox = styled.section`
  border: 1px solid #ededed;
  background-color: white;
  border-radius: 5px;
  position: fixed;
  min-width: 200px;
  left: 80%;
  @media screen and (max-width: 800px) {
    width: 100%;
    position: static;
  }
`;
