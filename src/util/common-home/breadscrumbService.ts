import { BREADSCRUMB } from "@/constant/authen/authenConst";

export const setBreadscrumbToLocalStorage = (dataBreadscrumb: []) => {
  localStorage.setItem(BREADSCRUMB, JSON.stringify(dataBreadscrumb));
};

export const getBreadscrumbFromLocalStorage = () => {
  try {
    const submenu = localStorage.getItem(BREADSCRUMB);
    if (submenu) {
      return JSON.parse(submenu);
    }
    return [];
  } catch (e) {
    console.error(e);
    window.localStorage.removeItem(BREADSCRUMB);
    window.location.reload();
  }
};
