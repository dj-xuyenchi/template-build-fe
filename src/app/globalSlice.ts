// store/slices/exampleSlice.js
import { GlobalSystemConfig } from "@/model/login/GlobalSystemConfig";
import { UserInformation } from "@/model/login/UserInformation";
import { AppSlice } from "@/store/AppSlice";
import { createSlice } from "@reduxjs/toolkit";

const userApp = {} as UserInformation;
const appSlice = {} as AppSlice;
const globalSystemConfig = {} as GlobalSystemConfig;

const globalSlice = createSlice({
  name: "global",
  initialState: {
    userApp,
    appSlice,
    globalSystemConfig
  },
  reducers: {
    setUserInformation: (state, action) => {
      state.userApp = action.payload;
    },
    setGlobalSystemConfig: (state, action) => {
      state.globalSystemConfig = action.payload;
    },
    setCallBack: (state, action) => {
      state.appSlice.callBack = action.payload;
    },
  },
});

export const { setUserInformation, setCallBack, setGlobalSystemConfig } =
  globalSlice.actions;

export default globalSlice.reducer;
