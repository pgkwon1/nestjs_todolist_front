import { IRegisterDto } from "@/dto/Member";
import api from "@/modules/ApiInstance";

export const apiRegister = async ({
  userId,
  password,
  nickname,
}: IRegisterDto) => {
  const result = api.post("/member/register", {
    userId,
    password,
    nickname,
  });

  return result;
};
