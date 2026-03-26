import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { GlobalConfigData } from "@/model/global-config/GlobalConfigData";
import { featureApi } from "@/api/featureApi";
import { GetSystemUserFilter, sysUserApi } from "@/api/sysUserApi";
import { apiApi, GetApiFilter } from "@/api/apiApi";
import { btnApi, GetBtnFilter } from "@/api/btnApi";
import { GetSystemFilter, systemApi } from "@/api/systemApi";
import { RoleDTO } from "@/model/cms/role/RoleDTO";
import { GetRoleApplyFilter } from "@/api/roleApplyApi";
import { InputCustom } from "@/component/InputCustom";

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
  handleFilter: (
    params: GetRoleApplyFilter,
    signal: AbortSignal | null,
  ) => void;
  filter: GetRoleApplyFilter;
  applyTypeList: GlobalConfigData[];
  roleList: RoleDTO[];
};
export const Filter = ({
  handleFilter,
  filter,
  applyTypeList,
  roleList,
}: FilterProps) => {
  const [form] = Form.useForm();
  const [applyValue, setApplyValue] = useState(
    [] as { value: string; label: string }[],
  );
  const [loadingApplyValue, setLoadingApplyValue] = useState(false);
  const onFinish = (value: GetRoleApplyFilter) => {
    console.error(value);

    const params = {
      ...value,
    };

    handleFilter(params as GetRoleApplyFilter, null);
  };
  const handleOnchangeRole = (value: number) => {
    console.error(value);
  };

  const handleClearFilter = () => {
    form.resetFields();
  };

  const effectiveTypeValue = Form.useWatch("effectiveType", form);

  useEffect(() => {
    form.setFieldsValue({
      ...filter,
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
                        label="Tên API"
                        name="apiName"
                        tooltip="Tên API"
                      >
                        <InputCustom placeholder="Tên API" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Mã Code API"
                        name="apiCode"
                        tooltip="Mã Code API"
                      >
                        <InputCustom placeholder="Mã Code API" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="URI"
                        tooltip="Đường dẫn endpoint đến server"
                      >
                        <InputCustom placeholder="Đường dẫn endpoint đến server" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Service hệ thống"
                        tooltip="API thuộc service hệ thống nào"
                      >
                        <InputCustom placeholder="Đường dẫn endpoint đến server" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Phương thức API"
                        tooltip="API thuộc phương thức nào"
                      >
                        <InputCustom placeholder="Đường dẫn endpoint đến server" />
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
