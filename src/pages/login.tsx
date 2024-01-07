import { apiLogin } from "@/api/login";
import { setLoginState } from "@/store/reducers/member.reducer";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  const setLoginInfo = (attr, data) => {
    setLoginData((current) => {
      return {
        ...current,
        [attr]: data,
      };
    });
  };

  const login = async () => {
    const { userId, password } = loginData;
    const result = await apiLogin({ userId, password });

    if (result) {
      dispatch(
        setLoginState({
          isLogin: true,
          userId: loginData.userId,
        })
      );
      router.push("/");
    }
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-xl text-white font-bold mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            로그인 해주세요.
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-8 mb-8 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              아이디
            </label>
            <div className="mt-2">
              <input
                id="userId"
                name="userId"
                type="text"
                autoComplete="text"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => setLoginInfo("userId", e.currentTarget.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                비밀번호
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-00 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setLoginInfo("password", e.currentTarget.value)
                }
              />
            </div>
          </div>

          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={login}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
