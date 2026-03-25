import { InputCustom } from "@/component/InputCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import { getStatusLabel, getStatusTag } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { SwitchCustom } from "@/component/SwitchCustom";
import { SYSTEM_ACTIVE, SystemDTO } from "@/model/cms/system/SystemDTO";

export type CallBacks = BaseTable & {
  handleSetSystemName: (row: SystemDTO, value: string) => void;
  handleSetSystemCode: (row: SystemDTO, value: string) => void;
  handleSetUriGateway: (row: SystemDTO, value: string) => void;
  handleSetStatus: (row: SystemDTO, value: boolean) => void;
};

export const getColumns = ({}: CallBacks): ColumnTypeCustom<SystemDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Tên hệ thống",
    dataIndex: "systemName",
    key: "systemName",
    width: 240,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã hệ thống",
    dataIndex: "systemCode",
    key: "systemCode",
    width: 200,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Đường dẫn Uri Gateway",
    dataIndex: "systemUriGateway",
    key: "systemUriGateway",
    width: 200,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: SystemDTO, index: number) => (
      <TagCustom color={getStatusTag(value)}>{getStatusLabel(value)}</TagCustom>
    ),
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "maker",
    key: "maker",
    width: 160,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 240,
    render: (value: Date, record: SystemDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 240,
    render: (value: Date, record: SystemDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
];

export const getColumnsEdit = (callBack: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    align: "center",
    width: 80,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên hệ thống",
    dataIndex: "systemName",
    key: "systemName",
    align: "center",
    width: 240,
    render: (value: string, record: SystemDTO, index: number) => (
      <InputCustom
        defaultValue={record.systemName}
        onBlur={(e) => {
          const value = e.target.value;
          callBack.handleSetSystemName(record, value);
        }}
      />
    ),
  },

  {
    title: "Mã hệ thống",
    dataIndex: "systemCode",
    key: "systemCode",
    align: "center",
    width: 240,
    render: (value: string, record: SystemDTO, index: number) => (
      <InputCustom
        disabled={record.isNewRow ? false : true}
        defaultValue={record.systemCode}
        onBlur={(e) => {
          const value = e.target.value;
          callBack.handleSetSystemCode(record, value);
        }}
      />
    ),
  },
  {
    title: "Đường dẫn Uri Gateway",
    dataIndex: "systemUriGateway",
    key: "systemUriGateway",
    align: "center",
    width: 220,
    render: (value: string, record: SystemDTO, index: number) => (
      <InputCustom
        disabled={record.isNewRow ? false : true}
        defaultValue={record.systemUriGateway}
        onBlur={(e) => {
          const value = e.target.value;
          callBack.handleSetUriGateway(record, value);
        }}
      />
    ),
  },
  ,
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: SystemDTO, index: number) => (
      <SwitchCustom
        size="small"
        defaultValue={record.status == SYSTEM_ACTIVE ? true : false}
        onChange={(e) => {
          callBack.handleSetStatus(record, e);
        }}
      />
    ),
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "maker",
    key: "maker",
    width: 160,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 240,
    render: (value: Date, record: SystemDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: SystemDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 240,
    render: (value: Date, record: SystemDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
];
