import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  change: false,
  isLoggedIn: false,
  userid: null,
  useremail: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    setdoc: (state, action) => {
      state.data = action.payload;
    },
    changeIndoc: (state) => {
      state.change = !state.change;
    },
    login: (state, action) => {
      state.isLoggedIn = true;
      state.userid = action.payload.id;
      state.useremail = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.userid = null;
      state.useremail = null;
    },
  },
});

export const { setdoc, changeIndoc, login, logout } = expenseSlice.actions;
export default expenseSlice.reducer;
