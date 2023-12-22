export default function TodoList({ todo }) {
  return (
    <li className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">
            {todo.subject}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500"></p>
        </div>
      </div>
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-gray-900">{todo.role}</p>
        {todo.isFinish === false ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">
            시작 : {todo.startedAt} {todo.isFinish}
          </p>
        ) : (
          <div className="mt-1 flex items-center gap-x-1.5">
            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
            <p className="text-xs leading-5 text-gray-500">완료</p>
          </div>
        )}
      </div>
    </li>
  );
}
