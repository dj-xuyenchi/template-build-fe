import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";
import { orderByField } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { ROLE_ACTIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { roleApi } from "@/api/roleApi";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { API_ACTIVE, CatApiDTO } from "@/model/cms/cat-api/CatApiDTO";
import { apiApi, GetApiFilter } from "@/api/apiApi";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { AuditApiRequest } from "@/model/cms/cat-api/AuditApiRequest";

export const Index = () => {
  const [data, setData] = useState({} as { data: CatApiDTO[] });
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
          handleGetData(filter);
        }
      },
    });
  };

  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = data.data.filter((item) => {
        return item.isNewRow;
      });
      const updateDataList = data.data.filter((item) => {
        return item.isEdited && item.apiId;
      });

      const request = {
        createData: newDataList,
        updateData: updateDataList,
      } as AuditApiRequest;
      const res = await apiApi.audit(request);
      if (res.code && res.code === "ERROR") {
      }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter);
      setIsTableLoading(false);
    }
  };
  const handleSetApiName = (row: CatApiDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, apiName: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetApiCode = (row: CatApiDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, apiCode: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetApiDescription = (row: CatApiDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, apiDescription: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetSystemId = (row: CatApiDTO, value: number) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, systemId: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetIsWhiteEndPoint = (row: CatApiDTO, value: boolean) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, isWhiteEndPoint: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetMethod = (row: CatApiDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, method: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleSetUri = (row: CatApiDTO, value: string) => {
    setData((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.rowUUID === row.rowUUID
          ? { ...item, uri: value, isEdited: true }
          : item,
      ),
    }));
    return;
  };
  const handleInactiveRow = (row: CatApiDTO) => {
    if (!row.apiId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn ngưng hoạt động API này không?`,
      centered: true,
      onOk: async () => {
        const res = await apiApi.inactiveApi({
          ids: [row.apiId],
        });
        if (res.code && res.code !== "ERROR") {
          handleGetData(filter);
        }
      },
    });
  };
  const handleActiveRow = (row: CatApiDTO) => {
    if (!row.apiId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn kích hoạt API này không?`,
      centered: true,
      onOk: async () => {
        const res = await apiApi.activeApi({
          ids: [row.apiId],
        });
        if (res.code && res.code !== "ERROR") {
          handleGetData(filter);
        }
      },
    });
  };
  const triggerNewRow = (row: CatApiDTO) => {
    row.status = API_ACTIVE;
    row.isWhiteEndPoint = false;
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
    columns: getColumns({ handleInactiveRow, handleActiveRow } as CallBacks),
    columnsEdit: getColumnsEdit({
      handleSetApiName,
      handleSetApiCode,
      handleSetApiDescription,
      handleSetSystemId,
      handleSetIsWhiteEndPoint,
      handleSetMethod,
      handleSetUri,
      handleInactiveRow,
      handleActiveRow,
      systemList,
    }),
    loading: isTableLoading,
    dataSource: data.data as CatApiDTO[],
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
      disableAddData: !allowBtnCode("AUDIT_API"),
      handleUpdateDataSource: (data: CatApiDTO[]) => {
        setData({ data: [...data] });
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData().catch((e) => {
          throw e;
        });
        return true;
      },
    },
  } as TablePropsCustom<CatApiDTO>;

  const handleGetData = async (params: GetApiFilter) => {
    try {
      // abort request cũ
      controllerRef.current?.abort();

      // tạo controller mới
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsTableLoading(true);
      const res = await apiApi.getApi(
        {
          ...params,
          isTakeSystemName: true,
        } as GetApiFilter,
        controller.signal,
      );
      setFilter(params);

      setData({
        data: orderByField(res.data, "apiId"),
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
