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
    return dataUser;
});

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        createUser: (state, action: PayloadAction<{ username: string, pass: string }>) => {
            state.user.push({
                id: state.user.length,
                username: action.payload.username,
                pass: action.payload.pass
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(insertUser.fulfilled, (state, action) => {
            state.user.push(action.payload);
        });
    },
});

export default userSlice.reducer;
export const { createUser } = userSlice.actions;

