import { Fragment, useEffect, useState } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";
import TodoList from "@/components/TodoList";
import api from "@/modules/ApiInstance";

export default function Example() {
  const [todoList, setTodoList] = useState([]);
  useEffect(() => {
    api.get("/todolist/").then((result) => {
      setTodoList(result.data);
    });
  }, []);
  return (
    <div>
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Back End Developer
          </h2>
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <BriefcaseIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Full-time
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <MapPinIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Remote
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CurrencyDollarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              $120k &ndash; $140k
            </div>
            <div className="mt-2 flex items-center text-sm text-gray-500">
              <CalendarIcon
                className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                aria-hidden="true"
              />
              Closing on January 9, 2020
            </div>
          </div>
        </div>
      </div>
      <div className="w-75">
        <ul role="list" className="divide-y divide-gray-100">
          {todoList.map((todo, key) => {
            return <TodoList key={key} todo={todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}
