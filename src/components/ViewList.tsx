import React from "react";
import { useAppSelector } from "../data/store";

const ViewList = () => {
  const todos = useAppSelector((state) => state.todoApi.todos);
  return (
    <div className="rounded-md shadow border m-2 p-2">
      <p>ToDo List:</p>
      <table className="rounded-md">
        <thead>
          <tr className="bg-gradient-to-b from-sky-400 to-sky-600 text-white  ">
            <th className="p-2 border rounded">ID</th>
            <th className="p-2 border rounded">Title</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr className="even:bg-slate-50" key={todo.id}>
              <td className="p-2">{todo.id}</td>
              <td className="p-2">{todo.title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewList;
