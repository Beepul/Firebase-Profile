import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {},
  isLoggedin: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login:(state,action) => {
        state.isLoggedin = true;
        state.user = action.payload
    },
    logout:(state) => {
        state.isLoggedin = false;
        state.user = {}
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer