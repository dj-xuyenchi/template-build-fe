import { sysUserApi } from "@/api/sysUserApi";
import { ButtonCustom } from "@/component/ButtonCustom";
import { InputCustom } from "@/component/InputCustom";
import { SelectCustom } from "@/component/SelectCustom";
import { CreateSysUserRequest } from "@/model/cms/system-user/CreateSysUserRequest";
import { Avatar, Col, Drawer, Form, Row, Space, UploadFile } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { UploadFileCustom } from "@/component/UploadFileCustom";
import { UploadChangeParam } from "antd/es/upload";
import { useEffect, useState } from "react";
import { roleApi } from "@/api/roleApi";
import { GetRoleFilter } from "@/model/cms/role/GetRoleFilter";
import { ROLE_ACTIVE, RoleDTO } from "@/model/cms/role/RoleDTO";
import { mediaApi } from "@/api/mediaApi";

export const DrawerAddUser = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [fileKey, setFileKey] = useState<string>("");
  const [allowRole, setAllowRole] = useState([] as { label: string; value: string }[]);
  const FIX_ROLE = "DEFAULT_USER"
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
        avatarKey: fileKey,
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
  const handleUpload = (fileKey: UploadChangeParam<UploadFile<unknown>>) => {
    console.error("File key:", fileKey);
    const file = fileKey.file;

    if (file.status === "done") {
      // 🔥 lấy response từ API
      const res = file.response as { code: string; data: { fileKey: string }[] };

      if (res?.code === "SUCCESS") {
        setFileKey(res.data[0].fileKey);
        const url = mediaApi.loadImage({ imgKey: res.data[0].fileKey }); // ⚠️ sửa đúng field API của bạn
        setAvatarUrl(url);
      }
    }
  };
  const getAllowRole = async () => {
    const res = await roleApi.getRole({
      status: [ROLE_ACTIVE],
    } as GetRoleFilter);
    console.error(res);
    if (res.code === "SUCCESS") {
      const data = res.data as RoleDTO[];
      setAllowRole(
        data.map((item) => ({
          label: item.roleName,
          value: item.roleCode,
        }))
      );
    }
  };
  useEffect(() => {
    getAllowRole();
  }, []);
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
                rules={[
                  { required: true, message: "Vui lòng nhập không để trống" },
                ]}
              >
                <Avatar size={64} icon={<UserOutlined />} src={avatarUrl} />
                <UploadFileCustom maxCount={1} onChange={handleUpload} />
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
                  mode="multiple"
                  defaultValue={[FIX_ROLE]}
                  options={
                    allowRole
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};
