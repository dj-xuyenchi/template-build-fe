import { SELECTED_SUB_MENU, SUB_MENU } from "@/constant/authen/authenConst";

export const setSubmenuToLocalStorage = (dataSubmenu: []) => {
  localStorage.setItem(SUB_MENU, JSON.stringify(dataSubmenu));
};
export const getSubmenuFromLocalStorage = () => {
  try {
    const submenu = localStorage.getItem(SUB_MENU);
    if (submenu) {
      return JSON.parse(submenu);
    }
    return [];
  }
  catch (e) {
    window.localStorage.removeItem(SUB_MENU);
    window.location.reload();
  }
}

export const setSubmenuValueToLocalStorage = (value: string) => {
  localStorage.setItem(SELECTED_SUB_MENU, value);
}

export const getSubmenuValueFromLocalStorage = () => {
  try {
    const submenu = localStorage.getItem(SELECTED_SUB_MENU);
    if (submenu) {
      return JSON.parse(submenu);
    }
    return "";
  }
  catch (e) {
    window.localStorage.removeItem(SELECTED_SUB_MENU);
    window.location.reload();
  }
}