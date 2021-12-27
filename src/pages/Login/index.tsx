import React from "react";
import useInput from "@hooks/useInput";

function idValidator(id: string) {
  if (id.includes("@")) {
    const [email, _] = id.split("@");
    if (email.length > 6 && email.length < 13) {
      return true;
    }
  } else return false;
}

function pwdValidator(password: string) {
  console.log(
    password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    )
  );
  if (
    password.match(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
    ) //정규식이 잘 안먹음. 이거 수정하기1!
  ) {
    return true;
  }
  return false;
}

const Login = () => {
  const [id, idEventHandler, setId] = useInput("", idValidator);
  const [password, passwordEventHandler, setPwd] = useInput("", idValidator);

  const onSubmit = (id: string, password: string) => {
    if (idValidator(id)) {
      console.log("검증완료 id : ", id);
    } else {
      console.log("검증 실패 id : ", id);
    }
    if (pwdValidator(password)) {
      console.log("검증완료 password : ", password);
    } else {
      console.log("검증실패 password : ", password);
    }
    setId("");
    setPwd("");
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(id, password);
      }}
    >
      <label htmlFor="id">이메일(아이디)</label>
      <input
        type="email"
        name="id"
        value={id}
        onChange={(e) => idEventHandler(e)}
      ></input>
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => passwordEventHandler(e)}
      ></input>
      <button type="submit">로그인</button>
    </form>
  );
};

export default Login;
