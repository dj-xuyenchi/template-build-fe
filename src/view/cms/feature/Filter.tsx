import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect, useState } from "react";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import { FeatureDTO } from "@/model/cms/feature/FeatureDTO";
import { SystemDTO } from "@/model/cms/system/SystemDTO";

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
  { value: "ARCHIVE", label: "Lưu trữ", tag: "orange" },
];

type FilterProps = {
  handleFilter: (params: GetRoleFilter, signal: AbortSignal | null) => void;
  filter: GetRoleFilter;
  systemList: SystemDTO[];
  features: { label: string; value: number }[];
};
export const Filter = ({
  handleFilter,
  filter,
  systemList,
  features,
}: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: GetRoleFilter) => {
    console.log("Filter value: ", value);

    const params = {
      ...value,
      pageSize: filter.pageSize,
      pageNumber: filter.pageNumber,
      // status: convertArrayParam(value.status as ConvertArrayParam[]),
    };

    handleFilter(params as GetRoleFilter, null);
  };
  const handleOnchange = (value: string) => {
    if (value != "E") {
      form.setFieldsValue({
        effectiveFrom: null,
        effectiveTo: null,
      });
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
                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="Tên chức năng"
                        name="featureName"
                        tooltip="Tên chức năng cần tìm"
                      >
                        <InputCustom placeholder="Tên chức năng" />
                      </Form.Item>
                    </Col>

                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="Mã chức năng"
                        name="featureCode"
                        tooltip="Mã chức năng cần tìm"
                      >
                        <InputCustom placeholder="Mã chức năng" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="Hệ thống"
                        name="systemId"
                        tooltip="Hệ thống cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn hệ thống"
                          mode="multiple"
                          options={[
                            ...systemList.map((s) => {
                              return {
                                label: s.systemName,
                                value: s.systemId,
                              };
                            }),
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn trạng thái"
                          mode="multiple"
                          options={[...statusSelect]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="Chức năng cha"
                        name="parentId"
                        tooltip="Chức năng cha cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn chức năng cha"
                          options={[...features]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={4}>
                      <Form.Item
                        label="URI chức năng"
                        name="feUri"
                        tooltip="URI chức năng cần tìm"
                      >
                        <InputCustom placeholder="Nhập URI chức năng" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={5}>
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
                    <Col span={12} md={12} lg={6} xl={5}>
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
                    <Col span={12} md={12} lg={6} xl={5}>
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
