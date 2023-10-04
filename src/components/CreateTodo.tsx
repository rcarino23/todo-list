import { useState } from "react";
import { addTodo } from "../api/apiSlice";
import { useAppDispatch } from "../data/store";

const CreateTodo = () => {
  const [title, setTitle] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addTodo({ title }));
    setTitle("");
  };

  return (
    <div>
      <h3>Create TODO:</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" id="titleTodo" placeholder="Create Todo here..." value={title} onChange={(e) => setTitle(e.target.value)} />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
