import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect } from "react";
import { FeatureDTO } from "@/model/feature/FeatureDTO";
import { GetSystemFilter } from "@/api/systemApi";

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
export const getEffectiveTag = (value: string, feature?: FeatureDTO) => {
  if (
    feature &&
    feature.effectiveType === "E" &&
    feature.effectiveFrom &&
    feature.effectiveTo
  ) {
    const now = new Date();
    const from = new Date(feature.effectiveFrom);
    const to = new Date(feature.effectiveTo);

    const isActive = now >= from && now <= to;
    if (!isActive) {
      return "red";
    }
  }
  return effectiveType?.find((item) => {
    return item.value === value;
  })?.tag;
};
export const effectiveType: DefaultOptionType[] = [
  { value: "NE", label: "Không áp dụng", tag: "green" },
  { value: "E", label: "Áp dụng", tag: "orange" },
];

const statusSelect: DefaultOptionType[] = [
  { value: null, label: "Tất cả" },
  { value: "ACTIVE", label: "Đang hoạt động", tag: "green" },
  { value: "IN_ACTIVE", label: "Tạm ngưng hoạt động", tag: "orange" },
];

type FilterProps = {
  handleFilter: (params: GetSystemFilter, signal: AbortSignal | null) => void;
  filter: GetSystemFilter;
};
export const Filter = ({ handleFilter, filter }: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: GetSystemFilter) => {
    console.log("Filter value: ", value);

    const params = {
      ...value,
      pageSize: filter.pageSize,
      pageNumber: filter.pageNumber,
      // status: convertArrayParam(value.status as ConvertArrayParam[]),
    };

    handleFilter(params as GetSystemFilter, null);
  };

  const handleClearFilter = () => {
    form.resetFields();
  };

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
                    <Col span={12} md={12} lg={6} xl={6}>
                      <Form.Item
                        label="Tên chức năng"
                        name="systemName"
                        tooltip="Tên chức năng cần tìm"
                      >
                        <InputCustom placeholder="Tên chức năng" />
                      </Form.Item>
                    </Col>

                    <Col span={12} md={12} lg={6} xl={6}>
                      <Form.Item
                        label="Mã chức năng"
                        name="systemCode"
                        tooltip="Mã chức năng cần tìm"
                      >
                        <InputCustom placeholder="Mã chức năng" />
                      </Form.Item>
                    </Col>

                    <Col span={12} md={12} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn trạng thái"
                          options={[...statusSelect]}
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
