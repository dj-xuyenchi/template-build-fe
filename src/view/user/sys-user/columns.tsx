import { TableLabelCustom } from "@/component/TableLabelCustom";
import { BaseTable } from "@/model/BasePropsTable";
import { formatDateWithDayVN } from "@/util/date/dateUtil";
import { getStatusLabel, getStatusTag } from "./Filter";
import { TagCustom } from "@/component/TagCustom";
import { ColumnTypeCustom } from "@/component/TableCustom";
import { InputCustom } from "@/component/InputCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";

import { BTN_ACTIVE, BTN_IN_ACTIVE } from "@/model/cms/btn/ButtonDTO";
import { ArchiveBtn } from "@/component/table-btn/ArchiveBtn";
import { ReOpenBtn } from "@/component/table-btn/ReOpenBtn";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import {
  SystemUserDTO,
  USER_ACTIVE,
  USER_LOCK,
} from "@/model/cms/system-user/SystemUserDTO";
import Image from "next/image";
import { mediaApi } from "@/api/mediaApi";
import { LockBtn } from "@/component/table-btn/LockBtn";
import { UnlockBtn } from "@/component/table-btn/UnlockBtn";

export type CallBacks = BaseTable & {
  handleLockUser: (record: SystemUserDTO) => void;
  handleUnlockUser: (record: SystemUserDTO) => void;
};

export const getColumns = ({
  handleLockUser,
  handleUnlockUser,
}: CallBacks): ColumnTypeCustom<SystemUserDTO>[] => [
  {
    title: "STT",
    dataIndex: "stt",
    key: "stt",
    fixed: "left",
    width: 80,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{record.indexCountNumber}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "User name",
    dataIndex: "userName",
    key: "userName",
    width: 200,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ảnhh đại diện",
    dataIndex: "avatar",
    key: "avatar",
    width: 200,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Image
          width={120}
          height={180}
          src={mediaApi.loadImage({ imgKey: value })}
          alt="avatar"
        />
      </div>
    ),
    align: "center",
  },
  {
    title: "Mã code NV",
    dataIndex: "code",
    key: "code",
    width: 200,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Tên nhân viên",
    dataIndex: "fullName",
    key: "fullName",
    width: 260,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>
        {record.firstName + " " + record.lastName}
      </TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    width: 220,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "SĐT",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
    width: 220,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người tạo",
    dataIndex: "maker",
    key: "maker",
    width: 160,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Kênh tạo",
    dataIndex: "createdByChannel",
    key: "createdByChannel",
    width: 160,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 200,
    render: (value: Date, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{formatDateWithDayVN(value, true)}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Người cập nhật",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 160,
    render: (value: string, record: SystemUserDTO, index: number) => (
      <TableLabelCustom>{value}</TableLabelCustom>
    ),
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 200,
    render: (value: Date, record: SystemUserDTO, index: number) => (
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
    render: (value: string, record: SystemUserDTO, index: number) => (
      <div
        style={{
          padding: "8px 11px",
        }}
      >
        {record.status === USER_ACTIVE && (
          <LockBtn
            disable={!allowBtnCode("LOCK_SYS_USER")}
            handleLock={() => {
              handleLockUser(record);
            }}
          />
        )}
        {record.status === USER_LOCK && (
          <UnlockBtn
            disable={!allowBtnCode("UNLOCK_SYS_USER")}
            handleUnlock={() => {
              handleUnlockUser(record);
            }}
          />
        )}
      </div>
    ),
    align: "center",
  },
];
