import { createSlice } from "@reduxjs/toolkit";

import { AppState } from "../store";
import { HYDRATE } from "next-redux-wrapper";

export interface User {
  name: string;
  image: string;
  token: string;
}
export interface UserState {
    userState: Object,
}
const initialState: UserState = {
    userState: {
        name: '',
        image: '',
        token: '',
    }
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState(state, action) {
      state.userState = action.payload;
    },
  },

  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log("HYDRATE", action.payload);
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setUserState } = userSlice.actions;

export const selectUserState = (state: AppState) => state.user.userState;

export default userSlice.reducer;
