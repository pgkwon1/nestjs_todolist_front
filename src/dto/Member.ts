export interface ILoginDto {
  userId: string;
  password: string;
}

export type IRegisterDto = ILoginDto & {
  nickname: string;
};
