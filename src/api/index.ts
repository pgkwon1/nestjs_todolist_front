import { ITodoListEdit } from "@/dto/todolist/TodoList";
import api from "@/modules/ApiInstance";

export const getTodoList = async () => {
  const result = await api.get("/todolist/");
  return result;
};

export const apiAddTodoList = async ({
  subject,
  category,
}: {
  subject: string;
  category: string;
}) => {
  const startedAt = new Date();
  const result = await api.post("/todolist/add", {
    subject,
    category,
    startedAt,
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
