import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  validateStatus: (status) => {
    if (status === 401) {
      Promise.reject(status);
      return false;
    }
    return true;
  },
});
api.interceptors.request.use((request) => {
  const token = Cookies.get("tokens");
  if (!token) {
    Promise.reject(401);
  }
  request.headers.Authorization = `Bearer ${token}`;

  return request;
});
api.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});
export default api;
