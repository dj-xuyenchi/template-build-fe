import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { Content } from "antd/es/layout/layout";
import { Application } from "@/model/application/Application";

type TableApplication = {
  config: TablePropsCustom<Application>;
};
export const TableData = ({ config }: TableApplication) => {
  return (
    <>
      <Content
        style={{
          padding: "0px 24px 12px 24px",
          margin: "12px 0px 0px 0px",
          background: "white",
          borderRadius: "3px",
        }}
      >
        <TableCustom
          fixedCollap={true}
          {...config}
        />
      </Content>
    </>
  );
};
