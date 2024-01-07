import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import memberReducer from "./reducers/member.reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  memberReducer,
});
const persistConfig = {
  key:
    typeof process.env.NEXT_PUBLIC_PERSIST_KEY === "string"
      ? process.env.NEXT_PUBLIC_PERSIST_KEY
      : "",
  storage: storage,
  whiteList: ["memberReducer"],
};

const rootPersistReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: rootPersistReducer,
  devTools: true,
});
