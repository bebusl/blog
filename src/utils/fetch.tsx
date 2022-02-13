import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type AuthorizationType = AxiosRequestHeaders & {
  headers: { authToken?: string; refreshToken?: string };
};

function init() {
  return axios.create({
    baseURL: "https://cold-cougar-89.loca.lt",
    withCredentials: true,
  });
}

export const client = init();

export function setToken(token: string, auth?: boolean, refresh?: boolean) {
  client.interceptors.request.use(
    (request: AxiosRequestConfig): AuthorizationType => {
      const copy_ = request as AuthorizationType;
      if (auth) {
        copy_.headers.authToken = `Bearer ${token}`;
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
