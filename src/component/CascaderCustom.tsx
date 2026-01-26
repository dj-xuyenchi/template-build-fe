import { defaultCss } from "@/config/defaultCss";
import { Cascader, CascaderProps } from "antd";
import "@/config/styleOverride.css";
export interface CascaderPropsCustom extends CascaderProps {
}

export const CascaderCustom = ({ ...restProps }: CascaderPropsCustom) => {
    return (
        <></>
        // <Cascader
        //     className="select-custom"
        //     style={{
        //         ...defaultCss,
        //     }}
        //     options={[]}
        //     {...restProps}
        // />
    );
};


