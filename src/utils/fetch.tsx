import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type AuthorizationType = AxiosRequestHeaders & {
  headers: {
    authToken?: string;
    refreshToken?: string;
    authorization?: string;
  };
};

function init() {
  return axios.create({
    baseURL: "http://180.231.130.252:8000",
    withCredentials: true,
  });
}

export const client = init();

export function setToken(token: String, auth?: boolean, refresh?: boolean) {
  client.interceptors.request.use(
    (request: AxiosRequestConfig): AuthorizationType => {
      const copy_ = request as AuthorizationType;
      if (auth) {
        copy_.headers.authorization = `Bearer ${token}`;
        console.log("어쓰토큰 발행.");
      }
      if (refresh) {
        copy_.headers.refreshToken = `Bearer ${token}`;
        console.log("리프레시토큰 발행.");
      }

      return copy_;
    }
  );
  return client;
}
