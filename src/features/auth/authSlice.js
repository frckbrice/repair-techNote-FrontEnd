import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: 'auth',
  initialState: {token: null},
  reducers: {
    setCredentials: (state, action) => {
      const {accessToken} = action.payload;
      state.token = accessToken;
    },
    logout: (state, action) => {
      state.token = null;
    }
  }
});
// we export actions for the authenthentication
export const {setCredentials, logout} = authSlice.actions;
// we export authSlice.reducer to store it in store central state file
export default authSlice.reducer;
// we export the state to render it when needed in the project
export const selectCurrentToken = (state) => state.auth.token; 