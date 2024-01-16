import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});
api.interceptors.request.use((request) => {
  const { headers } = request;
  const token = Cookies.get("tokens");
  if (!token) {
    window.history.replaceState({}, "", "/member/logout");
  }

  return request;
});
api.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});
export default api;
