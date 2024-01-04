export interface ITodoList {
  id: string;
  subject: string;
  isFinish: boolean;
  category: string;
  startedAt?: Date;
  finishedAt?: Date;
}

export interface ITodoInput {
  subject: string;
  category: string;
}

export type ITodoListEdit = Partial<ITodoList> & {
  id: string;
};
