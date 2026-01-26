const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const isValidToken = () => {
  const _userData = localStorage ? localStorage.getItem("_fn") : "";
  if (!_userData) {
    window.location.href = APP_URL || "";
  }
};
