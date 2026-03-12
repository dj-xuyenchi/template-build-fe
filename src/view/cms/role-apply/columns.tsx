import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDate, formatDateWithDayVN } from "@/util/date/dateUtil";
import { effectiveType, getStatusLabel, getStatusTag } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { ACTIVE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { SwitchCustom } from "@/component/SwitchCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import dayjs from "dayjs";
import { DDmmYYY, DDmmYYY_HHMMSS } from "@/constant/dateFormat";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
import { RoleApplyDTO } from "@/model/roleApply/RoleApplyDTO";
import { FeatureDTO } from "@/model/feature/FeatureDTO";

export type CallBacks = BaseTable & {
  handleSetEffectiveType: (row: RoleApplyDTO, value: string) => void;
  handleSetEffectiveFrom: (
    row: RoleApplyDTO,
    value: dayjs.Dayjs | null,
  ) => void;
  handleSetEffectiveTo: (row: RoleApplyDTO, value: dayjs.Dayjs | null) => void;
  handleSetStatus: (row: RoleApplyDTO, value: boolean) => void;
  roleMap: Map<number, RoleDTO>;
  featureMap: Map<number, FeatureDTO>;
};

export const getColumns = ({
  roleMap,
  featureMap,
}: CallBacks): ColumnTypeCustom<RoleApplyDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Tên quyền",
    dataIndex: "roleId",
    key: "roleId",
    width: 240,
    render: (value: number, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{roleMap?.get(value)?.roleName}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã quyền",
    dataIndex: "roleId",
    key: "roleId",
    width: 200,
    render: (value: number, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{roleMap?.get(value)?.roleCode}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Dạng áp dụng dữ liệu",
    dataIndex: "applyType",
    key: "applyType",
    width: 240,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Dữ liệu áp dụng",
    dataIndex: "applyId",
    key: "applyId",
    width: 200,
    render: (value: number, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{featureMap.get(value)?.featureName}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Kiểu áp dụng thời gian",
    dataIndex: "effectiveType",
    key: "effectiveType",
    width: 200,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>
        {value == "NE" ? "Không áp dụng thời gian" : "Có áp dụng thời gian"}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Áp dụng từ",
    dataIndex: "effectiveFrom",
    key: "effectiveFrom",
    width: 200,
    render: (value: Date, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom align="left">
        {formatDateWithDayVN(value, true)}
      </TableLabelCustom>
    ),
    align: "center",
  },

  {
    title: "Áp dụng đến",
    dataIndex: "effectiveTo",
    key: "effectiveTo",
    width: 200,
    render: (value: Date, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom align="left">
        {formatDateWithDayVN(value, true)}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>
        <TagCustom type={getStatusTag(value)}>
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
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 160,
    render: (value: Date, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 160,
    render: (value: Date, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "action",
    key: "action",
    width: 100,
    fixed: "right",
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      ></div>
    ),
    align: "center",
  },
];
