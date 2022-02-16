import React, { useRef } from "react";
import useInput from "@hooks/useInput";
import { useSelector, useDispatch } from "react-redux";
import setCookie from "src/utils/setCookie";
import { login } from "src/store/action";
import { useNavigate } from "react-router-dom";
import { client as axios } from "@utils/fetch";
function idValidator(id: string) {
  if (id.includes("@")) {
    const [email, _] = id.split("@");
    if (email.length > 0 && email.length < 13) {
      return true;
    }
  } else return false;
}

function pwdValidator(password: string) {
  // if (
  //   password.match(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/6840

  //   ) //정규식이 잘 안먹음. 이거 수정하기1!
  // ) {
  //   return true;
  // }
  // return false;
  return true;
}

const Login = () => {
  const [id, idEventHandler, setId] = useInput("", idValidator);
  const [password, passwordEventHandler, setPwd] = useInput("", idValidator);
  const navigate = useNavigate();
  const idRef = useRef<any>();
  const dispatch = useDispatch();
  const onSubmit = (id: string, password: string) => {
    if (idValidator(id)) {
      console.log("검증완료 id : ", id);
    } else {
      console.log("검증실패 id: ", id);
      //window.alert("id 양식이 맞지 않습니다.");
      setId("");
      setPwd("");
    }
    if (pwdValidator(password)) {
      console.log("검증완료 password : ", password);
      axios
        .post(
          "/user/login",
          {
            email: id,
            password: password,
          },
          { withCredentials: true }
        )
        .then((res) => {
          setCookie("refreshToken", res.data.refresh_token, 7);
          dispatch(login(res.data.user, res.data.auth_token));
          navigate("/");
        })
        .catch((e) => {
          console.log(e);
          //window.alert("로그인에 실패했습니다.");
          idRef.current.focus();
        });
      //navigate("/");
    } else {
      console.log("검증실패 password : ", password);
      //window.alert("password 양식이 맞지 않습니다.");
      setId("");
      setPwd("");
      idRef.current.focus();
    }
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
        type="text"
        name="id"
        value={id}
        onChange={(e) => idEventHandler(e)}
        ref={idRef}
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
