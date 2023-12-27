import api from "@/modules/ApiInstance";

export const getTodoList = async () => {
  const result = await api.get("/todolist/");
  return result.data;
};
