export interface ITodoList {
  id: string;
  subject: string;
  isFinish: boolean;
  startedAt?: Date;
  finishedAt?: Date;
}

export type ITodoListEdit = Partial<ITodoList> & {
  id: string;
};
