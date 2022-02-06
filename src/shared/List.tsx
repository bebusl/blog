import styled from "styled-components";

export const List = styled.div`
  width: 100%;
  height: 250px;
  margin: 1rem auto;
  background-color: black;
  color: white;
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: repeat(3, 1fr);
  & img {
    grid-row: 1/4;
    width: 250px;
    margin: 0 auto;
    justify-self: center;
    align-self: center;
  }
  & div:nth-child(2) {
    background-color: green;
  } //nth-child는 부모를 일단 찾고, 부모의 nth차일드를 선택하는 거임.
`;
