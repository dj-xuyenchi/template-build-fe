import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";

const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const SMALL = "szzze";
export const FULL = "flllz";
export const MICRO = "mcrr";

export const mediaApi = {
  loadImage: (params: { imgKey: string; optimize?: string }): string => {
    return `${ROOT_URL}${AUTHEN_SERVICE}/media/f?imgKey=${params.imgKey}&optimize=${params.optimize || ""}`;
  },
};
