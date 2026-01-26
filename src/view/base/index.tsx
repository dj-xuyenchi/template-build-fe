"use client";
import { Content } from "antd/es/layout/layout";
import { CollapseCustom } from "@/component/CollapseCustom";

export const Base = () => {
  return (
    <>
      <Content
        style={{
          marginBottom: "12px !important",
          padding: "0px 24px 0px 24px ",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        <CollapseCustom noBorder={true} items={[]} />
        ss
      </Content>

      <Content
        style={{
          padding: "0px 24px 12px 24px ",
          margin: "12px 0px 0px 0px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        ss
      </Content>
    </>
  );
};
