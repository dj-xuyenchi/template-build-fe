import "@/config/styleOverride.css";
import { Tag, TagProps } from "antd";
export interface TagPropsCustom extends TagProps {}

export const TagCustom = ({ ...restProps }: TagPropsCustom) => {
  return <Tag {...restProps} />;
};
