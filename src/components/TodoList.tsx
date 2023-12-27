export default function TodoList({ todo }) {
  return (
    <li className="border-b border-gray-200 mb-2 p-2 bg-white rounded">
      <div className="flex justify-between">
        <span className="text-gray-800">{todo.subject}</span>
        <button className="text-red-500 hover:text-red-700" type="button">
          Remove
        </button>
      </div>
    </li>
  );
}
