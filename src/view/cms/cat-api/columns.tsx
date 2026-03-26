import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { formatDate, formatDateWithDayVN } from "@/util/date/dateUtil";
import {
  effectiveType,
  getEffectiveLabel,
  getEffectiveTag,
  getStatusLabel,
  getStatusTag,
} from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { CatApiDTO } from "@/model/cms/cat-api/CatApiDTO";

export type CallBacks = BaseTable & {};

export const getColumns = ({}: CallBacks): ColumnTypeCustom<CatApiDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Tên API",
    dataIndex: "apiName",
    key: "apiName",
    width: 280,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã code API",
    dataIndex: "apiCode",
    key: "apiCode",
    width: 280,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mô tả API",
    dataIndex: "apiDescription",
    key: "apiDescription",
    width: 260,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "URI",
    dataIndex: "uri",
    key: "uri",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Hệ thống",
    dataIndex: "systemName",
    key: "systemName",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Phương thức",
    dataIndex: "method",
    key: "method",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Yêu cầu xác thực",
    dataIndex: "method",
    key: "method",
    width: 200,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>
        <TagCustom color={getStatusTag(value)}>
          {getStatusLabel(value)}
        </TagCustom>
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "maker",
    key: "maker",
    width: 160,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (value: Date, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
    render: (value: Date, record: CatApiDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
];

export const getColumnsEdit = ({}: CallBacks) => [];
