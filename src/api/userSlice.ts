import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  username: string;
  pass: string;
}

interface UserState {
  user: User[];
}

const initialState: UserState = {
  user: [],
};

const LOCAL_STORAGE_KEY = "userData";

const saveUserDataInLocalStorage = (userData: String) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
};

// ADD USER
export const insertUser = createAsyncThunk("user/add", async (username: string) => {
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
});

// logInUSER
export const loginUser = createAsyncThunk("user/login", async (username, pass) => {
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
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<{ username: string; pass: string }>) => {
      state.user.push({
        id: state.user.length,
        username: action.payload.username,
        pass: action.payload.pass,
      });
    },
    loggedIn: (state, action: PayloadAction<{ username: string; pass: string }>) => {
      // state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(insertUser.fulfilled, (state, action) => {
      state.user.push(action.payload);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { createUser, loggedIn } = userSlice.actions;
