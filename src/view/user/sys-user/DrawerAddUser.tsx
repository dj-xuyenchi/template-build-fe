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
            <ButtonCustom onClick={handleClose} title="Hủy bỏ"></ButtonCustom>
            <ButtonCustom
              onClick={handleClose}
              type="primary"
              title="Xác nhận"
            ></ButtonCustom>
          </Space>
        }
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="userName"
                label="Tên đăng nhập"
                rules={[
                  { required: true, message: "Vui lòng nhập tên đăng nhập" },
                ]}
                required
              >
                <InputCustom placeholder="Tên đăng nhập" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                <InputCustom placeholder="Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="Họ"
                rules={[
                  { required: true, message: "Vui lòng nhập không để trống" },
                ]}
              >
                <InputCustom placeholder="Họ" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Tên"
                rules={[
                  { required: true, message: "Vui lòng nhập không để trống" },
                ]}
              >
                <InputCustom placeholder="Tên" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <InputCustom placeholder="Số điện thoại" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Trạng thái tài khoản"
                rules={[
                  { required: true, message: "Vui lòng chọn trạng thái" },
                ]}
              >
                <SelectCustom placeholder="Chọn trạng thái" options={[]} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="role"
                label="Phân quyền người dùng"
                rules={[
                  { required: true, message: "Vui lòng ít nhất 1 quyền" },
                ]}
              >
                <SelectCustom placeholder="Chọn quyền" options={[]} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
