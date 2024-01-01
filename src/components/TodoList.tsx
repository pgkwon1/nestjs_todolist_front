import { apiDeleteTodo, apiEditTodo, apiFinishTodo } from "@/api";
import { ITodoList } from "@/dto/todolist/TodoList";
import moment from "moment";
import { useCallback, useState } from "react";

export default function TodoList({
  index,
  todo,
  deleteTodoList,
}: {
  index: number;
  todo: ITodoList;
  deleteTodoList: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editInput, setEditInput] = useState(todo.subject);
  const startedAt = moment(todo.startedAt).format("YYYY-MM-DD일 HH:mm분");
  const finishedAt = todo.isFinish
    ? moment(todo.finishedAt).format("YYYY-MM-DD일 HH:mm분")
    : "";

  const openPopup = () => {
    setOpen((current) => !current);
  };

  const openEdit = useCallback(() => {
    setEdit((current) => !current);
    setOpen(false);
  }, []);

  const editTodo = async () => {
    const result = await apiEditTodo({ id: todo.id, subject: editInput });

    setEdit(false);
    if (result.message === "success") {
      todo.subject = editInput;
    }
  };

  const deleteTodo = async () => {
    const result = await apiDeleteTodo(todo.id);
    if (result.message === "success") {
      deleteTodoList(index);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mt-4 mb-4 relative">
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
          onClick={deleteTodo}
        >
          삭제
        </button>
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
            onClick={editTodo}
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
        {todo.isFinish ? (
          ""
        ) : (
          <button
            className="bg-blue-500 mt-4 hover:bg-blue-700 font-bold text-white py-2 px-4 rounded-md"
            onClick={() => apiFinishTodo(todo.id)}
          >
            완료
          </button>
        )}
      </div>
    </div>
  );
}
