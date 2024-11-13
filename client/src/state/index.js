import { createSlice } from "@reduxjs/toolkit";

// initial state of the slice
const initialState = {
  mode: "dark",
  // userId: "",
  // token: null
};

//
export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
        state.user = action.payload.user; //user email
        state.id = action.payload.id; //user id
        state.token = action.payload.token; //user token

        // persist the user and token information in the browser so that it can hydrate on page refresh
        // the user object has to be in string format so that it can be stored the session
        sessionStorage.setItem("user", JSON.stringify(state.user));
        sessionStorage.setItem("id", state.id);
        sessionStorage.setItem("token", state.token);
        
      },
    setLogout: (state) => {
      state.user = null;
      state.id = null
      state.token = null;
      
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("id");
      sessionStorage.removeItem("token");
    },
  },
});


export const { setMode, setLogin, setLogout } = globalSlice.actions; // Export actions for use in components

export default globalSlice.reducer; // Export the reducer to be used in the Redux store