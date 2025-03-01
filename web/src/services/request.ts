import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://localhost:5140/api/";

// const BASE_URL = "https://localhost:7183/api/";

const instance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
  get: <T>(url: string) => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: Record<string, unknown>) =>
    instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: Record<string, unknown>) =>
    instance.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
};
