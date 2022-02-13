export const LOGIN = "LOGIN";

export const login = (userData: object, auth_token: String) => {
  console.log("로그인 신호받았습니다");
  return {
    type: LOGIN,
    userData,
    authToken: auth_token,
  };
};

//parameter type 주의!! 나중에 형태보고 다 바꿔줘야 함.
