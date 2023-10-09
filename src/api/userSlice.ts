/* eslint-disable @typescript-eslint/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  pass: string;
}

// Refactor : DONE
const initialState: User[] = [];

const LOCAL_STORAGE_KEY = "userData";

const saveUserDataInLocalStorage = (userData: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
};

// ADD USER
export const insertUser = createAsyncThunk(
  "user/add",
  async (username: string) => {
    const response = await fetch("http://localhost:9000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    const dataUser = await response.json();
    saveUserDataInLocalStorage(dataUser);
    return dataUser;
  }
);

// logInUSER
export const loginUser = createAsyncThunk(
  "user/login",
  async (username, pass) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await fetch("http://localhost:9000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          pass,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to log in");
      }
      const dataUser = await response.json();
      return dataUser;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (
      state,
      action: PayloadAction<{ username: string; pass: string }>
    ) => {
      state.push({
        id: state.length,
        username: action.payload.username,
        pass: action.payload.pass,
      });
    },
    loggedIn: (
      state,
      action: PayloadAction<{ username: string; pass: string }>
    ) => {
      // state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertUser.fulfilled, (state, action) => {
      state.push(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { createUser, loggedIn } = userSlice.actions;
