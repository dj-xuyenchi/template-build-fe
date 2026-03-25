import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
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
import { ACTIVE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { SwitchCustom } from "@/component/SwitchCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import dayjs from "dayjs";
import { DDmmYYY, DDmmYYY_HHMMSS } from "@/constant/dateFormat";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
import { RoleApplyDTO } from "@/model/cms/roleApply/RoleApplyDTO";
import { FeatureDTO } from "@/model/cms/feature/FeatureDTO";
import { GlobalConfigData } from "@/model/global-config/GlobalConfigData";

export type CallBacks = BaseTable & {
  handleSetRole: (row: RoleApplyDTO, value: number) => void;
  handleSetApplyType: (row: RoleApplyDTO, value: string) => void;
  handleSetApplyValue: (row: RoleApplyDTO, value: number) => void;
  handleSetEffectiveType: (row: RoleApplyDTO, value: string) => void;
  handleSetEffectiveFrom: (
    row: RoleApplyDTO,
    value: dayjs.Dayjs | null,
  ) => void;
  handleSetEffectiveTo: (row: RoleApplyDTO, value: dayjs.Dayjs | null) => void;
  handleSetStatus: (row: RoleApplyDTO, value: string) => void;
  roleMap?: Map<number, RoleDTO>;
  roleList?: RoleDTO[];
  applyTypeList?: GlobalConfigData[];
  featureMap?: Map<number, FeatureDTO>;
  applyValueList?: {
    value: string;
    label: string;
  }[];
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
    width: 200,
    render: (value: number, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{roleMap?.get(value)?.roleName}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã quyền",
    dataIndex: "roleId",
    key: "roleId",
    width: 160,
    render: (value: number, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{roleMap?.get(value)?.roleCode}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Kiểu áp dụng dữ liệu",
    dataIndex: "applyTypeName",
    key: "applyTypeName",
    width: 280,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Dữ liệu áp dụng",
    dataIndex: "applyValue",
    key: "applyValue",
    width: 260,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Kiểu áp dụng thời gian",
    dataIndex: "effectiveType",
    key: "effectiveType",
    width: 200,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TagCustom color={getEffectiveTag(value)}>
        {getEffectiveLabel(value)}
      </TagCustom>
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
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
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
    width: 200,
    render: (value: Date, record: RoleApplyDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
];

export const getColumnsEdit = ({
  handleSetApplyType,
  handleSetApplyValue,
  handleSetRole,
  handleSetStatus,
  handleSetEffectiveType,
  handleSetEffectiveFrom,
  handleSetEffectiveTo,
  roleList,
  applyTypeList,
  applyValueList,
}: CallBacks) => [
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
    title: "Quyền",
    dataIndex: "roleId",
    key: "roleId",
    align: "center",
    width: 240,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <SelectCustom
        size="small"
        disabled={!record.isNewRow}
        value={record.roleId}
        options={roleList?.map((r) => {
          return {
            label: r.roleName + " - " + r.roleCode,
            value: r.roleId,
          };
        })}
        onChange={(e) => {
          const value = e;
          handleSetRole(record, value);
        }}
      />
    ),
  },
  {
    title: "Kiểu áp dụng dữ liệu",
    dataIndex: "applyType",
    key: "applyType",
    align: "center",
    width: 240,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <SelectCustom
        size="small"
        disabled={!record.isNewRow}
        value={record.applyType}
        options={applyTypeList?.map((a) => {
          return {
            value: a.globalConfigDataCode,
            label: a.globalConfigDataName,
          };
        })}
        onChange={(e) => {
          const value = e;
          handleSetApplyType(record, value);
        }}
      />
    ),
  },
  {
    title: "Dữ liệu áp dụng",
    dataIndex: "applyId",
    key: "applyId",
    align: "center",
    width: 240,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <SelectCustom
        size="small"
        disabled={!record.isNewRow}
        value={record.isNewRow ? record.applyId : record.applyValue}
        options={record.optionApplyValue}
        onChange={(e) => {
          const value = e;
          handleSetApplyValue(record, value);
        }}
      />
    ),
  },
  {
    title: "Kiểu áp dụng",
    dataIndex: "effectiveType",
    key: "effectiveType",
    align: "center",
    width: 200,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <SelectCustom
        size="small"
        value={record.effectiveType}
        options={effectiveType}
        onChange={(e) => {
          const value = e;
          handleSetEffectiveType(record, value);
        }}
      />
    ),
  },
  {
    title: "Áp dụng từ",
    dataIndex: "effectiveFrom",
    key: "effectiveFrom",
    align: "center",
    width: 200,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <DatePickerCustom
        showTime
        value={value ? dayjs(value) : null}
        disabled={record.effectiveType != "E"}
        placeholder="Chọn thời gian áp dụng từ"
        onChange={(e) => {
          const value = e;
          handleSetEffectiveFrom(record, value as dayjs.Dayjs | null);
        }}
      />
    ),
  },
  {
    title: "Áp dụng đến",
    dataIndex: "effectiveTo",
    key: "effectiveTo",
    align: "center",
    width: 200,
    render: (value: string, record: RoleApplyDTO, index: number) => (
      <DatePickerCustom
        showTime
        value={value ? dayjs(value) : null}
        disabled={record.effectiveType != "E"}
        placeholder="Chọn thời gian áp dụng đến"
        onChange={(e) => {
          const value = e;
          handleSetEffectiveTo(record, value as dayjs.Dayjs | null);
        }}
      />
    ),
  },
];
