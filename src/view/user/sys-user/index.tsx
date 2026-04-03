import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useRef, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";
import { orderByField } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { roleApi } from "@/api/roleApi";
import { useGlobalModal } from "@/config/push-noti-message/ModalConfigHolder";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { apiApi, GetApiFilter } from "@/api/apiApi";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { AuditApiRequest } from "@/model/cms/cat-api/AuditApiRequest";
import { btnApi, GetBtnFilter } from "@/api/btnApi";
import { BTN_ACTIVE, BtnDTO } from "@/model/cms/btn/ButtonDTO";
import { AuditBtnRequest } from "@/model/cms/btn/AuditBtnRequest";

export const Index = () => {
  const [data, setData] = useState({} as { data: BtnDTO[] });
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
  const handleArchiveActiveRow = async (row: BtnDTO) => {
    if (!row.btnId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn ${row.status == BTN_ACTIVE ? "lưu trữ" : "active lại"} quyền này không?`,
      centered: true,
      onOk: async () => {
        const res = await roleApi.archiveActive({
          id: row.btnId,
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
        return item.isEdited && item.btnId;
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
  const handleSetBtnName = (row: BtnDTO, value: string) => {
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
  const handleSetBtnCode = (row: BtnDTO, value: string) => {
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
  const handleSetBtnDescription = (row: BtnDTO, value: string) => {
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

  const handleInactiveActiveRow = (row: BtnDTO) => {
    if (!row.btnId) {
      return;
    }
    modal.confirm({
      title: "Xác nhận",
      content: `Bạn có chắc muốn kích hoạt API này không?`,
      centered: true,
      onOk: async () => {
        const res = await btnApi.inactiveActive({
          ids: [row.btnId],
        });
        if (res.code && res.code !== "ERROR") {
          handleGetData(filter);
        }
      },
    });
  };
  const triggerNewRow = (row: BtnDTO) => {
    row.status = BTN_ACTIVE;
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
    columns: getColumns({ handleInactiveActiveRow } as CallBacks),
    columnsEdit: getColumnsEdit({
      handleSetBtnCode,
      handleSetBtnDescription,
      handleSetBtnName,
      systemList,
    } as CallBacks),
    loading: isTableLoading,
    dataSource: data.data as BtnDTO[],
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
      disableAddData: !allowBtnCode("AUDIT_ROLE"),
      handleUpdateDataSource: (data: BtnDTO[]) => {
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
  } as TablePropsCustom<BtnDTO>;

  const handleGetData = async (params: GetApiFilter) => {
    try {
      // abort request cũ
      controllerRef.current?.abort();

      // tạo controller mới
      const controller = new AbortController();
      controllerRef.current = controller;

      setIsTableLoading(true);
      const res = await btnApi.getBtn(
        {
          ...params,
          isTakeSystemName: true,
        } as GetBtnFilter,
        controller.signal,
      );
      setFilter(params);

      setData({
        data: orderByField(res.data, "btnId"),
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
