// store/slices/exampleSlice.js
import { UserInformation } from "@/model/login/UserInformation";
import { AppSlice } from "@/store/AppSlice";
import { createSlice } from "@reduxjs/toolkit";

const userApp = {} as UserInformation;
const appSlice = {} as AppSlice;

const globalSlice = createSlice({
  name: "global",
  initialState: {
    userApp,
    appSlice,
  },
  reducers: {
    setUserInformation: (state, action) => {
      state.userApp = action.payload;
    },
    setOptionFeatures: (state, action) => {
      state.appSlice.optionFeatures = action.payload;
    },
    setCallBack: (state, action) => {
      state.appSlice.callBack = action.payload;
    },
  },
});

export const { setUserInformation, setOptionFeatures, setCallBack } =
  globalSlice.actions;

export default globalSlice.reducer;
