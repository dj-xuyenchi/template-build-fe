import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { Application } from "@/model/application/Application";
import { ApiUriFilter } from "@/api/apiUriApi";
import { ALL, convertArrayParam } from "@/model/BaseFilter";
import { useEffect } from "react";

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
export const getMethodLabel = (value: string) => {
  return methodSelect?.find((item) => {
    return item.value === value;
  })?.label;
};
export const getMethodTag = (value: string) => {
  return methodSelect?.find((item) => {
    return item.value === value;
  })?.tag;
};
export const methodSelect: DefaultOptionType[] = [
  { value: "POST,GET", label: "Tất cả", filter: true },
  { value: "POST", label: "POST", tag: "green" },
  { value: "GET", label: "GET", tag: "blue" },
];

const statusSelect: DefaultOptionType[] = [
  { value: "O,C", label: "Tất cả" },
  { value: "O", label: "Đang hoạt động", tag: "green" },
  { value: "C", label: "Đã ngừng hoạt động", tag: "red" },
];

type FilterProps = {
  handleFilter: (params: ApiUriFilter, signal: AbortSignal | null) => void;
  applicationList: Application[];
  filter: ApiUriFilter;
};
export const Filter = ({
  handleFilter,
  applicationList,
  filter,
}: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: ApiUriFilter) => {
    const params = {
      ...value,
      pageSize: filter.pageSize,
      pageNumber: filter.pageNumber,
      applicationId: convertArrayParam(value.applicationId as []),
    };

    handleFilter(params, null);
  };

  const handleClearFilter = () => {
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue({
      ...filter,
      applicationId: filter.applicationId || ALL,
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
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Tên api"
                        name="apiName"
                        tooltip="Tên api cần tìm"
                      >
                        <InputCustom placeholder="Tên api" />
                      </Form.Item>
                    </Col>

                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Mã action api"
                        name="action"
                        tooltip="Mã action api"
                      >
                        <InputCustom placeholder="Mã action api" />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái api cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn trạng thái"
                          mode="multiple"
                          options={[
                            {
                              value: ALL,
                              label: "Tất cả",
                            },
                            ...statusSelect,
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Ứng dụng"
                        name="applicationId"
                        tooltip="Api thuộc ứng dụng"
                      >
                        <SelectCustom
                          placeholder="Chọn ứng dụng"
                          mode="multiple"
                          options={[
                            {
                              value: ALL,
                              label: "Tất cả",
                            },
                            ...applicationList.map((item) => {
                              return {
                                value: item.applicationId,
                                label: item.applicationName,
                              };
                            }),
                          ]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item>
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
