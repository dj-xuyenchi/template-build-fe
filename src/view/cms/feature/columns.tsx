import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import {
  effectiveType,
  getEffectiveLabel,
  getEffectiveTag,
  getStatusLabel,
  getStatusTag,
} from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { ACTIVE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { SwitchCustom } from "@/component/SwitchCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import dayjs from "dayjs";
import { FeatureDTO } from "@/model/feature/FeatureDTO";
import { ROLE_ARCHIVE } from "@/model/cms/role/RoleDTO";

export type CallBacks = BaseTable & {
  handleArchiveActiveRow: (row: FeatureDTO) => Promise<void>;
  handleSetName: (row: FeatureDTO, value: string) => void;
  handleSetDescription: (row: FeatureDTO, value: string) => void;
  handleSetEffectiveType: (row: FeatureDTO, value: string) => void;
  handleSetRoleCode: (row: FeatureDTO, value: string) => void;
  handleSetEffectiveFrom: (row: FeatureDTO, value: dayjs.Dayjs | null) => void;
  handleSetEffectiveTo: (row: FeatureDTO, value: dayjs.Dayjs | null) => void;
  handleSetStatus: (row: FeatureDTO, value: boolean) => void;
};

export const getColumns = ({
  handleArchiveActiveRow,
}: CallBacks): ColumnTypeCustom<FeatureDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Tên chức năng",
    dataIndex: "featureName",
    key: "featureName",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Mã chức năng",
    dataIndex: "featureCode",
    key: "featureCode",
    width: 200,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Chức năng cha",
    dataIndex: "parentFeatureName",
    key: "parentFeatureName",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Hệ thống",
    dataIndex: "systemName",
    key: "systemName",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Kiểu áp dụng",
    dataIndex: "effectiveType",
    key: "effectiveType",
    width: 200,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TagCustom type={getEffectiveTag(value, record)}>
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
    render: (value: Date, record: FeatureDTO, index: number) => (
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
    render: (value: Date, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="left">
        {formatDateWithDayVN(value, true)}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Icon",
    dataIndex: "icon",
    key: "icon",
    width: 200,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Key đường dẫn giao diện",
    dataIndex: "feUri",
    key: "feUri",
    width: 200,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Tiêu đề hiển thị",
    dataIndex: "feLabel",
    key: "feLabel",
    width: 200,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="left">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Là menu",
    dataIndex: "isMenu",
    key: "isMenu",
    width: 200,
    render: (value: boolean, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="center">
        {value ? "true" : "false"}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Là menu dropdown",
    dataIndex: "isSubMenu",
    key: "isSubMenu",
    width: 200,
    render: (value: boolean, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="center">
        {value ? "true" : "false"}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Thứ tự sắp xếp",
    dataIndex: "sortNumber",
    key: "sortNumber",
    width: 200,
    render: (value: number, record: FeatureDTO, index: number) => (
      <TableLabelCustom align="center">{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    width: 220,
    render: (value: string, record: FeatureDTO, index: number) => (
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
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 160,
    render: (value: Date, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 160,
    render: (value: Date, record: FeatureDTO, index: number) => (
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
    render: (value: string, record: FeatureDTO, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        {record.status === ACTIVE && (
          <ArchiveBtn
            disable={!allowBtnCode("ARCHIVE_ROLE")}
            handleArchive={() => {
              handleArchiveActiveRow(record);
            }}
          />
        )}
        {record.status === ROLE_ARCHIVE && (
          <ReOpenBtn
            disable={!allowBtnCode("ACTIVE_ROLE")}
            handleReopen={() => {
              handleArchiveActiveRow(record);
            }}
          />
        )}
      </div>
    ),
    align: "center",
  },
];

export const getColumnsEdit = ({
  handleSetName,
  handleSetDescription,
  handleSetEffectiveType,
  handleSetStatus,
  handleSetEffectiveFrom,
  handleSetEffectiveTo,
  handleSetRoleCode,
}: CallBacks) => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    align: "center",
    width: 80,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TableLabelCustom>{index + 1}</TableLabelCustom>
    ),
  },
  {
    title: "Tên quyền",
    dataIndex: "roleName",
    key: "roleName",
    align: "center",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <InputCustom
        status={record.isErrorRoleName ? "error" : ""}
        defaultValue={record.roleName}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetName(record, value);
        }}
      />
    ),
  },
  {
    title: "Mã quyền",
    dataIndex: "roleCode",
    key: "roleCode",
    align: "center",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <InputCustom
        disabled={record.isNewRow ? false : true}
        defaultValue={record.roleCode}
        status={record.isErrorRoleCode ? "error" : ""}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetRoleCode(record, value);
        }}
      />
    ),
  },
  {
    title: "Mô tả quyền",
    dataIndex: "roleDescription",
    key: "roleDescription",
    align: "center",
    width: 240,
    render: (value: string, record: FeatureDTO, index: number) => (
      <TextAreaCustom
        // style={{ minHeight: 45 }}
        rows={1}
        defaultValue={value}
        // status={record.isErrorRoleDescription ? "error" : ""}
        onBlur={(e) => {
          const value = e.target.value;
          handleSetDescription(record, value);
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
    render: (value: string, record: FeatureDTO, index: number) => (
      <SelectCustom
        size="small"
        status={record.isErrorRoleEffectiveType ? "error" : ""}
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
    render: (value: string, record: FeatureDTO, index: number) => (
      <DatePickerCustom
        showTime
        status={record.isErrorRoleEffectiveFrom ? "error" : ""}
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
    render: (value: string, record: FeatureDTO, index: number) => (
      <DatePickerCustom
        showTime
        status={record.isErrorRoleEffectiveTo ? "error" : ""}
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
  {
    title: "Trạng thái",
    dataIndex: "status",
    key: "status",
    align: "center",
    width: 110,
    render: (value: string, record: FeatureDTO, index: number) => (
      <SwitchCustom
        size="small"
        defaultValue={record.status === ACTIVE}
        onChange={(e) => {
          handleSetStatus(record, e);
        }}
      />
    ),
  },
];
