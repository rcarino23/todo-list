import { v4 as uuidv4 } from "uuid";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: number;
  title: string;
  userID: number;
  isCompleted: boolean;
}
interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

// DISPLAY ALL
// export const fetchTodo = createAsyncThunk("todo/fetch", async () => {
//   const response = await fetch("http://localhost:9000/", {
//     method: "GET",
//   });
//   const data = response.json();
//   return data;
// });

function saveStateToLocalStorage(state: TodoState) {
  localStorage.setItem("todoData", JSON.stringify(state));
}

// DISPLAY TODO LIST BY USER
export const fetchUserTodos = createAsyncThunk("todo/fetchUserTodos", async (userId: number) => {
  const response = await fetch(`http://localhost:9000/users/${userId}/todos`, {
    method: "GET",
    headers: {},
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
export const delTodo = createAsyncThunk("todo/delete", async (id: number) => {
  const response = await fetch(`http://localhost:9000/todos/${id}`, {
    method: "DELETE",
  });
  const data = await response.json();
  return data;
});

// Complete TODO LIST/ UPDATE
export const completeTodo = createAsyncThunk("todo/update", async (id: number) => {
  const response = await fetch(`http://localhost:9000/todos/${id}`, {
    method: "PUT", // Use "PUT" to update an existing resource
    body: JSON.stringify({ isCompleted: true }), // Send updated data
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
});

export const apiSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<{ title: string; userID: number; isCompleted: boolean }>) => {
      const uniqueId = uuidv4();
      state.todos.push({
        id: uniqueId,
        title: action.payload.title,
        userID: action.payload.userID,
        isCompleted: action.payload.isCompleted,
      });
      saveStateToLocalStorage(state);
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      saveStateToLocalStorage(state);
    },
    updateTodo: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const updatedTodo = state.todos.find((todo) => todo.id === id);
      if (updatedTodo) {
        updatedTodo.isCompleted = true;
      }
      saveStateToLocalStorage(state);
    },
  },

  extraReducers: (builder) => {
    // builder.addCase(fetchTodo.fulfilled, (state, action) => {
    //   state.todos = action.payload;
    // });

    builder.addCase(fetchUserTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
    });

    builder.addCase(delTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    });

    builder.addCase(createTodo.fulfilled, (state, action) => {
      state.todos.push(action.payload);
    });
    builder.addCase(completeTodo.fulfilled, (state, action) => {
      const updatedTodo = state.todos.find((todo) => todo.id === action.payload.id);
      if (updatedTodo) {
        updatedTodo.isCompleted = true;
      }
    });
  },
});

export default apiSlice.reducer;
export const { addTodo, deleteTodo, updateTodo } = apiSlice.actions;
