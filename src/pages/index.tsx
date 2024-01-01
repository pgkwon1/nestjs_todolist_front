import { Fragment, useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import TodoList from "@/components/TodoList";
import { addTodoList, getTodoList } from "@/api";
import { ITodoList } from "@/dto/todolist/TodoList";

export default function Example() {
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [inputTodo, setInputTodo] = useState("");
  useEffect(() => {
    getTodoList().then((result) => {
      setTodoList(result.data);
    });
  }, []);

  const deleteTodoList = (index: number) => {
    setTodoList((current) => current.filter((value, id) => id !== index));
  };
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-1/2">
          <h2 className="text-center text-3xl mb-4">Todo List</h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="new-task"
                type="text"
                placeholder="New Task"
                onChange={(e) => setInputTodo(e.currentTarget.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={async () => {
                  const result = await addTodoList(inputTodo);
                  if (result.message === "success") {
                    setTodoList((current: ITodoList[]) => [
                      { subject: inputTodo, isFinish: false },
                      ...current,
                    ]);
                  }
                }}
              >
                Add Task
              </button>
            </div>
          </div>
          <ul className="list-none">
            {todoList.map((todo, key) => {
              return (
                <TodoList
                  index={key}
                  key={key}
                  todo={todo}
                  deleteTodoList={deleteTodoList}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
