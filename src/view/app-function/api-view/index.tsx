import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useState } from "react";
import { applicationApi, ApplicationFilter } from "@/api/applicationApi";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { apiUriApi, ApiUriFilter } from "@/api/apiUriApi";
import { ApiUri, METHOD } from "@/model/api/ApiUri";
import { Application } from "@/model/application/Application";
import { hasRole } from "@/util/authen-service/checkRoleBtn";
import { DrawerFeature } from "./DrawFeature";

export const ApiPage = () => {
  const [page, setPage] = useState([
    { apiUriId: 2, status: "O" },
  ] as ApiUri[]);
  const [applicationList, setApplicationList] = useState([
    {},
    {},
  ] as Application[]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    status: ["O"],
  } as ApiUriFilter);
  const [viewMode, setViewMode] = useState(true);

  const handleDeleteRow = async (row: ApiUri) => {
    if (!row.apiUriId) {
      return;
    }
    const res = await apiUriApi.delete({
      applicationId: row.apiUriId,
    });
    console.error(res);

    handleGetData(filter, null);
  };
  const handleReopenRow = async (row: ApiUri) => {
    if (!row.apiUriId) {
      return;
    }
    await apiUriApi.reopen({
      applicationId: row.apiUriId,
    });
    handleGetData(filter, null);
  };

  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = page.filter((data) => {
        return data.isNewRow;
      });

      const res = await apiUriApi.create({
        createApis: newDataList || [],
      });
      const update = page.filter((data) => {
        return data.isEdited && !data.isNewRow;
      });

      if (update) {
        const resUp = await apiUriApi.update({
          updateApis: update,
        });
      }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter, null);
      setIsTableLoading(false);
    }
  };
  const handleSetName = (row: ApiUri, value: string) => {
    row.apiName = value;
    row.isEdited = true;
  };
  const handleSetDescription = (row: ApiUri, value: string) => {
    row.description = value;
    row.isEdited = true;
  };
  const handleSetApplication = (row: ApiUri, value: number) => {
    console.error(value);

    row.applicationId = value;
    row.isEdited = true;
  };
  const handleSetAction = (row: ApiUri, value: string) => {
    row.action = value;
    row.isEdited = true;
  };
  const handleSetUri = (row: ApiUri, value: string) => {
    row.uri = value;
    row.isEdited = true;
  };
  const handleSetMethod = (row: ApiUri, value: METHOD) => {
    row.method = value;
    row.isEdited = true;
  };
  const handleSetIsWhiteEndPoint = (row: ApiUri, value: boolean) => {
    row.isWhiteEndPoint = value;
    row.isEdited = true;
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
    handleDeleteRow,
    handleSetName,
    handleSetDescription,
    handleSetApplication,
    handleSetAction,
    handleSetUri,
    handleSetIsWhiteEndPoint,
    handleSetMethod,
    applicationList,
  });

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const pageConfig = {
    current: filter.pageNumber + 1, // Trang hiện tại
    pageSize: filter.pageSize, // Số phần tử/trang
    total: filter.totalData, // Tổng số phần tử
    showSizeChanger: true, // Cho phép chọn số phần tử/trang
    pageSizeOptions: ["10", "20", "50", "100", "500"], // Tuỳ chọn pageSize
    onChange: (page: number, pageSize: number) => {
      setFilter({
        ...filter,
        pageNumber: page - 1,
        pageSize: pageSize,
      });
      handleGetData(
        {
          ...filter,
          pageNumber: page - 1,
          pageSize: pageSize,
        },
        null,
      );
    },
  };
  const config = {
    pagination: pageConfig,
    columns: getColumns({ handleDeleteRow, handleReopenRow } as CallBacks),
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: page,
    viewMode: viewMode,
    tableName: "Quản lý API",
    extendFunction: {
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !hasRole(["VIEW-APPLICATION"]),
      handleUpdateDataSource: (data: []) => {
        setPage([...data]);
      },
      andOn: "table",
      isSupportExport: true,
      isSupportZoom: true,
      handleConfirm: () => {
        addNewData().catch((e) => {
          throw e;
        });
      },
    },
  } as TablePropsCustom<ApiUri>;

  const handleGetData = async (
    params: ApiUriFilter,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await apiUriApi.getApiUri(
        {
          ...filter,
          ...params,
        },
        signal as AbortSignal,
      );

      setFilter({
        ...params,
        totalData: res.totalElements,
      });
      setPage(res.content);
      setPage(orderByCreatedAt(res.content));
    } catch (e) {
      console.error(e);
    } finally {
      // setIsTableLoading(false);
    }
  };
  const handleGetApplicationData = async (filter?: ApplicationFilter) => {
    try {
      setIsTableLoading(true);
      const res = await applicationApi.getApplicationByFilter({
        ...(filter as ApplicationFilter),
      });
      setApplicationList(orderByCreatedAt(res.content));
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    handleGetData({ ...filter }, signal);
    handleGetApplicationData(undefined);
    return () => {
      controller.abort();
    };
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
          applicationList={applicationList}
          handleFilter={handleGetData}
          filter={filter}
        />
      </Content>
      <TableData config={config} />
      <DrawerFeature />
    </>
  );
};
