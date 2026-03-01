import {
  BREADSCRUMB,
  REFRESH_TOKEN_KEY,
  TOKEN_KEY,
} from "@/constant/authen/authenConst";

export const handleLogout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(BREADSCRUMB);
  window.location.href = "/login";
};
