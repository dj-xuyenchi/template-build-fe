import { Button, Upload, UploadProps } from "antd";

import { UploadOutlined } from "@ant-design/icons";
import { mediaApi } from "@/api/mediaApi";
export interface UploadFilePropsCustom extends UploadProps {
  title?: string;
}

export const UploadFileCustom = ({
  title = "Upload file",
  ...restProps
}: UploadFilePropsCustom) => {
  return (
    <Upload
      {...restProps}
      customRequest={async ({ file, onSuccess, onError }) => {
        try {
          const res = await mediaApi.uploadFile([file as File]);
          if (res?.code === "SUCCESS") {
            onSuccess?.(res);
          }
        } catch (err) {
          onError?.(err as Error);
        }
      }}
    >
      <Button type="link" icon={<UploadOutlined />}>
        {title}
      </Button>
    </Upload>
  );
};
