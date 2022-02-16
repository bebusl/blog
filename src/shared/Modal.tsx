import React from "react";
import styled from "styled-components";
import { useState } from "react";
const ModalLayout = styled.div<{ isOn: boolean }>`
  display: ${({ isOn }) => (isOn ? "block" : "none")}; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0, 0, 0); /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */

  & > div {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
  }

  & > div > span {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  & > div > span:hover,
  & > div > span:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
`;

interface customMouseEvent
  extends Omit<React.MouseEvent<HTMLDivElement, MouseEvent>, "target"> {
  target: {
    addEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: AddEventListenerOptions | boolean
    ): void;
    dispatchEvent(event: Event): boolean;
    removeEventListener(
      type: string,
      callback: EventListenerOrEventListenerObject | null,
      options?: EventListenerOptions | boolean
    ): void;
    id: string;
  };
} //e.target.id를 가져올수 없는 타입이라 Omit을 이용해 type override를 함
//Omit<type, '제거할 props'> 하면 type에서 'ㅈ

const Modal: React.FC<{
  on: boolean;
  exitModal: any;
  addCategory: Function;
}> = ({ on, exitModal, addCategory }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <ModalLayout
        isOn={on}
        onClick={(e: customMouseEvent) => {
          if (e.target.id === "pass") {
            e.stopPropagation();
          } else {
            exitModal();
          }
        }}
      >
        <div id="pass">
          <span>&times;</span>
          <h3 id="pass">새로 만들 카테고리의 이름을 입력해주세요!</h3>
          <input
            id="pass"
            type="text"
            placeholder="카테고리 이름"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          ></input>
          <button
            onClick={(e) => {
              e.preventDefault();
              addCategory(value);
              setValue("");
            }}
          >
            추가
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              exitModal();
            }}
          >
            취소
          </button>
        </div>
      </ModalLayout>
    </>
  );
};

export default Modal;
