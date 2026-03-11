import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { formatDate, formatDateWithDayVN } from "@/util/date/dateUtil";
import { effectiveType, getStatusLabel, getStatusTag } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { ACTIVE } from "@/model/BaseDataTable";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ROLE_ARCHIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { SwitchCustom } from "@/component/SwitchCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import dayjs from "dayjs";
import { DDmmYYY, DDmmYYY_HHMMSS } from "@/constant/dateFormat";

export type CallBacks = BaseTable & {
  handleArchiveActiveRow: (row: RoleDTO) => Promise<void>;
  handleSetName: (row: RoleDTO, value: string) => void;
  handleSetDescription: (row: RoleDTO, value: string) => void;
  handleSetEffectiveType: (row: RoleDTO, value: string) => void;
  handleSetRoleCode: (row: RoleDTO, value: string) => void;
  handleSetEffectiveFrom: (row: RoleDTO, value: dayjs.Dayjs | null) => void;
  handleSetEffectiveTo: (row: RoleDTO, value: dayjs.Dayjs | null) => void;
  handleSetStatus: (row: RoleDTO, value: boolean) => void;
};

export const getColumns = ({
  handleArchiveActiveRow,
}: CallBacks): ColumnTypeCustom<RoleDTO>[] => [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      fixed: "left",
      width: 80,
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Tên quyền",
      dataIndex: "roleName",
      key: "roleName",
      width: 240,
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Mã quyền",
      dataIndex: "roleCode",
      key: "roleCode",
      width: 200,
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Mô tả quyền",
      dataIndex: "roleDescription",
      key: "roleDescription",
      width: 240,
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Kiểu áp dụng",
      dataIndex: "effectiveType",
      key: "effectiveType",
      width: 200,
      render: (value: string, record: RoleDTO, index: number) => (
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
      render: (value: Date, record: RoleDTO, index: number) => (
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
      render: (value: Date, record: RoleDTO, index: number) => (
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
      render: (value: string, record: RoleDTO, index: number) => (
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
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      width: 160,
      render: (value: Date, record: RoleDTO, index: number) => (
        <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Người cập nhật",
      dataIndex: "updatedBy",
      key: "updatedBy",
      width: 160,
      render: (value: string, record: RoleDTO, index: number) => (
        <TableLabelCustom>{value}</TableLabelCustom>
      ),
      align: "center",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      width: 160,
      render: (value: Date, record: RoleDTO, index: number) => (
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
      render: (value: string, record: RoleDTO, index: number) => (
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

