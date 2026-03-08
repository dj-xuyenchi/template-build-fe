import { TableCustom, TablePropsCustom } from "@/component/TableCustom";
import { Content } from "antd/es/layout/layout";
import { RoleDTO } from "@/model/cms/role/RoleDTO";

type TableFunction = {
  config: TablePropsCustom<RoleDTO>;
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
        <TableCustom
          fixedCollap={true}
          {...config}
        />
      </Content>
    </>
  );
};
