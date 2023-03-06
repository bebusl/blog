import React, { FormEventHandler, useRef, useState } from "react";
import { login } from "src/store/authReducer";
import { useNavigate } from "react-router-dom";
import { validator } from "src/utils/validator";
import { useAppDispatch } from "src/store/hooks";
import styled from "styled-components";

function emailValidator(email: string) {
  return validator({ type: "email", value: email });
}

function pwdValidator(password: string) {
  return validator({ type: "password", value: password });
}

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPwd] = useState("");
  const idRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const clearInput = () => {
    setId("");
    setPwd("");
  };

  const onSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (!emailValidator(id) || !pwdValidator(password)) {
      clearInput();
      idRef.current?.focus();
    }
    try {
      await dispatch(login({ email: id, password })).unwrap();
      navigate(-1);
    } catch (rejectedValueOrSerializedError) {
      clearInput();
      idRef.current?.focus();
    }
  };

  return (
    <LoginBox>
      <h1>로그인</h1>
      <form onSubmit={onSubmit} style={{ margin: "auto" }}>
        <label htmlFor="id">이메일(아이디)</label>
        <input
          type="text"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
          ref={idRef}
          autoFocus
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPwd(e.target.value)}
        />
        <button type="submit">로그인</button>
      </form>
    </LoginBox>
  );
};

const LoginBox = styled.div`
  border: 1px solid #ededed;
  border-radius: 5px;
  text-align: center;
`;
export default Login;
