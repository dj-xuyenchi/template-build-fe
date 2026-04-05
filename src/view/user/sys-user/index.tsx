import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns } from "./columns";
import { orderByField } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { roleApi } from "@/api/roleApi";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { apiApi, GetApiFilter } from "@/api/apiApi";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { AuditApiRequest } from "@/model/cms/cat-api/AuditApiRequest";
import { btnApi, GetBtnFilter } from "@/api/btnApi";
import { AuditBtnRequest } from "@/model/cms/btn/AuditBtnRequest";
import {
  SystemUserDTO,
  USER_ACTIVE,
} from "@/model/cms/system-user/SystemUserDTO";
import { GetSystemUserFilter, sysUserApi } from "@/api/sysUserApi";

export const Index = () => {
  const [data, setData] = useState({} as { data: SystemUserDTO[] });
  const [systemList, setSystemList] = useState(
    [] as { label: string; value: number }[],
  );

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    // status: ["ACTIVE"],
  } as GetApiFilter);
  const [viewMode, setViewMode] = useState(true);

  const modal = useGlobalModal();
  const controllerRef = useRef<AbortController | null>(null);
  const messageApi = getMessageInstance();

  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = data.data.filter((item) => {
        return item.isNewRow;
      });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.userId;
      });

      const request = {
        createData: newDataList,
        updateData: updateDataList,
      } as AuditBtnRequest;
      const res = await btnApi.audit(request);
      if (res.code && res.code === "ERROR") {
      }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter);
      setIsTableLoading(false);
    }
  };
  const handleSetBtnName = (row: SystemUserDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, btnName: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetBtnCode = (row: SystemUserDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, btnCode: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetBtnDescription = (row: SystemUserDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, btnDescription: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };

  const triggerNewRow = (row: SystemUserDTO) => {
    row.status = USER_ACTIVE;
    return true;
  };
  const handleQuickSearch = (keyword: string) => {
    setFilter({
      ...filter,
      keyword: keyword,
    });
    handleGetData({
      ...filter,
      keyword: keyword,
    });
  };

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    total: data?.data?.length, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
      });
    },
  };
  const config = {
    pagination: pageConfig,
    columns: getColumns({} as CallBacks),
    loading: isTableLoading,
    dataSource: data.data as SystemUserDTO[],
    viewMode: viewMode,
    tableName: "Quản lý API",
    extendFunction: {
      triggerNewRow: triggerNewRow,
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !allowBtnCode("AUDIT_SYS_USER"),
      handleUpdateDataSource: (data: SystemUserDTO[]) => {
        setData({ data: [...data] });
      },
      andOn: "drawer",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData().catch((e) => {
          throw e;
        });
        return true;
      },
    },
  } as TablePropsCustom<SystemUserDTO>;

  const handleGetData = async (params: GetSystemUserFilter) => {
    try {
      // abort request cũ
      controllerRef.current?.abort();

      // tạo controller mới
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsTableLoading(true);
      const res = await sysUserApi.getUser(
        {
          ...params,
        } as GetSystemUserFilter,
        controller.signal,
      );
      setFilter(params);

      setData({
        data: orderByField(res.data, "userId"),
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };

  const handleGetSystem = async () => {
    try {
      const res = await systemApi.getSystem({} as GetSystemFilter);

      setSystemList(
        res.data?.map((s) => {
          return {
            label: s.systemName,
            value: s.systemId,
          };
        }),
      );
    } catch (e) {
      console.error(e);
    } finally {
    }
  };
  useEffect(() => {
    handleGetSystem();
    handleGetData({ ...filter });
  }, []);

  return (
    <>
      <Content
        style={{
          marginBottom: "12px",
          padding: "0px 24px 0px 24px",
          margin: 0,
          background: "white",
          borderRadius: "3px",
        }}
      >
        <Filter
          handleFilter={handleGetData}
          filter={filter}
          systemList={systemList}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
