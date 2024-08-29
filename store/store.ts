// import { configureStore } from "@reduxjs/toolkit";
// import { useDispatch } from "react-redux";
// import authReducer from "./slices/authSlice";
// import postReducer from "./slices/postSlice";
// import apolloClient from "@/lib/apollo";
// // import authReducer from "../features/authSlice";



// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     posts:postReducer
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {
//         extraArgument: apolloClient,
//       },
//     }),
// });

// export type AppDispatch = typeof store.dispatch;
// // export const useAppDispatch: () => AppDispatch = useDispatch;
// export type RootState = ReturnType<typeof store.getState>;


import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "./slices/authSlice";
import postReducer from "./slices/postSlice";
import apolloClient from "@/lib/apollo";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";


const rootReducer = combineReducers({
  auth: authReducer,
  posts: postReducer,

});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Persist the root reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: apolloClient,
      },
      // serializableCheck: {
      //   // Ignore these action types for redux-persist
      //   ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      // },
    }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
