import axiosClient from "@/config/httpCall";
import { AUTHEN_SERVICE } from "@/constant/serviceUrl";
import { BaseResponse } from "@/model/BaseResponse";
import { UploadResponse } from "@/view/common/UploadResponse";

const ROOT_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const SMALL = "szzze";
export const FULL = "flllz";
export const MICRO = "mcrr";

export const mediaApi = {
  loadImage: (params: { imgKey: string; optimize?: string }): string => {
    return `${ROOT_URL}${AUTHEN_SERVICE}/media/f?imgKey=${params.imgKey}&optimize=${params.optimize || ""}`;
  },
  uploadFile: async (
    files: File[],
  ): Promise<BaseResponse<UploadResponse[]>> => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("files", file); // key phải là "files"
    });

    const res = await axiosClient.post(
      `${AUTHEN_SERVICE}/media/upload-file`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return res.data;
  },
};
