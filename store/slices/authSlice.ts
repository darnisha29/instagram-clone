import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: { email: string ,userId: string} | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ email: string,userId: string }>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    }
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;



// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AuthState {
//   user: { email: string, userId: string } | null;
//   isLoggedIn: boolean;
//   userId: string | null;
// }

// const initialState: AuthState = {
//   user: null,
//   isLoggedIn: false,
//   userId: null, 
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setUser: (state, action: PayloadAction<{ email: string, userId: string }>) => {
//       state.user = action.payload;
//       state.isLoggedIn = true;
//       state.userId = action.payload.userId; 
//     },
//     setUserId: (state, action: PayloadAction<string>) => {
//         state.userId = action.payload;
//       },
//     logout: (state) => {
//       state.user = null;
//       state.isLoggedIn = false;
//       state.userId = null; 
//     },
//   },
// });

// export const { setUser, setUserId, logout } = authSlice.actions;
// export default authSlice.reducer;
