import { useEffect, useState } from "react";
import TodoList from "@/components/TodoList";
import { apiAddTodoList, getTodoList } from "@/api";
import { ITodoInput, ITodoList } from "@/dto/todolist/TodoList";
import { Listbox } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";

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
  const queryClient = useQueryClient();

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [todoList, setTodoList] = useState<ITodoList[]>([]);
  const [inputTodo, setInputTodo] = useState<ITodoInput>({
    subject: "",
    category: "업무",
    startedAt: "",
  });

  const { data, isSuccess, refetch } = useQuery(
    ["getTodoList", date],
    async () => await getTodoList(date),
    {
      staleTime: 120000,
      cacheTime: 120000,

      onSuccess: (result) => {
        const { data } = result;
        if (data && data.length > 0) {
          setTodoList(data);
        }
      },
    }
  );

  const addMutation = useMutation(
    "addTodoList",
    async () => {
      inputTodo.startedAt = date;
      await apiAddTodoList(inputTodo);
    },
    {
      onSuccess: (result) => {
        const { data, message } = result;
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
      },
    }
  );

  const deleteTodoList = (index: number) => {
    setTodoList((current) => current.filter((value, id) => id !== index));
  };

  const changeInputTodo = (data: string, attr: "category" | "subject") => {
    setInputTodo((current: ITodoInput) => {
      return {
        ...current,
        [attr]: data,
      };
    });
  };

  useEffect(() => {
    refetch().then(({ isSuccess, data }) => {
      const list = data?.data;
      if (isSuccess && list.length > 0) {
        setTodoList(list);
      } else {
        setTodoList([]);
      }
    });
  }, [date]);
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
                onClick={async () => await addMutation.mutate()}
              >
                Add Task
              </button>
            </div>
          </div>

          <div className="flex items-center justify-center w-100 mt-6 mb-4 text-3xl text-white font-normal">
            <button
              onClick={() =>
                setDate((current) =>
                  moment(current).subtract(1, "d").format("YYYY-MM-DD")
                )
              }
            >
              <svg
                className="h-8 w-8 text-white mr-4"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                {" "}
                <path stroke="none" d="M0 0h24v24H0z" />{" "}
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            {moment(date).format("YYYY년 M월 D일")}
            <button
              onClick={() =>
                setDate((current) =>
                  moment(current).add(1, "d").format("YYYY-MM-DD")
                )
              }
            >
              <svg
                className="h-8 w-8 text-white ml-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
            <button onClick={() => setCalendarOpen(!calendarOpen)}>
              <svg
                className="ml-2 h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />{" "}
                <line x1="16" y1="2" x2="16" y2="6" />{" "}
                <line x1="8" y1="2" x2="8" y2="6" />{" "}
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
          </div>
          <div className="flex items-cneter">
            {calendarOpen ? (
              <Calendar
                onChange={(value: any) =>
                  setDate(moment(value).format("YYYY-MM-DD"))
                }
                defaultValue={date}
                formatDay={(locale, date) => moment(date).format("DD")}
              />
            ) : (
              ""
            )}
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
