import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

export const fetchTodo = createAsyncThunk("todo/fetch", async () => {
  const response = await fetch("http://localhost:9000/", {
    method: "GET",
  });
  const data = response.json();
  return data;
});

export const createTodo = createAsyncThunk("todo/add", async (title: string) => {
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
});

export const apiSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string }>) => {
      state.todos.push({
        id: state.todos.length,
        title: action.payload.title,
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
  },
});

export default apiSlice.reducer;
export const { addTodo } = apiSlice.actions;
