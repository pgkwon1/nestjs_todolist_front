import { apiDeleteTodo, apiEditTodo, apiFinishTodo } from "@/api";
import { ITodoList } from "@/dto/todolist/TodoList";
import { Switch } from "@headlessui/react";
import moment from "moment";
import { useCallback, useState } from "react";
import { useMutation } from "react-query";

export default function TodoList({
  index,
  todo,
  deleteTodoList,
  setTodoList,
}: {
  index: number;
  todo: ITodoList;
  deleteTodoList: (id: number) => void;
  setTodoList: (current: ITodoList[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.subject);
  const startedAt = moment(todo.startedAt).format("YYYY-MM-DD일 HH:mm분");
  const finishedAt = todo.isFinish
    ? moment(todo.finishedAt).format("YYYY-MM-DD일 HH:mm분")
    : "";

  const editMutation = useMutation(
    ["editTodo", todo.id],
    async () => await apiEditTodo({ id: todo.id, subject: editInput }),
    {
      onSuccess: (result) => {
        setEdit(false);
        if (result.message === "success") {
          todo.subject = editInput;
        }
      },
    }
  );

  const finishMutation = useMutation(
    ["finishTodo", todo.id],
    async () => await apiFinishTodo(todo.id, !todo.isFinish),
    {
      onSuccess: (result) => {
        if (result.message === "success") {
          const isFinish = !todo.isFinish;
          setTodoList((current: ITodoList[]) => {
            return current.map((data: ITodoList) => {
              return {
                ...data,
                ...(data.id === todo.id
                  ? { isFinish, finishedAt: result.data as Date }
                  : {}),
              };
            });
          });
        }
      },
    }
  );
  const deleteMutation = useMutation(
    "deleteTodoList",
    async () => await apiDeleteTodo(todo.id),
    {
      onSuccess: (result) => {
        if (result.message === "success") {
          deleteTodoList(index);
        }
      },
    }
  );

  const openPopup = () => {
    setOpen((current) => !current);
  };

  const openEdit = useCallback(() => {
    setEdit((current) => !current);
    setOpen(false);
  }, []);

  const getCategoryColor = useCallback((value: string) => {
    switch (value) {
      case "업무":
        return "bg-yellow-50 text-yellow-700 ring-yellow-700/10";
      case "개인":
        return "bg-blue-50 text-blue-700 ring-blue-700/10";
      case "가족":
        return "bg-indigo-50 text-indigo-700 ring-indigo-700/10";
      case "공부":
        return "bg-red-50 text-red-700 ring-red-700/10";
      case "여행":
        return "bg-green-50 text-green-700 ring-green-700/10";
      case "건강":
        return "bg-purple-50 text-purple-700 ring-purple-700/10";
      case "친구":
        return "bg-pink-50 text-pink-700 ring-pink-700/10 ";
      case "취미":
        return "bg-green-50 text-green-700 ring-green-700/10";
      case "자기 개발":
        return "bg-gray-50 text-gray-700 ring-gray-700/10";
    }
  }, []);
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-8 mb-8 shadow-2xl">
      <div className="mt-4 mb-4 font-normal relative">
        <span
          className={`${getCategoryColor(
            todo.category
          )} inline-flex items-center rounded-md px-6 py-2 text-xs font-medium`}
        >
          {todo.category}
        </span>

        <div className="absolute top-0 right-4">
          <button
            className="text-gray-500 focus:outline-none"
            onClick={openPopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
        <div
          className={`absolute ${
            open === false ? "hidden" : ""
          } right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-md`}
        >
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={openEdit}
          >
            수정
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={async () => await deleteMutation.mutate()}
          >
            삭제
          </button>
        </div>
      </div>
      {edit ? (
        <>
          <input
            className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button
            className="bg-gray-500 ml-4 mt-4 hover:bg-blue-700 font-bold text-white py-2 px-2 rounded-md"
            onClick={async () => await editMutation.mutate()}
          >
            완료
          </button>
        </>
      ) : (
        <h2 className="text-xl font-bold mb-2">{todo.subject}</h2>
      )}
      <div className="flex items-center mb-2">
        {todo.isFinish ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-blue-500"
          >
            <path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-red-500"
          >
            <path
              fillRule="evenodd"
              d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        )}
        <span className="text-base sm:text-sm text-sm">
          {todo.isFinish ? "완료됨" : "미완료"}
        </span>
      </div>
      <div>
        <span className="text-base sm:text-sm font-semibold">
          시작 일시: {startedAt}
        </span>
      </div>
      <div>
        <span className="text-base sm:text-sm font-semibold">
          완료 일시: {finishedAt}
        </span>
      </div>
      <div>
        <Switch
          checked={todo.isFinish}
          onChange={async () => await finishMutation.mutate()}
          className={`mt-4 ${
            todo.isFinish ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full`}
        >
          <span
            className={`${
              todo.isFinish ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
}
