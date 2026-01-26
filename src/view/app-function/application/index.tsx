import { Content } from "antd/es/layout/layout";
import { Filter } from "./Filter";
import { TableData } from "./TableData";
import { TablePropsCustom } from "@/component/TableCustom";
import { Application } from "@/model/application/Application";
import { useEffect, useRef, useState } from "react";
import { applicationApi, ApplicationFilter } from "@/api/applicationApi";
import { getColumns, getColumnsEdit } from "./columns";
import { isNotHasRole } from "@/util/checkRoleBtn";
import { useDispatch } from "react-redux";
import { setCallBack } from "@/app/globalSlice";

export const ApplicationPage = () => {
  const [page, setPage] = useState([] as Application[]);
  const [isTableLoading, setIsTableLoading] = useState(false);
  const [filter, setFilter] = useState({
    pageNumber: 0,
    pageSize: 20,
  } as ApplicationFilter);

  const filterRef = useRef(filter);

  const [viewMode, setViewMode] = useState(true);

  const dispatch = useDispatch();

  const handleDeleteRow = async (row: Application) => {
    if (!row.applicationId) {
      return;
    }
    const res = applicationApi.deleteApplication({
      applicationIds: [row.applicationId],
    });
    handleGetData({ ...filter }, null);
  };

  const addNewData = async () => {
    try {
      const newDataList = page.filter((data) => {
        return data.isNewRow;
      });
      const res = await applicationApi.createApplication({
        createApplications: newDataList || [],
      });
      const dataNow = page.filter((data) => {
        return data.applicationId;
      });

      const update = page.filter((data) => {
        return data.isEdited && !data.isNewRow;
      });

      if (update) {
        const resUp = await applicationApi.updateApplication({
          updateApplication: update,
        });
      }
      handleGetData({ ...filter }, null);
    } catch (e) {
      console.error(e);
    }
  };
  const handleSetName = (row: Application, value: string) => {
    row.applicationName = value;
    row.isEdited = true;
  };
  const handleSetIcon = (row: Application, value: string) => {
    row.applicationIcon = value;
    row.isEdited = true;
  };
  const handleSetServiceUriGateway = (row: Application, value: string) => {
    row.serviceUriGateway = value;
    row.isEdited = true;
  };
  const columns = getColumns({
    handleDeleteRow,
    handleSetName,
    handleSetIcon,
    handleSetServiceUriGateway,
  });
  const columnsEdit = getColumnsEdit({
    handleDeleteRow,
    handleSetName,
    handleSetIcon,
    handleSetServiceUriGateway,
  });

  const toggleViewMode = (mode: boolean) => {
    setViewMode(mode);
  };
  const config = {
    columns: columns,
    columnsEdit: columnsEdit,
    loading: isTableLoading,
    dataSource: page,
    viewMode: viewMode,
    tableName: "Ứng dụng",
    extendFunction: {
      buttonReloadFunction: () => {
        handleGetData(filter, null);
      },
      toggleViewMode: toggleViewMode,
      disableAddData: isNotHasRole("VIEW-APPLICATION"),
      handleUpdateDataSource: (data: Application[]) => {
        setPage([...data]);
      },
      andOn: "table",
      isSupportExport: true,
      handleConfirm: () => {
        addNewData();
      },
    },
  } as TablePropsCustom<Application>;
  const handleGetData = async (
    params: ApplicationFilter,
    signal: AbortSignal | null
  ) => {
    try {
      setFilter(params);
      setIsTableLoading(true);
      const res = await applicationApi.getApplicationByFilter(
        {
          ...filter,
          ...params,
        },
        signal as AbortSignal
      );

      setPage(res.content);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTableLoading(false);
    }
  };
  dispatch(setCallBack(handleGetData));

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
        <Filter handleFilter={handleGetData} />
      </Content>
      <TableData config={config} />
    </>
  );
};
