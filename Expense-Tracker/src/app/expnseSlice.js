import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: [],
    change : false,
    isLoggedIn : false,
    userid : "",
    useremail : ""
}

const expenseSlice = createSlice({
    name : "expense",
    initialState,
    reducers : {
        setdoc : (state,action) => {
            state.data = action.payload;
        },
        changeIndoc : (state) => {
            state.change = !state.change;
        },
        login : (state,action) => {
            state.isLoggedIn = true;
            state.userid = action.payload.id;
            state.useremail = action.payload.email;
        },
        logout : (state) => {
            state.isLoggedIn = false;
        }
    }
})

export const {setdoc,changeIndoc,login,logout} = expenseSlice.actions
export default expenseSlice.reducer;