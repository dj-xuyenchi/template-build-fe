import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect } from "react";
import { GetApiFilter } from "@/api/apiApi";
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

export const methodSelect: DefaultOptionType[] = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
];
const statusSelect: DefaultOptionType[] = [
  { value: null, label: "Tất cả" },
  { value: "ACTIVE", label: "Đang hoạt động", tag: "green" },
  { value: "IN_ACTIVE", label: "Tạm ngưng hoạt động", tag: "warning" },
  { value: "DELETED", label: "Đã xóa", tag: "red" },
];

type FilterProps = {
  handleFilter: (params: GetApiFilter, signal: AbortSignal | null) => void;
  filter: GetApiFilter;
  systemList: { label: string; value: number }[];
};
export const Filter = ({ handleFilter, filter, systemList }: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: GetApiFilter) => {
    const params = {
      ...value,
    };

    handleFilter(params as GetApiFilter, null);
  };
  const handleClearFilter = () => {
    form.resetFields();
  };

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
                        name="uri"
                        tooltip="Đường dẫn endpoint đến server"
                      >
                        <InputCustom placeholder="Đường dẫn endpoint đến server" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Service hệ thống"
                        tooltip="Chọn service API sẽ forward đến"
                        name={"systemId"}
                      >
                        <SelectCustom
                          placeholder="Chọn service hệ thống"
                          options={systemList}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        name={"method"}
                        label="Phương thức API"
                        tooltip="API thuộc phương thức nào"
                      >
                        <SelectCustom
                          placeholder="Chọn phương thức API"
                          options={methodSelect}
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
