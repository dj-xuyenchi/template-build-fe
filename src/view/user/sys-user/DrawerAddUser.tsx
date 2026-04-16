import { ButtonCustom } from "@/component/ButtonCustom";
import { DatePickerCustom } from "@/component/DatepickerCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { TextAreaCustom } from "@/component/TextAreaCustom";
import { Col, Drawer, Form, Row, Space } from "antd";

export const DrawerAddUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  return (
    <>
      <Drawer
        title="Tạo mới người dùng hệ thống"
        onClose={handleClose}
        open={open}
        key={"placement"}
        size={900}
        extra={
          <Space>
            <ButtonCustom onClick={handleClose}>Cancel</ButtonCustom>
            <ButtonCustom onClick={handleClose} type="primary">
              Submit
            </ButtonCustom>
          </Space>
        }
      >
        <Form layout="vertical" requiredMark={false}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Name"
                rules={[{ required: true, message: "Please enter user name" }]}
              >
                <InputCustom placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[{ required: true, message: "Please enter url" }]}
              >
                <SelectCustom
                  placeholder="Please select an owner"
                  options={[
                    { label: "Xiaoxiao Fu", value: "xiao" },
                    { label: "Maomao Zhou", value: "mao" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[{ required: true, message: "Please select an owner" }]}
              >
                <SelectCustom
                  placeholder="Please select an owner"
                  options={[
                    { label: "Xiaoxiao Fu", value: "xiao" },
                    { label: "Maomao Zhou", value: "mao" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[{ required: true, message: "Please choose the type" }]}
              >
                <SelectCustom
                  placeholder="Please choose the type"
                  options={[
                    { label: "private", value: "private" },
                    { label: "public", value: "public" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  { required: true, message: "Please choose the approver" },
                ]}
              >
                <SelectCustom
                  placeholder="Please choose the approver"
                  options={[
                    { label: "Jack Ma", value: "jack" },
                    { label: "Tom Liu", value: "tom" },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  { required: true, message: "Please choose the dateTime" },
                ]}
              >
                <DatePickerCustom
                  style={{ width: "100%" }}
                  getPopupContainer={(trigger) => trigger.parentElement!}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: "please enter url description",
                  },
                ]}
              >
                <TextAreaCustom
                  rows={4}
                  placeholder="please enter url description"
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
