import styled from "styled-components";

export const List = styled.div`
  background-color: black;
  color: white;
  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: repeat(3, 1fr);
  & img {
    grid-row: 1/4;
    width: 250px;
    margin: 0 auto;
  }
`;
