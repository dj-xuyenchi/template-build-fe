import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";

export const mediaApi = {
  loadImage: async (params: { fileName: string }): Promise<string> => {
    const res = await axiosClient.get(`${AUTHEN_SERVICE}/media/f`, {
      params: params,
    });
    return res.data;
  },
};
