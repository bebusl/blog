import React, { useState, MouseEvent } from "react";
import styled from "styled-components";
import Modal from "src/shared/Modal";
const Contents = styled.div`
  width: 720px;
  height: 100vh;
  margin: 2rem auto;
  border: 1px solid #ededed;
`;

const TagS = styled.span`
  display: inline-block;
  padding: 5px;
  height: 1.5rem;
  text-align: center;
  border: 1px solid #ededed;
  box-shadow: 1px 1px 1px #ededed;
  border-radius: 10px;
`;

const Admin = () => {
  const [on, setOn] = useState(false);
  const [categories, setCategories] = useState<ICategory & Object>({
    Default: ["js", "typescript"],
    React: ["react", "react-query"],
    General: ["Q&A", "problem"],
  });
  interface ICategory {
    [key: string]: string[];
  }

  const DragTag: React.FC<{ tag: string }> = ({ children, tag }) => {
    return (
      <TagS
        draggable="true"
        onDrag={(e) => {
          console.log("onDrag", e);
        }}
        onDragStart={(e) => {
          console.log("TAG", tag);
          e.dataTransfer.setData("tagname", tag);
        }}
      >
        {children}
      </TagS>
    );
  };

  const DropTag: React.FC<{ category: string; onAdd: Function }> = ({
    children,
    category,
    onAdd,
  }) => (
    <TagS
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const data = e.dataTransfer.getData("tagname");
        onAdd(category, data);
      }}
    >
      {children}
    </TagS>
  );

  const createCategoryBtn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    categories["Test"] = [];
    setOn(true);
  };

  const exitModal = () => {
    setOn(false);
  };

  const addCategory = (newName: string) => {
    setCategories({ ...categories, [newName]: [] });
  };

  const onAdd = (category: string, tag: string) => {
    if (categories.hasOwnProperty(category)) {
      if (!categories[category].includes(tag)) {
        setCategories({
          ...categories,
          [category]: [...categories[category], tag],
        });
      }
    } else {
      setCategories({
        ...categories,
        [category]: [tag],
      });
    }
  };

  return (
    <>
      <Contents>
        <button onClick={createCategoryBtn}>Add Category</button>
        <Modal on={on} exitModal={exitModal} addCategory={addCategory}></Modal>
        {Object.keys(categories).map((category: string, idx_cat) => {
          return (
            <>
              <h2 key={`cat-${idx_cat}`}>{category}</h2>
              {categories[category].map((tag, idx) => (
                <DragTag key={`tag-${idx_cat}-${idx}`} tag={tag}>
                  {tag}
                </DragTag>
              ))}
              <DropTag category={category} onAdd={onAdd}>
                +
              </DropTag>
            </>
          );
        })}
      </Contents>
    </>
  );
};

export default Admin;
