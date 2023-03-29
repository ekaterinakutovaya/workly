import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants/constants";
import { db } from "../constants/db";

export const fetchUsers = createAsyncThunk(
    "users/fetchUsers",
    async () => {
        // const response = await fetch(API_URL + `/users`);
        // const data = await response.json();
        // return data;

        return db.users;
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        loading: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
        });
    }
})

export const { reducer } = usersSlice;
export default reducer;