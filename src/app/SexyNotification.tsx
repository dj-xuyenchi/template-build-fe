"use client";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { MouseEvent, useEffect, useState } from "react";
import Image from "next/image";
import empty from "../../public/empty.webp";
import { Badge, Spin } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { onMessage } from "firebase/messaging";
import "./globals.css";

import { messaging } from "@/config/firebase";
import {
  NotificationDTO,
  ObjectNotification,
} from "@/model/push-noti/NotificationDTO";
import { authApi } from "@/api/authApi";
import { GetNotificationRequest } from "@/model/push-noti/GetNotficationRequest";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { notify } from "@/config/push-noti-message/notifyContext";
export const SexyNotification = ({ isShow = false }) => {
  const [activeType, setActiveType] = useState("ALL" as string);
  const [notifications, setNotifications] = useState([] as NotificationDTO[]);
  const [loadingMessage, setLoadingMessage] = useState(true);

  // Chỗ này để gọi call back khi nhận noti sẽ chạy hàm nào
  const appSlice = useSelector((state: RootState) => state.global.appSlice);
  // appSlice.callBack("");
  const clearClickEvent = (e: MouseEvent) => {
    e.stopPropagation();
  };
  const handleSetActiveType = async (value: string) => {
    setActiveType(value);
    try {
      setLoadingMessage(true);
      const res = await authApi.getNotification({
        option: value,
        system: "CMS",
      } as GetNotificationRequest);
      if ((res.code = "SUCCESS")) {
        const data = res.data as NotificationDTO[];
        const formatData = data.map((item) => {
          return {
            ...item,
            objectNotification: JSON.parse(item.objectContent),
          } as NotificationDTO;
        });
        console.error(formatData);

        setNotifications(formatData);
      } else {
        setNotifications([] as NotificationDTO[]);
      }
    } finally {
      setLoadingMessage(false);
    }
  };
  useEffect(() => {
    if (messaging) {
      onMessage(messaging, (payload) => {
        console.log("Message từ Firebase  -> ", payload);
        const notification = JSON.parse(
          payload.notification?.body || "",
        ) as ObjectNotification;
        switch (notification.typeNotification) {
          case "SUCCESS": {
            notify.success(notification.title, notification.shortContent);
            break;
          }
          case "ERROR": {
            notify.error(notification.title, notification.shortContent);
            break;
          }
          case "WARN": {
            notify.warning(notification.title, notification.shortContent);
            break;
          }
          case "INFO": {
            notify.info(notification.title, notification.shortContent);
            break;
          }
        }
        setNotifications((prev) => [
          {
            objectNotification: JSON.parse(payload.notification?.body || ""),
            formatTime: "Vừa xong",
          } as NotificationDTO,
          ...prev,
        ]);
      });
    }
    handleSetActiveType("ALL");
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
                handleSetActiveType("ALL");
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === "ALL" ? styles.active : "",
              )}
            >
              Tất cả
            </div>
            <div
              onClick={() => {
                handleSetActiveType("TODAY");
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === "TODAY" ? styles.active : "",
              )}
            >
              Hôm nay
            </div>
            <div
              onClick={() => {
                handleSetActiveType("UN_READ");
              }}
              className={clsx(
                styles.notiTypeDetail,
                activeType === "UN_READ" ? styles.active : "",
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
            <Spin spinning={loadingMessage} size="large">
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
                      <span>
                        {validAndFormatTitle(noti.objectNotification?.title)}
                      </span>
                    </div>
                    <div className={styles.contentNoti}>
                      <span>
                        {validAndFormatShortContent(
                          noti.objectNotification?.shortContent,
                        )}
                      </span>
                    </div>
                    <div className={styles.sendTime}>
                      <span>{noti.formatTime}</span>
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

const validAndFormatShortContent = (content: string | undefined) => {
  if (!content) return "";
  if (content.length <= 100) {
    return content;
  }
  return content.slice(0, 100) + " ...";
};
const validAndFormatTitle = (content: string | undefined) => {
  if (!content) return "";
  if (content.length <= 50) {
    return content;
  }
  return content.slice(0, 50) + " ...";
};
