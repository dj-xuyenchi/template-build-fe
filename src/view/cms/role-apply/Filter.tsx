import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import { GlobalConfigData } from "@/model/global-config/GlobalConfigData";
import { featureApi } from "@/api/featureApi";
import { GetSystemUserFilter, sysUserApi } from "@/api/sysUserApi";
import { apiApi, GetApiFilter } from "@/api/apiApi";
import { btnApi, GetBtnFilter } from "@/api/btnApi";
import { GetSystemFilter, systemApi } from "@/api/systemApi";

export const getStatusLabel = (value: string) => {
  return statusSelect?.find((item) => {
    return item.value === value;
  })?.label;
};
export const getStatusTag = (value: string) => {
  return statusSelect?.find((item) => {
    return item.value === value;
  })?.tag;
};
export const getEffectiveLabel = (value: string) => {
  return effectiveType?.find((item) => {
    return item.value === value;
  })?.label;
};
export const getEffectiveTag = (value: string) => {
  return effectiveType?.find((item) => {
    return item.value === value;
  })?.tag;
};
export const effectiveType: DefaultOptionType[] = [
  { value: "NE", label: "Không áp dụng", tag: "green" },
  { value: "E", label: "Áp dụng", tag: "blue" },
];

const statusSelect: DefaultOptionType[] = [
  { value: null, label: "Tất cả" },
  { value: "ACTIVE", label: "Đang hoạt động", tag: "green" },
  { value: "IN_ACTIVE", label: "Tạm ngưng hoạt động", tag: "warning" },
  { value: "DELETED", label: "Đã xóa", tag: "red" },
];

type FilterProps = {
  handleFilter: (params: GetRoleFilter, signal: AbortSignal | null) => void;
  filter: GetRoleFilter;
  applyTypeList: GlobalConfigData[];
};
export const Filter = ({
  handleFilter,
  filter,
  applyTypeList,
}: FilterProps) => {
  const [form] = Form.useForm();
  const [applyValue, setApplyValue] = useState(
    [] as { value: string; label: string }[],
  );
  const [loadingApplyValue, setLoadingApplyValue] = useState(false);
  const onFinish = (value: GetRoleFilter) => {
    console.error(value);

    const params = {
      ...value,
      pageSize: filter.pageSize,
      pageNumber: filter.pageNumber,
      // status: convertArrayParam(value.status as ConvertArrayParam[]),
    };

    handleFilter(params as GetRoleFilter, null);
  };
  const handleOnchange = async (value: string) => {
    try {
      setLoadingApplyValue(true);
      switch (value) {
        case "APPLY_FEATURE": {
          const features = await featureApi.getFeature({});
          if (features.code == "SUCCESS") {
            setApplyValue(
              features.data.map((f) => {
                return {
                  value: `${f.featureId}`,
                  label: f.featureName,
                };
              }),
            );
          }
          break;
        }
        case "APPLY_USER": {
          const users = await sysUserApi.getUser({} as GetSystemUserFilter);
          if (users.code == "SUCCESS") {
            setApplyValue(
              users.data.map((u) => {
                return {
                  value: `${u.userId}`,
                  label: u.userName,
                };
              }),
            );
          }
          break;
        }
        case "APPLY_API": {
          const apis = await apiApi.getApi({} as GetApiFilter);
          if (apis.code == "SUCCESS") {
            setApplyValue(
              apis.data.map((a) => {
                return {
                  value: `${a.apiId}`,
                  label: a.apiName + `- ${a.uri} `,
                };
              }),
            );
          }
          break;
        }
        case "APPLY_BTN": {
          const btns = await btnApi.getBtn({} as GetBtnFilter);
          if (btns.code == "SUCCESS") {
            setApplyValue(
              btns.data.map((b) => {
                return {
                  value: `${b.btnId}`,
                  label: b.btnName + ` - ${b.btnCode}`,
                };
              }),
            );
          }
          break;
        }
        case "APPLY_SYSTEM": {
          const systems = await systemApi.getSystem({} as GetSystemFilter);
          if (systems.code == "SUCCESS") {
            setApplyValue(
              systems.data.map((s) => {
                return {
                  value: `${s.systemId}`,
                  label: s.systemName,
                };
              }),
            );
          }
          break;
        }
        default: {
        }
      }
    } finally {
      setLoadingApplyValue(false);
    }
  };

  const handleClearFilter = () => {
    form.resetFields();
  };

  const effectiveTypeValue = Form.useWatch("effectiveType", form);

  useEffect(() => {
    form.setFieldsValue({
      ...filter,
      status: filter.status,
    });
  }, []);
  return (
    <>
      <CollapseCustom
        noBorder={true}
        activeKey={[1]}
        items={[
          {
            key: "1",
            label: "Tìm kiếm",
            children: (
              <>
                <FormCustom layout="vertical" form={form} onFinish={onFinish}>
                  <Row gutter={16}>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Quyền"
                        name="roleId"
                        tooltip="Quyền áp dụng"
                      >
                        <SelectCustom
                          placeholder="Chọn kiểu áp dụng thời gian"
                          options={[...effectiveType]}
                          onChange={handleOnchange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Kiểu áp dụng dữ liệu"
                        name="applyType"
                        tooltip="Kiểu áp dụng thời gian"
                      >
                        <SelectCustom
                          placeholder="Chọn kiểu áp dụng dữ liệu"
                          options={[
                            ...[...applyTypeList]
                              .sort(
                                (a, b) =>
                                  (a.sortNumber ?? 0) - (b.sortNumber ?? 0),
                              )
                              .map((a) => {
                                return {
                                  value: a.globalConfigDataCode,
                                  label: a.globalConfigDataName,
                                };
                              }),
                          ]}
                          onChange={handleOnchange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Dữ liệu áp dụng"
                        name="applyValue"
                        tooltip="Dữ liệu áp dụng"
                      >
                        <SelectCustom
                          placeholder="Chọn dữ liệu áp dụng"
                          options={[...applyValue]}
                          loading={loadingApplyValue}
                          onChange={handleOnchange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="stauts"
                        tooltip="Trạng thái dữ liệu"
                      >
                        <SelectCustom
                          placeholder="Chọn kiểu áp dụng dữ liệu"
                          options={[...effectiveType]}
                          onChange={handleOnchange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Kiểu áp dụng thời gian"
                        name="effectiveType"
                        tooltip="Kiểu áp dụng thời gian"
                      >
                        <SelectCustom
                          placeholder="Chọn kiểu áp dụng thời gian"
                          options={[...effectiveType]}
                          onChange={handleOnchange}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Áp dụng từ"
                        name="effectiveFrom"
                        tooltip="Áp dụng từ"
                      >
                        <DatePickerCustom
                          placeholder="Chọn thời gian áp dụng từ"
                          disabled={effectiveTypeValue != "E"}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Áp dụng đến"
                        name="effectiveTo"
                        tooltip="Áp dụng đến"
                      >
                        <DatePickerCustom
                          placeholder="Chọn thời gian áp dụng đến"
                          disabled={effectiveTypeValue != "E"}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    style={{
                      marginBottom: "unset",
                    }}
                  >
                    <ButtonCustom
                      type="primary"
                      htmlType="submit"
                      title="Tìm kiếm"
                    />
                    <ButtonCustom
                      style={{
                        marginLeft: "8px",
                      }}
                      onClick={handleClearFilter}
                      title="Bỏ lọc"
                    />
                  </Form.Item>
                </FormCustom>
              </>
            ),
          },
        ]}
      />
    </>
  );
};
