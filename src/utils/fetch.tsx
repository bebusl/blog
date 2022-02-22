import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

type AuthorizationType = AxiosRequestHeaders & {
  headers: {
    authToken?: string | null;
    refreshToken?: string | null;
    authorization?: string | null;
  };
};

function init() {
  return axios.create({
    baseURL: "http://180.231.130.252:8000",
    withCredentials: true,
  });
}

export const client = init();

export function setToken(
  token: String | null,
  auth?: boolean,
  refresh?: boolean
) {
  client.interceptors.request.use(
    (request: AxiosRequestConfig): AuthorizationType => {
      const copy_ = request as AuthorizationType;
      if (auth) {
        copy_.headers.authorization = token === null ? null : `Bearer ${token}`;
      }
      if (refresh) {
        copy_.headers.refreshToken = token === null ? null : `Bearer ${token}`;
      }

      return copy_;
    }
  );
  return client;
}
