import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  userID: number;
  isCompleted: boolean;
}

const initialState: Todo[] = [];

function saveStateToLocalStorage(state: Todo[]) {
  localStorage.setItem("todoData", JSON.stringify(state));
}

// DISPLAY TODO LIST BY USER
export const fetchUserTodos = createAsyncThunk(
  "todo/fetchUserTodos",
  async (userId: number) => {
    const response = await fetch(
      `http://localhost:9000/users/${userId}/todos`,
      {
        method: "GET",
        headers: {},
      }
    );
    const data = await response.json();
    return data;
  }
);

// CREATE TODO LIST
export const createTodo = createAsyncThunk(
  "todo/add",
  async (title: string) => {
    const response = await fetch("http://localhost:9000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
      }),
    });
    const data = await response.json();
    return data;
  }
);

// DELETE TODO LIST
export const delTodo = createAsyncThunk("todo/delete", async (id: number) => {
  const response = await fetch(`http://localhost:9000/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
});

// Complete TODO LIST/ UPDATE
export const completeTodo = createAsyncThunk(
  "todo/update",
  async (id: number) => {
    const response = await fetch(`http://localhost:9000/todos/${id}`, {
      method: "PUT",
      body: JSON.stringify({ isCompleted: true }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  }
);

// refactor action type/interface : DONE
export const apiSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<Pick<Todo, "title" | "userID" | "isCompleted">>
    ) => {
      const uniqueId = uuidv4();
      const idNumber = parseInt(uniqueId.replace(/-/g, ""), 16);
      state.push({
        id: idNumber,
        ...action.payload,
      });
      saveStateToLocalStorage(state);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state = state.filter((todo) => todo.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    updateTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const updatedTodo = state.find((todo) => todo.id === id);
      if (updatedTodo) {
        updatedTodo.isCompleted = true;
      }
      saveStateToLocalStorage(state);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserTodos.fulfilled, (state, action) => {
      state = action.payload;
    });
    builder.addCase(delTodo.fulfilled, (state, action) => {
      state = state.filter((todo) => todo.id !== action.payload.id);
    });
    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      const updatedTodo = state.find((todo) => todo.id === action.payload.id);
      if (updatedTodo) {
        updatedTodo.isCompleted = true;
      }
    });
  },
});

export default apiSlice.reducer;
export const { addTodo, deleteTodo, updateTodo } = apiSlice.actions;
