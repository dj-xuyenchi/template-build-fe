import { sysUserApi } from "@/api/sysUserApi";
import { ButtonCustom } from "@/component/ButtonCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { CreateSysUserRequest } from "@/model/cms/system-user/CreateSysUserRequest";
import { Avatar, Col, Drawer, Form, Row, Space } from "antd";
import { statusSelect } from "./Filter";
import { UserOutlined } from "@ant-design/icons";
import { UploadFileCustom } from "@/component/UploadFileCustom";

export const DrawerAddUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    form.submit();
  };
  const handleCreateUser = async (values: CreateSysUserRequest) => {
    try {
      const payload = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phoneNumber: values.phoneNumber,
        status: values.status,
      };

      const res = await sysUserApi.createSysUser(payload);

      if (res?.code == "SUCCESS") {
        // tuỳ bạn dùng message hay toast
        form.resetFields();
        handleClose();
      }
    } catch (error) {
      console.error("Lỗi tạo user", error);
    }
  };
  const getAllowRole =()=>{
    
  }
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
              onClick={handleOk}
              type="primary"
              title="Xác nhận"
            ></ButtonCustom>
          </Space>
        }
      >
        <Form form={form} layout="vertical" onFinish={handleCreateUser}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="avatar"
                rules={[
                  { required: true, message: "Vui lòng nhập không để trống" },
                ]}
              >
                <Avatar size={64} icon={<UserOutlined />} />{" "}
                <UploadFileCustom />
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
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: "Vui lòng nhập email" }]}
              >
                <InputCustom placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phoneNumber" label="Số điện thoại">
                <InputCustom placeholder="Số điện thoại" />
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
                <SelectCustom
                  placeholder="Chọn quyền"
                  options={[
                    ...statusSelect.filter((s) => {
                      return s.value;
                    }),
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
