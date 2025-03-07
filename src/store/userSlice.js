import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authenticatedUser: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "authenticatedUser",
  initialState,
  reducers: {
    setAuthenticatedUser: (state, action) => {
      state.authenticatedUser = action.payload;
      state.isAuthenticated = true;
    },
    logoutAuthenticatedUser: (state) => {
      state.authenticatedUser = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuthenticatedUser, logoutAuthenticatedUser } = userSlice.actions;

export default userSlice.reducer;
