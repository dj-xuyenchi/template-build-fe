import { SUB_MENU } from "@/constant/authen/authenConst";

export const setSubmenuToLocalStorage = (dataSubmenu: []) => {
  localStorage.setItem(SUB_MENU, JSON.stringify(dataSubmenu));
};
