import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { SystemUserDTO } from "@/model/cms/system-user/SystemUserDTO";
import { Content } from "antd/es/layout/layout";

type TableFunction = {
  config: TablePropsCustom<SystemUserDTO>;
};
export const TableData = ({ config }: TableFunction) => {
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
        <TableCustom fixedCollap={true} {...config} />
      </Content>
    </>
  );
};
