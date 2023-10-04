import { useState } from "react";
import { addTodo } from "../api/apiSlice";
import { useAppDispatch } from "../data/store";

const CreateTodo = () => {
  const [title, setTitle] = useState<string>(""); // Use state to manage the input value
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    dispatch(addTodo({ title }));
    // Clear the input field
    setTitle("");
  };

  return (
    <div>
      <h3>Create TODO:</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="titleTodo"
          value={title}
          onChange={(e) => setTitle(e.target.value)} // Update the state when the input changes
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default CreateTodo;
