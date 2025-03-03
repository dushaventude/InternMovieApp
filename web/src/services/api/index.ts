import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../../store";

export const instance = axios.create({
  //   baseURL: `${process.env.VITE_BASE_URL}`
  baseURL: `https://localhost:7183/api`
  // baseURL: `http://localhost:5140/api`,
});

instance.interceptors.request.use(
  (config) => {
    const { getState } = store;
    const { user } = getState();
    const { token } = user;
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json";

    if (token && token !== "") {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  () => {
    console.log("error");
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: {}, config?: AxiosRequestConfig) =>
    instance.post<T>(url, body, config).then(responseBody),
  put: <T>(url: string, body: {}) =>
    instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
};
