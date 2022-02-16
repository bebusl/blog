export const LOGIN = "LOGIN";
export const LOGOFF = "LOGOFF";

export const login = (userData: object, auth_token: String) => {
  return {
    type: LOGIN,
    userData,
    authToken: auth_token,
  };
};

export const logoff = () => {
  return {
    type: LOGOFF,
  };
};

//parameter type 주의!! 나중에 형태보고 다 바꿔줘야 함.
