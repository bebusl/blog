import React, { Dispatch, useRef, useState } from "react";
import styled from "styled-components";

const Input = styled.span`
  display: inline-block;
  font-weight: lighter;
  border-bottom: 1px solid #232323;
  font-size: 34px;
  max-width: calc(100% - 32px);
  min-width: 50px;

  // placeholder
  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  } //해당 요소가 비었을 때만 넣어주는 겨
`;

const TT = styled.span`
  display: inline-block;
  border-bottom: 1px solid red;
  font-size: 50;
  max-width: 100%;
  min-width: 50;

  &:empty:before {
    content: "낵꺼";
    color: gray;
    display: inline-block;
  }
`;

interface Props {
  value: string;
}

const Test = ({ value }: Props) => {
  const [editable, setEditable] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // 최대 입력가능한 글자수
  const MAX_LENGTH = 7;

  // onInput handler
  const handleInputEvent = (e: React.ChangeEvent<HTMLSpanElement>) => {
    const newValue = e.target.innerText;
    if (newValue.length >= MAX_LENGTH) {
      setEditable(false);
    }
    console.log("new Value");
  };

  return (
    <div onClick={() => setEditable(true)}>
      <Input
        ref={ref}
        placeholder="이름 또는 애칭"
        spellCheck={false}
        contentEditable={editable}
        onInput={handleInputEvent}
      />
      <TT contentEditable></TT>
    </div>
  );
};

export default Test;

//redux 활용을 좀 더 열심휘..!
