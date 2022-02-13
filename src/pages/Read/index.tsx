import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Title = styled.div`
  font-size: 2.5rem;
  color: #333131;
`;
const Tags = styled.div`
  & span {
    font-size: 0.9rem;
    color: #4d4b4b;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 0.3rem 1rem;
    border-radius: 10px;
    margin-right: 1rem;
  }
  margin: 1rem auto;
`;
const Content = styled.div`
  width: 720px;
`;

const Read = () => {
  const testTags = ["tag1", "tag2", "tag3", "tag4", "tag5"];
  const { id } = useParams();
  const testContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum nisi nec ante commodo, in dictum eros tempor. In molestie commodo pellentesque. Nullam a pellentesque eros, id mollis quam. In ut tellus tempor, mollis risus sed, semper dolor. Nullam dolor sapien, egestas dignissim nisi non, fermentum sollicitudin tortor. Curabitur maximus congue nibh sed posuere. Etiam porta tellus leo, ac mattis sem eleifend at. Nunc egestas aliquam nibh vel porttitor. Fusce vehicula augue felis, non condimentum enim lobortis in. Sed convallis sit amet arcu vitae eleifend. Vivamus congue, magna eu venenatis iaculis, nisi lacus eleifend magna, sed efficitur ex massa laoreet metus. Fusce ac molestie eros. Vivamus in magna neque. Pellentesque rutrum eros vel tortor vehicula scelerisque.

Fusce nec scelerisque elit, tincidunt tempus justo. Pellentesque sem mi, feugiat quis tortor id, volutpat rhoncus nibh. Nulla sit amet ex nec lorem tempor viverra eu id enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam at nisl ac magna accumsan sodales. Suspendisse efficitur hendrerit tellus et convallis. Donec a eros tempor, consectetur magna vel, pulvinar turpis.

Praesent sit amet elit est. Vivamus vitae vulputate risus. Aenean porta ante nec dui iaculis luctus. Donec ut lacus quis metus aliquam aliquam. Ut urna massa, varius nec erat quis, porta vulputate lorem. Etiam mollis pretium arcu vitae blandit. Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque rutrum justo vitae porta vehicula. Sed eget consectetur ante. Vivamus semper volutpat nisi, et ullamcorper elit finibus vitae. In nec faucibus metus, placerat sagittis metus. Cras euismod bibendum elit, non ultricies magna luctus vel. Aliquam erat volutpat. Suspendisse bibendum tellus placerat scelerisque convallis.

Ut feugiat augue finibus est lobortis, quis fringilla mauris maximus. Suspendisse nec ullamcorper erat. Nulla vel sapien consequat, sollicitudin sapien suscipit, egestas massa. Duis mauris lacus, tincidunt et varius vel, ornare id ante. Duis egestas ultrices tellus, eget fringilla turpis interdum a. Integer mattis interdum sem et rutrum. Donec imperdiet magna id mauris interdum, ut dapibus ipsum commodo. Aenean magna purus, eleifend vitae dui at, feugiat sollicitudin tortor. Curabitur eget nisi id neque efficitur faucibus. Nam rutrum, neque id vehicula gravida, magna nibh efficitur mauris, nec facilisis tellus massa ultricies arcu. Vestibulum viverra tincidunt leo.

Fusce vestibulum imperdiet nunc, eget vehicula lacus suscipit venenatis. Vivamus eget lectus a magna pharetra lobortis. Pellentesque lacinia placerat lacinia. Nam at libero et libero vehicula placerat. Aliquam laoreet sit amet nisi sit amet consectetur. Nunc laoreet, mauris in mollis dictum, quam turpis accumsan purus, sit amet maximus dolor magna eget lorem. Curabitur lacus ipsum, dapibus eget lacus eu, finibus tincidunt nunc. Nam eget bibendum mi, ac dignissim velit. Fusce pulvinar nulla eget magna condimentum vestibulum. Sed a sapien consectetur turpis condimentum vehicula nec ut nulla. Aliquam hendrerit placerat metus, ac facilisis odio finibus bibendum. Mauris in tristique ligula. Vivamus eu est metus. Cras luctus, tortor in auctor elementum, purus dui dapibus neque, sed congue tortor lectus a augue. Suspendisse potenti. Quisque tellus magna, suscipit venenatis lorem non, condimentum venenatis turpis.`;
  return (
    <div>
      <Title>제목입니다 제목입니다 제목입니다~</Title>
      <Tags>
        {testTags.map((tag: string, idx: Number) => {
          return <span key={idx as React.Key}>#{tag}</span>;
        })}
      </Tags>
      <Content>{testContent}</Content>
    </div>
  );
};

export default Read;
