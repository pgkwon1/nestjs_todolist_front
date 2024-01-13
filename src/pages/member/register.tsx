import { apiRegister } from "@/api/member/register";
import { IRegisterDto } from "@/dto/Member";
import { setLoginState } from "@/store/reducers/member.reducer";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";

export default function Login() {
  const router = useRouter();
  const [registerData, setRegisterData] = useState<IRegisterDto>({
    userId: "",
    password: "",
    nickname: "",
  });
  const loginMutation = useMutation(
    "login",
    async () => {
      const { userId, password, nickname } = registerData;
      await apiRegister({
        userId,
        password,
        nickname,
      });
    },
    {
      onSuccess: (result) => {
        if (result.data === true) {
          router.push("/login");
        }
      },
    }
  );
  const setRegisterInfo = (
    attr: "userId" | "password" | "nickname",
    data: string
  ) => {
    setRegisterData((current) => {
      return {
        ...current,
        [attr]: data,
      };
    });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-2xl text-white font-bold mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            회원가입
          </h2>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md mt-8 mb-8 shadow-2xl sm:mx-auto sm:w-full sm:max-w-sm mt-4">
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
                onChange={(e) =>
                  setRegisterInfo("userId", e.currentTarget.value)
                }
              />
            </div>
          </div>

          <div className="mt-4">
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
                  setRegisterInfo("password", e.currentTarget.value)
                }
              />
            </div>
          </div>
          <div className="mt-4 mb-4">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                닉네임
              </label>
            </div>
            <div className="mt-2 mb-2">
              <input
                id="nickname"
                name="nickname"
                type="text"
                autoComplete="current-nickname"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-00 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) =>
                  setRegisterInfo("nickname", e.currentTarget.value)
                }
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={async () => await loginMutation.mutate()}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
