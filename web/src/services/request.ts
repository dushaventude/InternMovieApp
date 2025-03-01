
// import axios, { AxiosResponse } from "axios";

// const BASE_URL = "http://localhost:5140/api/";

// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// export const request = {
//   get: <T>(url: string) => instance.get<T>(url).then(responseBody),
//   post: <T>(url: string, body: Record<string, unknown>) =>
//     instance.post<T>(url, body).then(responseBody),
//   put: <T>(url: string, body: Record<string, unknown>) =>
//     instance.put<T>(url, body).then(responseBody),
//   delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
// };


// import axios, { AxiosResponse } from "axios";
// const BASE_URL = "https://localhost:7183/api/";
// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });


// // instance.interceptors.request.use(
// //   (config) => {
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );
// // instance.interceptors.response.use(
// //   (response) => {
// //     return response.data;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;
// export const request = {
//   get: <T>(url: string) => instance.get<T>(url).then(responseBody),
//   post: <T>(url: string, body: Record<string, unknown>) =>
//     instance.post<T>(url, body).then(responseBody),
//   put: <T>(url: string, body: Record<string, unknown>) =>
//     instance.put<T>(url, body).then(responseBody),
// };
// const instance = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

// const responseBody = <T>(response: AxiosResponse<T>) => response.data;

// export const request = {
//   get: <T>(url: string) => instance.get<T>(url).then(responseBody),
//   post: <T>(url: string, body: Record<string, unknown>) =>
//     instance.post<T>(url, body).then(responseBody),
//   put: <T>(url: string, body: Record<string, unknown>) =>
//     instance.put<T>(url, body).then(responseBody),
//   delete: <T>(url: string) => instance.delete<T>(url).then(responseBody),
// };

