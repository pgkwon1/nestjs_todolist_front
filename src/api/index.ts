import { ITodoInput, ITodoListEdit } from "@/dto/todolist/TodoList";
import api from "@/modules/ApiInstance";

export const getTodoList = async (date: string) => {
  const result = await api.get(`/todolist/${date}`);
  return result;
};

export const apiAddTodoList = async ({
  subject,
  category,
  startedAt,
}: ITodoInput) => {
  const result = await api.post("/todolist/add", {
    subject,
    category,
    startedAt: new Date(startedAt),
  });

  return result;
};

export const apiFinishTodo = async (id: string, isFinish: boolean) => {
  const finishedAt = new Date();
  const result = await api.patch(`/todolist/update/${id}`, {
    id,
    isFinish,
    finishedAt,
  });
  result.data = finishedAt;
  return result;
};

export const apiEditTodo = async ({ id, subject }: ITodoListEdit) => {
  const result = await api.patch(`/todolist/update/${id}`, {
    id,
    subject,
  });

  return result;
};

export const apiDeleteTodo = async (id: string) => {
  const result = await api.delete(`/todolist/delete/${id}`);
  return result;
};
