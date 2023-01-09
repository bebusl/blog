import React, { useState, MouseEvent } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Modal from "src/shared/Modal";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useAppSelector } from "src/store/hooks";
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

const GET_CATEGORIES = gql`
  query category($category: [ID]) {
    getCategoryInfo(ids: $category) {
      category {
        id
        name
      }
      tags {
        id
        name
      }
    }
  }
`;

const CREATE_CATEGORIES = gql`
  mutation create_categories($name: String, $tags: [ID]) {
    createCategory(input: { name: $name, tags: $tags }) {
      categoryId
      name
    }
  }
`;

const Admin = () => {
  const [on, setOn] = useState(false);
  const [categories, setCategories] = useState<ICategory & Object>({});
  const [HH, setHH] = useState<string[]>([]);
  const [tagId, setTagId] = useState<{ [name: string]: number }>({});
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    variables: { category: [] },
    onCompleted: (data) => {
      const tmp = data.getCategoryInfo.reduce((initial: any, cur: any) => {
        let tmp_id: { [name: string]: number } = {};
        const ii = cur.tags.map((tag: any) => {
          tmp_id[tag.name] = +tag.id;
          return tag.name;
        });
        setTagId((b) => ({ ...b, ...tmp_id }));
        setHH((HH) => [...HH, ...ii]);
        initial[cur.category.name] = ii;
        return initial;
      }, {});
      setCategories(tmp);
    },
  });
  const auth_token = useAppSelector((state) => state.auth.authToken);

  const [create] = useMutation(CREATE_CATEGORIES, {
    context: {
      headers: {
        authorization: `Bearer ${auth_token}`, //토큰 넣어주기!
      },
    },
    onCompleted: (h) => {
      console.log("카테고리 성공?", h);
    },
    onError: (t) => {
      console.log("카테고리 생성 실패", t);
    },
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
    setOn(true);
  };

  const exitModal = () => {
    setOn(false);
  };

  const addCategory = (newName: string, tags: string[]) => {
    setCategories({ ...categories, [newName]: tags });
    const getId = tags.map((tag) => tagId[`${tag}`]);
    create({ variables: { name: newName, tags: getId } });
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
        <Modal
          on={on}
          exitModal={exitModal}
          addCategory={addCategory}
          tags={HH}
        ></Modal>
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
        <button onClick={createCategoryBtn}>Add Category</button>
      </Contents>
    </>
  );
};

export default Admin;

//todo things
/**
 * 1. 요청 Authorization header넣어서!
 * 2. 일단 stopPropagation말고 다른 방법으로 해야함.
 */
