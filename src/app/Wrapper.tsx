"use client";
import { FaSignOutAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import "./globals.css";
import "@/config/styleTableSexy.css";
import { IoMdNotificationsOutline } from "react-icons/io";
import { TbLockPassword } from "react-icons/tb";
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Col,
  Dropdown,
  Layout,
  Menu,
  Row,
} from "antd";
import { Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { MouseEvent, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { authApi } from "@/api/authApi";
import { setUserInformation } from "./globalSlice";
import { useDispatch, useSelector } from "react-redux";
import type { MenuProps } from "antd";
import { SexyNotification } from "./SexyNotification";
import clsx from "clsx";
import { SelectCustom } from "@/component/SelectCustom";
import { RootState } from "@/store/store";
import { goPage } from "@/config/menu/letsGo";
import { buildMenu } from "@/config/menu/menu";
import { handleLogout } from "@/util/authen-service/authenService";
import { TOKEN_KEY } from "@/constant/authen/authenConst";
import { GetUserInformationFilter } from "@/model/login/GetUserInformationFilter";
import { FeatureAsMenu } from "@/model/feature/FeatureAsMenu";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  height: 64,
  lineHeight: "64px",
  padding: "0 24px",
  background: "white",
};

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  background: "#323A48",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
};
const logoStyle: React.CSSProperties = {
  height: "32px",
  margin: "16px",
  background: " rgba(255, 255, 255, .2)",
  borderRadius: "6px",
};

export default function Wrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [showNoti, setShowNoti] = useState(false);
  const [subMenuValue, setSubMenuValue] = useState("");
  const [subMenuOptions, setSubMenuOptions] = useState([] as { value: string; label: string }[]);
  const [isLogin, setIsLogin] = useState(false);
  const [menus, setMenus] = useState([] as MenuProps["items"]);

  const global = useSelector((state: RootState) => state.global);
  const appSlice = useSelector((state: RootState) => state.global.appSlice);

  const dispatch = useDispatch();

  const handleUnShowNoti = (e: MouseEvent) => {
    if (!showNoti) {
      return;
    }
    e.stopPropagation();
    setShowNoti(false);
  };
  const handleShowNoti = (e?: React.MouseEvent<HTMLElement>) => {
    if (showNoti || !e) {
      return;
    }
    e.stopPropagation();
    setShowNoti(true);
  };

  const handleClickMenu = (menuItem: { key: string; }) => {
    if (!menus) {
      return;
    }
    console.error("handleClickMenu", menuItem);

    for (const m of menus) {
      const menu = m as FeatureAsMenu;
      if (menu.key === menuItem.key) {
        handleGoPage(menu.key, false);
      }
      if (menu.children) {
        const child = menu.children.find((child) => child.key === menuItem.key);
        if (child) {
          handleGoPage(child.key, false);
        }
      }
    }
  };
  const handleGoPage = (key: string, isFromSubmenu?: boolean) => {
    console.info("handleGoPage", key);

    if (key) {
      if (typeof window !== "undefined") {
        localStorage.setItem("_sub-selected", key);
      }
      router.push(goPage(key, { id: 1 }));
      if (!isFromSubmenu) {
        setSubMenuValue(key);
      }
    }
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Đỗ Quang Anh",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: "Đổi mật khẩu",
      icon: <TbLockPassword />,
      extra: "",
    },
    {
      key: "4",
      label: "Đăng xuất",
      icon: <FaSignOutAlt />,
      extra: "",
      onClick: handleLogout
    },
  ];
  const handleGetUserInformation = async () => {
    try {
      const requestParam = {
        isTakeAllowFeatureList: true
      } as GetUserInformationFilter
      const res = await authApi.getUserInformation(requestParam);
      const data = res.data;
      const menuData = buildMenu(data.features || []);

      setMenus(menuData);
      setSubMenuOptions([{ value: "/cms/role", label: "Quản lý quyền" }]);
      dispatch(setUserInformation(data));

    } catch (e) {
      console.error(e);
    } finally { }
  }


  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      handleGetUserInformation();
      setIsLogin(!!token);

      window.scrollTo(0, 0);
      if (typeof window !== "undefined") {
        const sub = localStorage.getItem("_sub") || "";
        const subSelected = localStorage.getItem("_sub-selected");
        let parsedSub = [];
        try {
          parsedSub = sub ? JSON.parse(sub) : [];
        } catch (error) {
          parsedSub = [];
        }
        setSubMenuValue(subSelected || "");
      }
    }
    return () => { };
  }, []);
  return (
    <>
      {isLogin && (
        <Layout style={{
        }} hasSider onClick={handleUnShowNoti}>
          <Sider
            className="menu"
            trigger={null}
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            width="280px"
            style={siderStyle}
          >
            <div style={logoStyle} />
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={menus}
              onClick={handleClickMenu}
            />
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <div className={styles.headerWrapper}>
              <Header style={headerStyle}>
                <Row
                  justify="space-between"
                  style={{
                    height: "64px",
                  }}
                >
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      type="text"
                      icon={
                        collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                      }
                      onClick={() => setCollapsed(!collapsed)}
                      style={{
                        fontSize: "16px",
                      }}
                    ></Button>
                    <Breadcrumb
                      className={styles.appBreadcrumb}
                      separator=">"
                      items={[
                        {
                          title: "Home",
                        },
                        {
                          title: "Quản trị hệ thống",
                          href: "",
                        },
                      ]}
                    />
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Badge
                      className={styles.notiBell}
                      overflowCount={9}
                      count={11}
                    >
                      <Avatar
                        className={styles.antAvatar}
                        shape="circle"
                        icon={<IoMdNotificationsOutline />}
                        onClick={handleShowNoti}
                      />
                      <SexyNotification isShow={showNoti} />
                    </Badge>
                    <Dropdown menu={{ items }}>
                      <div className={styles.avatarContainer}>
                        <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                      </div>
                    </Dropdown>
                  </Col>
                </Row>
              </Header>
              <div className={clsx(styles.breadcrumbSubfunction)}>
                <Breadcrumb
                  items={[{ title: "Home" }, { title: "List" }, { title: "App" }]}
                  style={{ margin: "12px 0" }}
                />
                <div className={styles.subContainer}>
                  <SelectCustom
                    placeholder="Chọn chức năng"
                    value={subMenuValue}
                    style={{
                      minWidth: "240px",
                    }}
                    onChange={(value) => {
                      handleGoPage(value, true);
                    }}
                    options={subMenuOptions}
                  />
                </div>
              </div>
            </div>
            <div
              className={styles.contentWrapper}
            >
              {children}
            </div>

            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Layout>
      )}
      {!isLogin && children}
    </>
  );
}
