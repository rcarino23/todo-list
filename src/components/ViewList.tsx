import { useAppSelector } from "../data/store";

const ViewList = () => {
  const todos = useAppSelector((state) => state.todoApi.todos);
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewList;
