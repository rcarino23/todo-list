import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  userID: number
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

// DISPLAY ALL
export const fetchTodo = createAsyncThunk("todo/fetch", async () => {
  const response = await fetch("http://localhost:9000/", {
    method: "GET",
  });
  const data = response.json();
  return data;
});

// DISPLAY TODO LIST BY USER
export const fetchUserTodos = createAsyncThunk("todo/fetchUserTodos", async (userId: string) => {
  const response = await fetch(`http://localhost:9000/users/${userId}/todos`, {
    method: "GET",
    headers: {
    },
  });
  const data = await response.json();
  return data;
});

// CREATE TODO LIST
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

// DELETE TODO LIST
export const delTodo = createAsyncThunk(
  'todo/delete',
  async (id: number) => {
    const response = await fetch(`http://localhost:9000/todos/${id}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    return data;
  }
);

export const apiSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string, userID: number }>) => {
      state.todos.push({
        id: state.todos.length,
        title: action.payload.title,
        userID: action.payload.userID,
      });

    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodo.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(fetchUserTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(delTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
  },
});

export default apiSlice.reducer;
export const { addTodo, deleteTodo } = apiSlice.actions;
