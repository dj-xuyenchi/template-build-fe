// store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import globalReducer from "@/app/globalSlice";
import { UserAppSetting } from "@/model/system/UserAppSetting";

export interface StoreRedux {
  global: UserAppSetting;
}

const rootReducer = combineReducers({
  global: globalReducer, // thêm nhiều reducer nếu có
});

const store = configureStore({
  reducer: rootReducer,
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
