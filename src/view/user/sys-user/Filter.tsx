import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
import { useEffect } from "react";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { GetSystemUserFilter } from "@/api/sysUserApi";
import { authApi } from "@/api/authApi";

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
export const statusSelect: DefaultOptionType[] = [
  { value: null, label: "Tất cả" },
  { value: "ACTIVE", label: "Đang hoạt động", tag: "green" },
  { value: "LOCK", label: "Tạm khóa", tag: "warning" },
  { value: "ARCHIVE", label: "Lưu trữ", tag: "warning" },
];

type FilterProps = {
  handleFilter: (
    params: GetSystemUserFilter,
    signal: AbortSignal | null,
  ) => void;
  filter: GetSystemUserFilter;
  systemList: { label: string; value: number }[];
};
export const Filter = ({ handleFilter, filter, systemList }: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (value: GetSystemUserFilter) => {
    const params = {
      ...value,
    };

    handleFilter(params as GetSystemUserFilter, null);
    const m = authApi.testNoti(
      "fli8PVzVZyJ50IbWdFk_2S:APA91bEosigmYJx4P-R7b5QJ1xK-OjYPt1sFfAExzSMTLih4T8yKeDdtBh3yLTc5SnOuayiwuwZW7dR73v77u16gAkjGUq-0yjO91nD-XXftoLSNoWjBAJ8",
    );
    console.log(m);
  };
  const handleClearFilter = () => {
    form.resetFields();
  };

  useEffect(() => {
    form.setFieldsValue({
      ...filter,
    });
  }, [filter, form]);
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
                        label="User name"
                        name="userName"
                        tooltip="Tên người dùng"
                      >
                        <InputCustom placeholder="Tên người dùng" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Mã code NV"
                        name="code"
                        tooltip="Mã code nhân viên"
                      >
                        <InputCustom placeholder="Mã code nhân viên" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Tên nhân viên"
                        name="fullName"
                        tooltip="Tên nhân viên"
                      >
                        <InputCustom placeholder="Tên nhân viên" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item label="Email" name="email" tooltip="Email">
                        <InputCustom placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={8} lg={6} xl={6}>
                      <Form.Item
                        label="Số điện thoại"
                        name="phoneNumber"
                        tooltip="Số điện thoại"
                      >
                        <InputCustom placeholder="Số điện thoại" />
                      </Form.Item>
                    </Col>
                    <Col span={12} md={12} lg={6} xl={6}>
                      <Form.Item
                        label="Trạng thái"
                        name="status"
                        tooltip="Trạng thái cần tìm"
                      >
                        <SelectCustom
                          mode="multiple"
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
