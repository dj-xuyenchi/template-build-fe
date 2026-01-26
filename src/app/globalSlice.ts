// store/slices/exampleSlice.js
import { UserAppSetting } from "@/model/system/UserAppSetting";
import { AppSlice } from "@/store/AppSlice";
import { createSlice } from "@reduxjs/toolkit";

const userApp = {} as UserAppSetting;
const appSlice = {} as AppSlice;

const globalSlice = createSlice({
  name: "global",
  initialState: {
    userApp,
    appSlice,
  },
  reducers: {
    setBtnRole: (state, action) => {
      state.userApp.btnRole = action.payload;
    },
    setUserRole: (state, action) => {
      console.error(action);
      state.userApp.userRole = ["ADMIN"];
    },
    setOptionFeatures: (state, action) => {
      state.appSlice.optionFeatures = action.payload;
    },
    setCallBack: (state, action) => {
      state.appSlice.callBack = action.payload;
    },
  },
});

export const { setBtnRole, setOptionFeatures, setCallBack } =
  globalSlice.actions;

export default globalSlice.reducer;
