import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { setLoginState } from "@/store/reducers/member.reducer";
import Cookies from "js-cookie";

export default function useLogout() {
  const dispatch = useDispatch();
  const router = useRouter();
  function doLogOut() {
    dispatch(
      setLoginState({
        isLogin: false,
        userId: "",
      })
    );
    Cookies.remove("tokens");
    router.push("/member/login");
  }

  return doLogOut;
}
