import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { useEffect, useState } from "react";
import { CallBacks, getColumns, getColumnsEdit } from "./columns";

import { orderByCreatedAt } from "@/util/orderBaseTableData";
import { allowBtnCode } from "@/util/authen-service/checkRoleBtn";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";

export const Index = () => {
  const [data, setData] = useState({} as { data: RoleDTO[] });

  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 10,
    totalData: 0,
    status: ["O"],
  } as GetRoleFilter);
  const [viewMode, setViewMode] = useState(true);

  const handleDeleteRow = async (row: RoleDTO) => {
    if (!row.roleId) {
      return;
    }
    // const res = await roleApi.delete({
    //   roleId: row.roleId,
    // });
    // console.error(res);

    handleGetData(filter, null);
  };
  const handleReopenRow = async (row: RoleDTO) => {
    if (!row.roleId) {
      return;
    }
    // await roleApi.reopen({
    //   roleId: row.roleId,
    // });
    handleGetData(filter, null);
  };

  const addNewData = async () => {
    try {
      setIsTableLoading(true);
      const newDataList = data.data.filter((data) => {
        return data.isNewRow;
      });

      // const res = await RoleDTOApi.create({
      //   createApis: newDataList || [],
      // });
      // const update = data.data.filter((data) => {
      //   return data.isEdited && !data.isNewRow;
      // });

      // if (update) {
      //   const resUp = await RoleDTOApi.update({
      //     updateApis: update,
      //   });
      // }
    } catch (e) {
      throw e;
    } finally {
      handleGetData(filter, null);
      setIsTableLoading(false);
    }
  };
  const handleSetName = (row: RoleDTO, value: string) => {
    row.roleName = value;
    row.isEdited = true;
  };
  const handleSetDescription = (row: RoleDTO, value: string) => {
    row.roleDescription = value;
    row.isEdited = true;
  };
  const handleSetEffectiveType = (row: RoleDTO, value: string) => {
    setData(prev => ({
      ...prev,
      data: prev.data.map(item =>
        item.roleId === row.roleId
          ? { ...item, effectiveType: value, isEdited: true }
          : item
      )
    }));
  };
  const handleSetStatus = (row: RoleDTO, value: boolean) => {
    row.status = value ? "O" : "C";
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
    handleSetName,
    handleSetDescription,
    handleSetEffectiveType,
    handleSetStatus,
    handleDeleteRow
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
    dataSource: data.data as RoleDTO[],
    viewMode: viewMode,
    tableName: "Quản lý API",
    extendFunction: {
      quickSearch: true,
      handleQuickSearch: handleQuickSearch,
      buttonReloadFunction: () => {
        handleGetData(filter, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: !allowBtnCode("CREATE_ROLE"),
      handleUpdateDataSource: (data: []) => {
        setData({ data: [...data] });
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
  } as TablePropsCustom<RoleDTO>;

  const handleGetData = async (
    params: GetRoleFilter,
    signal: AbortSignal | null,
  ) => {
    try {
      setIsTableLoading(true);
      const res = await roleApi.getRole(
        {
          ...filter,
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


  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    handleGetData({ ...filter }, signal);
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
          handleFilter={handleGetData}
          filter={filter}
        />
      </Content>
      <TableData config={config} />
    </>
  );
};
