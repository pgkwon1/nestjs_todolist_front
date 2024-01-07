import { setLoginState } from "@/store/reducers/member.reducer";
import axios, { AxiosResponse } from "axios";
import { useDispatch } from "react-redux";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASEURL,
});
api.interceptors.response.use((response: AxiosResponse) => {
  const dispatch = useDispatch();
  if (
    response.data.statusCode === 401 &&
    response.data.message === "Unauthorized"
  ) {
    dispatch(
      setLoginState({
        isLogin: false,
        userId: "",
      })
    );
  }
  return response.data;
});
export default api;
