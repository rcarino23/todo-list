import { useAppDispatch, useAppSelector } from "../data/store";
import { deleteTodo } from "../api/apiSlice";

const ViewList = () => {
  const todos = useAppSelector((state) => state.todoApi.todos);
  const dispatch = useAppDispatch();

  const handleDel = (id: number) => {
    dispatch(deleteTodo(id));
  };
  return (
    <div>
      <p>ToDo List:</p>
      <table>
        <thead>
          <tr>
            {todos.length > 0 ? (
              <>
                <th>ID</th>
                <th>Title</th>
                <th>Action</th>
              </>
            ) : (
              <th>No Todos</th>
            )}
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>
                <button onClick={()=>{handleDel(todo.id)}}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewList;
