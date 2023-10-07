import { useAppDispatch, useAppSelector } from "../data/store";
import { deleteTodo, updateTodo } from "../api/apiSlice";
// import { useEffect, useState } from "react";

const ViewList = () => {
  // const [userID, setUserID] = useState<number>(0);
  const todos = useAppSelector((state) => state.todoApi.todos);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const userDataString = localStorage.getItem("userData");
  //   if (userDataString !== null) {
  //     const userDataArray = JSON.parse(userDataString);
  //     if (Array.isArray(userDataArray) && userDataArray.length > 0) {
  //       setUserID(userDataArray[0].id);
  //     }
  //   }
  // }, []);

  const handleDel = (id: number) => {
    dispatch(deleteTodo(id));
  };

  const handleCompleted = (id: number) => {
    dispatch(updateTodo({ id }));
  };

  // useEffect(() => {
  //   if (userID !== null) {
  //     dispatch(fetchUserTodos(userID));
  //   }
  // }, [dispatch, userID]);

  return (
    <div>
      <p>ToDo List:</p>
      <table>
        <thead>
          <tr>
            {todos.length > 0 ? (
              <>
                {/* <th>ID</th> */}
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
              {/* <td>{todo.userID}</td> */}
              <td>{todo.title}</td>
              <td>
                <button
                  onClick={() => {
                    handleDel(todo.id);
                  }}>
                  Del
                </button>
              </td>
              {!todo.isCompleted ? (
                <>
                  <td>
                    <button
                      onClick={() => {
                        handleCompleted(todo.id);
                      }}>
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
