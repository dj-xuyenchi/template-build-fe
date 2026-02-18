import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { ALL } from "@/model/BaseFilter";
import { useEffect } from "react";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";

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
  { value: "O,C", label: "Tất cả" },
  { value: "O", label: "Đang hoạt động", tag: "green" },
  { value: "C", label: "Đã ngừng hoạt động", tag: "red" },
];

type FilterProps = {
  handleFilter: (params: GetRoleFilter, signal: AbortSignal | null) => void;
  filter: GetRoleFilter;
};
export const Filter = ({
  handleFilter,
  filter,
}: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: GetRoleFilter) => {
    const params = {
      ...value,
      pageSize: filter.pageSize,
      pageNumber: filter.pageNumber,
    };

    handleFilter(params, null);
  };

  const handleClearFilter = () => {
    form.resetFields();
  };
  const effectiveTypeValue = Form.useWatch("effectiveType", form);

  useEffect(() => {
    form.setFieldsValue({
      ...filter,
      status: filter.status || ALL,
    });
    handleFilter(filter, null);
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
                        label="Tên quyền"
                        name="roleName"
                        tooltip="Tên quyền cần tìm"
                      >
                        <InputCustom placeholder="Tên quyền" />
                      </Form.Item>
                    </Col>

                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Mã quyền"
                        name="roleCode"
                        tooltip="Mã quyền cần tìm"
                      >
                        <InputCustom placeholder="Mã quyền" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn trạng thái"
                          mode="multiple"
                          options={[
                            ...statusSelect,
                          ]}
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
                          options={[
                            ...effectiveType,
                          ]}
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
                  <Form.Item style={{
                    marginBottom: "unset"
                  }}>
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
