import "@/config/styleOverride.css";
import { Tag, TagProps } from "antd";
export interface TagPropsCustom extends TagProps {
    type: 'green' | 'red' | 'orange'
}



export const TagCustom = ({ type, ...restProps }: TagPropsCustom) => {
    return (
        <Tag color={type} {...restProps} />
    );
};


