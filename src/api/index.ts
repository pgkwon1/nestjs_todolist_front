import api from "@/modules/ApiInstance";

export const getTodoList = async () => {
  const result = await api.get("/todolist/");
  return result;
};

export const addTodoList = async (subject: string) => {
  const startedAt = new Date();
  const result = await api.post("/todolist/add", {
    subject,
    startedAt,
  });

  return result;
};

export const finishTodo = async (id: string) => {
  const finishedAt = new Date();
  const result = await api.patch(`/todolist/update/${id}`, {
    id,
    isFinish: true,
    finishedAt,
  });
  return result;
};
