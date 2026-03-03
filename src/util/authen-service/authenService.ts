import {
  BREADSCRUMB,
  REFRESH_TOKEN_KEY,
  SELECTED_SUB_MENU,
  SUB_MENU,
  TOKEN_KEY,
} from "@/constant/authen/authenConst";

export const handleLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(BREADSCRUMB);
  localStorage.removeItem(SUB_MENU);
  localStorage.removeItem(SELECTED_SUB_MENU);
  window.location.href = "/login";
};
