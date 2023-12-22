import axios, { AxiosResponse } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});
api.interceptors.response.use((response: AxiosResponse) => {
  return response.data;
});
export default api;
