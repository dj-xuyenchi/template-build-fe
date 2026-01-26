import { FunctionFilter } from "@/api/functionApi";
import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { DATE_TYPE1 } from "@/constant/dateFormat";
import dayjs from "dayjs";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useState } from "react";

export const getStatusLabel = (value: string) => {
  return statusSelect?.find((item) => {
    return item.value === value
  })?.label
}
export const getStatusTag = (value: string) => {
  return statusSelect?.find((item) => {
    return item.value === value
  })?.tag
}
const statusSelect: DefaultOptionType[] | undefined = [
  { value: "O,C", label: "Tất cả" },
  { value: "O", label: "Đang hoạt động", tag: 'green' },
  { value: "C", label: "Đã ngừng hoạt động", tag: 'red' },
];

export const getEffectTypeLabel = (value: string) => {
  return effectTypeSelect?.find((item) => {
    return item.value === value
  })?.label
}
export const effectTypeSelect: DefaultOptionType[] | undefined = [
  { value: "NE,E", label: "Tất cả" },
  { value: "NE", label: "Vĩnh viễn" },
  { value: "E", label: "Hiệu lực trong khoảng TG" },
];
type FilterProps = {
  handleFilter: (params: FunctionFilter,
    signal: AbortSignal | null) => void;
};
export const Filter = ({ handleFilter }: FilterProps) => {
  const [form] = Form.useForm();
  const [disableEffectDate, setDisableEffectDate] = useState(true)
  const onFinish = (value: FunctionFilter) => {
    const params = {
      ...value,
      effectFrom: value.effectFrom
        ? dayjs(value.effectFrom).format(DATE_TYPE1) // 🗓️ Format thành string
        : null,
      effectTo: value.effectTo
        ? dayjs(value.effectTo).format(DATE_TYPE1)
        : null,
    };
    handleFilter(params, null);
  };
  const handleChangeEffectType = (value: string[]) => {
    let isHasTypeE = false;
    for (const d of value) {
      if (d === 'E' || d === 'NE,E') {
        isHasTypeE = true;
        break;
      }
    }
    if (isHasTypeE) {
      setDisableEffectDate(false)
    } else {
      form.setFieldsValue({ effectFrom: null, effectTo: null });
      setDisableEffectDate(true)
    }
  }
  const handleClearFilter = () => {
    form.resetFields()
  }
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
                        label="Tên chức năng"
                        name="functionName"
                        tooltip="Tên ứng dụng cần tìm"
                      >
                        <InputCustom placeholder="Tên ứng dụng" />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Kiểu hiệu lực"
                        name="effectType"
                        tooltip="Kiểu hiệu lực chức năng cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn kiểu hiệu lực"
                          mode="multiple"
                          options={effectTypeSelect}
                          onChange={handleChangeEffectType}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Hiệu lực từ"
                        name="effectFrom"
                        tooltip="Chức năng có hiệu lực từ"
                      >
                        <DatePickerCustom placeholder="Hiệu lực từ" disabled={disableEffectDate} />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Hiệu lực đến"
                        name="effectTo"
                        tooltip="Chức năng có hiệu lực đến"
                      >
                        <DatePickerCustom placeholder="Hiệu lực đến" disabled={disableEffectDate} />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Mã chức năng"
                        name="functionCode"
                        tooltip="Mã chức năng cần tìm"
                      >
                        <InputCustom placeholder="Tên ứng dụng" />
                      </Form.Item>
                    </Col>
                    <Col span={6} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái ứng dụng cần tìm"
                      >
                        <SelectCustom
                          placeholder="Chọn trạng thái"
                          mode="multiple"
                          options={statusSelect}
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
