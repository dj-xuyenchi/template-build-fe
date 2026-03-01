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
import {
  BREADSCRUMB,
  SUB_MENU,
  TOKEN_KEY,
} from "@/constant/authen/authenConst";
import { GetUserInformationFilter } from "@/model/login/GetUserInformationFilter";
import { FeatureAsMenu } from "@/model/feature/FeatureAsMenu";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { setBreadscrumbToLocalStorage } from "@/util/common-home/breadscrumbService";
import { setSubmenuToLocalStorage } from "@/util/common-home/subMenuService";

const FE_URL = process.env.NEXT_PUBLIC_FE_URL;
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
  const [subMenuOptions, setSubMenuOptions] = useState(
    [] as { value: string; label: string }[],
  );
  const [isLogin, setIsLogin] = useState(false);
  const [menus, setMenus] = useState([] as MenuProps["items"]);
  const home = { title: "Home", href: FE_URL } as {
    title: string;
    href: string | null;
  };
  const [breadcrumb, setBreadcrumb] = useState([home] as {
    title: string;
    href: string | null;
  }[]);

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


  //  chưa xong đoạn chọn submenu thiếu menu cho trong select option
  const handleClickMenu = (
    { key }: { key: string },
    isFromSubmenu: boolean,
  ) => {
    const featureList = global.userApp.features;
    handleGoPage(key, isFromSubmenu);

    // Action submenu
    const featureSelected = featureList.find((item) => {
      return item.feUri == key;
    });
    const subFeature = featureList.filter((item) => {
      return item.isSubMenu && item.parentId == featureSelected?.featureId;
    });
    const subFeature2Option = subFeature.map((item) => {
      return {
        value: item?.feUri as string,
        label: item?.feLabel as string,
      };
    });
    const submenu = [
      {
        value: featureSelected?.feUri as string,
        label: featureSelected?.feLabel as string,
      },
      ...subFeature2Option,
    ];
    setSubMenuOptions(submenu);
    setSubmenuToLocalStorage(submenu as []);
    // Action breadscrumb
    const ancestors = getAncestors(key);
    const otherTab = ancestors.map((item) => {
      return {
        href: item.feUri,
        title: item.feLabel,
      };
    });

    const breadscumbNew = [home, ...otherTab];

    setBreadcrumb(breadscumbNew);
    setBreadscrumbToLocalStorage(breadscumbNew as []);
  };
  const getAncestors = (key: string) => {
    const featureList = global.userApp.features;
    const featureSelected = featureList.find((item) => {
      return item.feUri == key;
    });

    const map = new Map();

    // Tạo lookup map cho nhanh O(1)
    featureList.forEach((item) => {
      map.set(item.featureId, item);
    });

    const ancestors = [];
    let current = map.get(featureSelected?.featureId);

    while (current && current.parentId != null) {
      const parent = map.get(current.parentId);
      if (!parent) break;

      ancestors.push(parent);
      current = parent;
    }

    return ancestors.reverse();
  };

  const handleGoPage = (key: string, isFromSubmenu?: boolean) => {
    console.info("handleGoPage", key);

    if (key) {
      router.push(goPage(key, {}));
      setSubMenuValue(key);
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
      onClick: handleLogout,
    },
  ];
  const handleGetUserInformation = async () => {
    try {
      const requestParam = {
        isTakeAllowFeatureList: true,
      } as GetUserInformationFilter;
      const res = await authApi.getUserInformation(requestParam);
      const data = res.data;
      const menuData = buildMenu(data.features || []);

      setMenus(menuData);
      dispatch(setUserInformation(data));
      const _b = localStorage.getItem(BREADSCRUMB);
      const _sm = localStorage.getItem(SUB_MENU);
      if (_b) {
        setBreadcrumb(JSON.parse(_b));
      }
      if (_sm) {
        setSubMenuOptions(JSON.parse(_sm));
      }
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const fullUrl = window.location.href;
    if (fullUrl == FE_URL + "/login") {
      return;
    }
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
    } else {
      router.push(FE_URL + "/login");
    }
    return () => {};
  }, []);
  return (
    <>
      {isLogin && (
        <Layout style={{}} hasSider onClick={handleUnShowNoti}>
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
              onClick={(value) => {
                handleClickMenu(value, false);
              }}
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
                        collapsed ? (
                          <MenuUnfoldOutlined />
                        ) : (
                          <MenuFoldOutlined />
                        )
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
                          href: FE_URL,
                        },
                        {
                          title: "Quản trị hệ thống",
                          href: FE_URL,
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
                  items={breadcrumb as ItemType[]}
                  style={{ margin: "12px 0" }}
                />
                <div className={styles.subContainer}>
                  <SelectCustom
                    placeholder="Chọn chức năng"
                    value={subMenuValue}
                    style={{
                      minWidth: "240px",
                    }}
                    onChange={(value: string) => {
                      console.error(value);

                      handleClickMenu({ key: value }, true);
                    }}
                    options={subMenuOptions}
                  />
                </div>
              </div>
            </div>
            <div className={styles.contentWrapper}>{children}</div>

            <Footer style={footerStyle}>Footer</Footer>
          </Layout>
        </Layout>
      )}
      {!isLogin && children}
    </>
  );
}
