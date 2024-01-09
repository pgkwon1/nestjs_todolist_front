import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
  headers: {
    Authorization: `Bearer ${Cookies.get("tokens")}`,
  },
});

api.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});
export default api;
