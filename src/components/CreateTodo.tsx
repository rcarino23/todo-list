import { useState, useEffect } from "react";
import { addTodo } from "../api/apiSlice";
import { useAppDispatch } from "../data/store";
import ViewList from "./ViewList";

const CreateTodo = () => {
  const [userID, setUserID] = useState<number>(0);
  const [username, setUsername] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [disable, setDisable] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  const userDataString = localStorage.getItem("userData");
  useEffect(() => {
    if (userDataString !== null) {
      const userDataArray = JSON.parse(userDataString);
      if (Array.isArray(userDataArray) && userDataArray.length > 0) {
        setUsername(userDataArray[0].username);
        setUserID(userDataArray[0].id);
        setDisable(false);
      }
    }
  }, [userDataString]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (title == "") {
      console.log("Put title first");
      return;
    }
    const isCompleted: boolean = false;
    dispatch(addTodo({ title, userID, isCompleted }));
    setTitle("");
  };
  return (
    <>
      {!disable ? (
        <>
          <div>
            <a href="/Login">Logout</a>
            <h3>{username}</h3>
            <h3>Create TODO:</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" id="titleTodo" placeholder="Create Todo here..." value={title} onChange={(e) => setTitle(e.target.value)} />
              <button type="submit">Add</button>
            </form>
            <ViewList />
          </div>
        </>
      ) : (
        <a href="/Login">Login</a>
      )}
    </>
  );
};

export default CreateTodo;
