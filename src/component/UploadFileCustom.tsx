import { Button, Upload, UploadProps } from "antd";
import "@/config/styleOverride.css";
import { UploadOutlined } from '@ant-design/icons';
export interface UploadFilePropsCustom extends UploadProps {
    title?: string
}

export const UploadFileCustom = ({ title = "Upload file", ...restProps }: UploadFilePropsCustom) => {
    return (
        <Upload {...restProps}>
            <Button type="link" icon={<UploadOutlined />}>{title}</Button>
        </Upload>
    );
};


