import React, { ChangeEvent, EventHandler, MouseEventHandler } from "react";
import styled from "styled-components";
import { useState } from "react";
const ModalLayout = styled.div<{ isOn: boolean }>`
  display: ${({ isOn }) => (isOn ? "block" : "none")}; /* Hidden by default */
  position: fixed; /* Stay in place */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: transparent;
  & > div:first-child {
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    margin: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  & > div:nth-child(2) {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fefefe;
    padding: 20px;
    border: 1px solid #888;
    width: 70%; /* Could be more or less, depending on screen size */
    max-width: 720px;
    z-index: 2000; /* Sit on top */
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
const TagS = styled.span`
  display: inline-block;
  padding: 5px;
  height: 1.5rem;
  text-align: center;
  border: 1px solid #ededed;
  box-shadow: 1px 1px 1px #ededed;
  border-radius: 10px;
  cursor: pointer;
`;

const SelectedTag = styled(TagS)`
  color: #af3e3e;
  border: 1px solid #af3e3e;
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
  tags: string[];
}> = ({ on, exitModal, addCategory, tags }) => {
  const [value, setValue] = useState("");
  const [selectedTags, setST] = useState<string[]>([]);
  return (
    <>
      <ModalLayout
        isOn={on}
        onClick={(e: customMouseEvent) => {
          //e.stopPropagation();
        }}
      >
        <div></div>
        <div>
          <span
            onClick={(e) => {
              e.preventDefault();
              exitModal();
            }}
          >
            &times;
          </span>
          <h3>새로 만들 카테고리의 이름을 입력해주세요!</h3>
          <input
            type="text"
            placeholder="카테고리 이름"
            value={value}
            onChange={(e) => {
              e.preventDefault();
              setValue(e.target.value);
            }}
          ></input>
          <div>
            {tags.map((tag) =>
              !selectedTags.includes(tag) ? (
                <TagS
                  onClick={(e) => {
                    e.preventDefault();
                    setST([...selectedTags, tag]);
                  }}
                >
                  {tag}
                </TagS>
              ) : (
                <SelectedTag
                  onClick={(e) => {
                    e.preventDefault();
                    setST((selectedTags) =>
                      selectedTags.filter((t) => t !== tag)
                    );
                  }}
                >
                  {tag}
                </SelectedTag>
              )
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addCategory(value, selectedTags);
              exitModal();
              setValue("");
              setST([]);
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
