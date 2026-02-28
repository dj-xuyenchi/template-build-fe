import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ROLE_ACTIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import dayjs from "dayjs";
import {
  CreateRoleRequestData,
  UpdateRoleRequestData,
} from "@/model/cms/role/AuditRoleRequest";
import { toDateSendBE } from "@/util/date/dateUtil";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";

export const Index = () => {
  const [data, setData] = useState({} as { data: RoleDTO[] });

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    // status: ["ACTIVE"],
  } as GetRoleFilter);
  const [viewMode, setViewMode] = useState(true);
  const modal = useGlobalModal();

  const handleArchiveActiveRow = async (row: RoleDTO) => {
    if (!row.roleId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn ${row.status == ROLE_ACTIVE ? "lưu trữ" : "active lại"} quyền này không?`,
      centered: true,
      onOk: async () => {
        const res = await roleApi.archiveActive({
          id: row.roleId,
        });
        if (res.code && res.code !== "ERROR") {
          handleGetData(filter, null);
        }
      },
    });
  };

  const addNewData = async () => {
    let isError = false;
    try {
      setIsTableLoading(true);
      const newDataList = data.data
        .filter((item) => {
          return item.isNewRow;
        })
        .map((item: RoleDTO) => {
          return {
            roleCode: item.roleCode,
            roleName: item.roleName,
            roleDescription: item.roleDescription,
            effectiveType: item.effectiveType,
            effectiveFrom: item.effectiveFrom,
            effectiveTo: item.effectiveTo,
            status: item.status,
          } as CreateRoleRequestData;
        });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.roleId;
      }) as UpdateRoleRequestData[];
      const request = {
        create: newDataList || [],
        update: updateDataList || [],
      };
      const res = await roleApi.auditRole(request);
      if (res.code && res.code === "ERROR") {
        isError = true;
      }
    } catch (e) {
      throw e;
    } finally {
      if (!isError) {
        handleGetData(filter, null);
      }
      setIsTableLoading(false);
    }
  };
  const handleSetName = (row: RoleDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, roleName: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetDescription = (row: RoleDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, roleDescription: value, isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetEffectiveType = (row: RoleDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
              ...item,
              effectiveType: value,
              isEdited: true,
              effectiveFrom: value == "NE" ? undefined : item.effectiveFrom,
              effectiveTo: value == "NE" ? undefined : item.effectiveTo,
              isErrorRoleEffectiveFrom: false,
              isErrorRoleEffectiveTo: false,
            }
          : item,
      ),
    }));
  };
  const handleSetEffectiveFrom = (row: RoleDTO, value: dayjs.Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, effectiveFrom: toDateSendBE(value), isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetEffectiveTo = (row: RoleDTO, value: dayjs.Dayjs | null) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, effectiveTo: toDateSendBE(value), isEdited: true }
          : item,
      ),
    }));
  };
  const handleSetStatus = (row: RoleDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? {
              ...item,
              status: value ? ROLE_ACTIVE : ROLE_ACTIVE,
              isEdited: true,
            }
          : item,
      ),
    }));
  };
  const handleSetRoleCode = (row: RoleDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, roleCode: value, isEdited: true }
          : item,
      ),
    }));
  };
  const triggerNewRow = (row: RoleDTO) => {
    row.status = ROLE_ACTIVE;
  };
  const handleQuickSearch = (keyword: string) => {
    setFilter({
      ...filter,
      keyword: keyword,
    });
    handleGetData(
      {
        ...filter,
        keyword: keyword,
      },
      null,
    );
  };
  const columnsEdit = getColumnsEdit({
    handleSetName,
    handleSetDescription,
    handleSetEffectiveType,
    handleSetStatus,
    handleSetEffectiveFrom,
    handleSetEffectiveTo,
    handleArchiveActiveRow,
    handleSetRoleCode,
  });

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    current: filter.pageNumber + 1, // Trang hiện tại
    pageSize: filter.pageSize, // Số phần tử/trang
    total: data?.data?.length, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
        pageNumber: page - 1,
        pageSize: pageSize,
      });
    },
  };
  const config = {
    pagination: pageConfig,
    columns: getColumns({
      handleArchiveActiveRow,
    } as CallBacks),
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: data.data as RoleDTO[],
    viewMode: viewMode,
    tableName: "Quản lý quyền",
    extendFunction: {
      triggerNewRow: triggerNewRow,
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !allowBtnCode("AUDIT_ROLE"),
      handleUpdateDataSource: (data: []) => {
        setData({ data: [...data] });
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        let isError = false;
        const validData = data.data.filter((data) => {
          if (!data.roleName || data.roleName.trim() == "") {
            data.isErrorRoleName = true;
            isError = true;
          } else {
            data.isErrorRoleName = false;
          }
          if (!data.roleCode || data.roleCode.trim() == "") {
            data.isErrorRoleCode = true;
            isError = true;
          } else {
            data.isErrorRoleCode = false;
          }
          if (!data.effectiveType || data.effectiveType.trim() == "") {
            data.isErrorRoleEffectiveType = true;
            isError = true;
          } else {
            data.isErrorRoleEffectiveType = false;
          }
          if (data.effectiveType == "E") {
            if (!data.effectiveFrom) {
              data.isErrorRoleEffectiveFrom = true;
              isError = true;
            } else {
              data.isErrorRoleEffectiveFrom = false;
            }
            if (!data.effectiveTo) {
              data.isErrorRoleEffectiveTo = true;
              isError = true;
            } else {
              data.isErrorRoleEffectiveTo = false;
            }
          }
          return data;
        });
        if (isError) {
          setData((prev) => ({
            ...prev,
            data: [...validData],
          }));
          return false;
        } else {
          addNewData().catch((e) => {
            throw e;
          });
        }
      },
    },
  } as TablePropsCustom<RoleDTO>;

  const handleGetData = async (
    params: GetRoleFilter,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await roleApi.getRole(
        {
          ...params,
        },
        signal as AbortSignal,
      );

      setData({
        data: orderByCreatedAt(res.data),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;

      const controller = new AbortController();
      handleGetData({ ...filter }, controller.signal);

      return () => controller.abort();
    }
  }, []);

  return (
    <>
      <Content
        style={{
          marginBottom: "12px !important",
          padding: "0px 24px 0px 24px",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Filter
          handleFilter={handleGetData}
          filter={filter}
          setFilter={setFilter}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
