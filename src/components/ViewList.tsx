import { useAppDispatch, useAppSelector } from "../data/store";
import { deleteTodo, updateTodo } from "../api/apiSlice";

const ViewList = () => {
  const todos = useAppSelector((state) => state.todoApi);
  const dispatch = useAppDispatch();

  const handleDel = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleted = (id: number) => {
    dispatch(updateTodo({ id }));
  };

  return (
    <div>
      <p>ToDo List:</p>
      <table>
        <thead>
          <tr>
            {todos.length > 0 ? (
              <>
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
              <td>{todo.title}</td>
              <td>
                <button
                  onClick={() => {
                    handleDel(todo.id);
                  }}
                >
                  Del
                </button>
              </td>
              {!todo.isCompleted ? (
                <>
                  <td>
                    <button
                      onClick={() => {
                        handleCompleted(todo.id);
                      }}
                    >
                      Complete
                    </button>
                  </td>
                </>
              ) : (
                <td>
                  <p>Completed</p>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewList;
