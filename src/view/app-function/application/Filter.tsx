import { ApplicationFilter } from "@/api/applicationApi";
import { ButtonCustom } from "@/component/ButtonCustom";
import { CollapseCustom } from "@/component/CollapseCustom";
import { FormCustom } from "@/component/FormCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { Col, Form, Row } from "antd";
import { DefaultOptionType } from "antd/es/select";
const statusSelect: DefaultOptionType[] | undefined = [
  { value: "O,C", label: "Tất cả" },
  { value: "O", label: "Đang hoạt động" },
  { value: "C", label: "Đã ngừng hoạt động" },
];
type FilterProps = {
  handleFilter: (params: ApplicationFilter, signal: AbortSignal | null) => void;
};
export const Filter = ({ handleFilter }: FilterProps) => {
  const [form] = Form.useForm();
  const onFinish = (values: ApplicationFilter) => {
    console.error(values);
    alert(values);
    handleFilter(
      {
        ...values,
      },
      null
    );
  };
  const handleClearFilter = () => {
    form.resetFields();
  };
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
                        label="Tên ứng dụng"
                        name="applicationName"
                        tooltip="Tên chức năng cần tìm"
                      >
                        <InputCustom placeholder="Tên chức năng" />
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
