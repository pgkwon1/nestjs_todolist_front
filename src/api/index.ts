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
  console.log("response", result);

  return result;
};
