import styled from "styled-components";

export const List = styled.div`
  width: 100%;
  height: 150px;
  margin: 1rem auto;
  background-color: white;
  color: #3a3a3a;
  display: grid;
  border-top: 1px solid #ededed;
  border-bottom: 1px solid #ededed;
  grid-template-columns: 250px auto;
  grid-template-rows: repeat(8, 1fr);
  & img {
    grid-row: 1/9;
    height: 100%;
    margin: 0 auto;
    justify-self: center;
    align-self: center;
  }
  & div:nth-child(2) {
    font-weight: bold;
    font-size: 1rem;
    grid-row: 1/3;
    align-self: center;
  } //nth-child는 부모를 일단 찾고, 부모의 nth차일드를 선택하는 거임. */
  & div:nth-child(3) {
    font-weight: lighter;
    font-size: 0.8rem;
  }
  & div:nth-child(4) {
    font-weight: light;
    font-size: 0.9rem;
    grid-row: 4/9;
  }
`;
