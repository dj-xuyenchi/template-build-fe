import { BREADSCRUMB } from "@/constant/authen/authenConst";

export const setBreadscrumbToLocalStorage = (dataBreadscrumb: []) => {
  localStorage.setItem(BREADSCRUMB, JSON.stringify(dataBreadscrumb));
};
