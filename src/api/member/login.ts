import api from "@/modules/ApiInstance";
import Cookies from "js-cookie";

export const apiLogin = async ({ userId, password }) => {
  const result = await api.post(`/member/login`, {
    userId,
    password,
  });
  if (result.data && result.message === "success") {
    const token = result.data;
    Cookies.set("tokens", token, { expires: 1 });
    return true;
  }

  return false;
};
