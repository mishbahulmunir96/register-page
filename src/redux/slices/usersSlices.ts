import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";

// Define a type for the slice state
export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UsersState {
  users: User[];
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  const response = await axios.get<User[]>("http://localhost:8000/users");
  return response.data;
});

export const usersSlice = createSlice({
  name: "users",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setUser: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
  },
});

export const selectUsersCount = (state: RootState) => state.users.users.length;
export const { addUser, setUser, removeUser } = usersSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUsers = (state: RootState) => state.users.users;

export default usersSlice.reducer;
