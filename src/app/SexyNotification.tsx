"use client";
import clsx from "clsx";
import styles from "./styles.module.scss";
import "./globals.css";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import empty from "../../public/empty.webp";
import { Badge, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { onMessage } from "firebase/messaging";

import { requestFcmToken, messaging } from "@/config/firebase";
import { NotificationDTO } from "@/model/push-noti/NotificationDTO";
import { authApi } from "@/api/authApi";
export const SexyNotification = ({ isShow = false }) => {
  const [activeType, setActiveType] = useState(1);
  const [notifications, setNotifications] = useState([
    {
      title: "Xin chaào",
      shortContent:
        "xin chào các bạn minmhf là doggi rất hawancj hahiahisidhasdiascascsadcsdvsdvsdvsdvssdv",
      sendTime: "4 ngày trước",
    },
  ] as NotificationDTO[]);

  // Chỗ này để gọi call back khi nhận noti sẽ chạy hàm nào
  const appSlice = useSelector((state: RootState) => state.global.appSlice);
  // appSlice.callBack("");
  const clearClickEvent = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const handleSetActiveType = (value: number) => {
    setActiveType(value);
  };
  useEffect(() => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Foreground message:", payload);
        setNotifications((prev) => [
          {
            title: payload.notification?.title || "New message",
            shortContent: payload.notification?.body || "",
            sendTime: "vừa xong",
            isRead: false,
          },
          ...prev,
        ]);
      });
    }
  }, []);

  return (
    <>
      <div
        onClick={clearClickEvent}
        className={clsx(
          styles.notiContainer,
          isShow ? "show-with-magic" : "disappear-with-magic",
        )}
      >
        <div className={styles.notiContainerDetail}>
          <div className={styles.notiHeader}>
            <p className={styles.title}>Thông báo</p>
            <p className={styles.readAll}>Đánh dấu đã đọc</p>
          </div>
          <div className={styles.notiType}>
            <div
              onClick={() => {
                handleSetActiveType(1);
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === 1 ? styles.active : "",
              )}
            >
              Tất cả
            </div>
            <div
              onClick={() => {
                handleSetActiveType(2);
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === 2 ? styles.active : "",
              )}
            >
              Hôm nay
            </div>
            <div
              onClick={() => {
                handleSetActiveType(3);
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === 3 ? styles.active : "",
              )}
            >
              Chưa đọc
            </div>
          </div>
          <div className={clsx("hide-scrollbar", styles.content)}>
            {(!notifications || notifications.length === 0) && (
              <>
                <div className={styles.noData}>
                  <div>
                    <Image alt="empty" height={60} width={60} src={empty} />
                  </div>
                  <span>Không có dữ liệu</span>
                </div>
              </>
            )}
            <Spin spinning={false} size="large">
              {notifications.map((noti, index) => {
                return (
                  <div
                    key={index}
                    className={clsx(
                      styles.notiItemContainer,
                      noti.isRead && styles.hasRead,
                    )}
                  >
                    <div className={styles.title}>
                      <span>{noti.title}</span>
                    </div>
                    <div className={styles.contentNoti}>
                      <span>{noti.shortContent}</span>
                    </div>
                    <div className={styles.sendTime}>
                      <span>{noti.sendTime}</span>
                    </div>
                    {!noti.isRead && (
                      <div className={styles.processing}>
                        <Badge size="default" status="processing" />
                      </div>
                    )}
                  </div>
                );
              })}
            </Spin>
          </div>
        </div>
      </div>
    </>
  );
};
