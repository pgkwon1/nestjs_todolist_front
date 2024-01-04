import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { apiAddTodoList, getTodoList } from "@/api";
import { ITodoInput, ITodoList } from "@/dto/todolist/TodoList";
import { Listbox } from "@headlessui/react";

export default function Example() {
  const categoryList = [
    "업무",
    "개인",
    "가족",
    "공부",
    "여행",
    "건강",
    "친구",
    "취미",
    "자기 개발",
  ];
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [inputTodo, setInputTodo] = useState<ITodoInput>({
    subject: "",
    category: "업무",
  });
  useEffect(() => {
    getTodoList().then((result) => {
      setTodoList(result.data);
    });
  }, []);

  const deleteTodoList = (index: number) => {
    setTodoList((current) => current.filter((value, id) => id !== index));
  };

  const addTodoList = async () => {
    const { data, message } = await apiAddTodoList(inputTodo);
    if (message === "success") {
      setTodoList((current: ITodoList[]) => [
        {
          id: data,
          subject: inputTodo.subject,
          isFinish: false,
          category: inputTodo.category,
        },
        ...current,
      ]);
    }
  };
  const changeInputTodo = (data: string, attr: "category" | "subject") => {
    setInputTodo((current: ITodoInput) => {
      return {
        ...current,
        [attr]: data,
      };
    });
  };
  const selectCategory = (category: string) => {
    setInputTodo((current: ITodoInput) => {
      return {
        subject: current.subject,
        category,
      };
    });
  };
  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-1/2">
          <h2 className="text-center text-white text-3xl font-medium mt-4 mb-4">
            TODO LIST
          </h2>
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <Listbox
                value={inputTodo.category}
                onChange={(value) => changeInputTodo(value, "category")}
              >
                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  {inputTodo.category}
                </Listbox.Button>
                <Listbox.Options>
                  {categoryList.map((category, key) => {
                    return (
                      <Listbox.Option
                        key={key}
                        value={category}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                      >
                        {category}
                      </Listbox.Option>
                    );
                  })}
                </Listbox.Options>
              </Listbox>
            </div>
            <div className="mb-4">
              <input
                className="shadow-md rounded appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="new-task"
                type="text"
                placeholder="New Task"
                onChange={(e) =>
                  changeInputTodo(e.currentTarget.value, "subject")
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={addTodoList}
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
                  setTodoList={setTodoList}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
