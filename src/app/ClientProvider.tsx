"use client";

import { Provider } from "react-redux";
import { App as AntApp } from "antd";
import store from "@/store/store";
import Wrapper from "./Wrapper";
import { setMessageInstance } from "@/config/push-noti-message/messageContext";
import { NotifyContextHolder } from "@/config/push-noti-message/notifyContext";
import { ModalProvider } from "@/config/push-noti-message/ModalConfigHolder";
import { useEffect } from "react";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const messageContextHolder = setMessageInstance();
  useEffect(() => {
    Notification.requestPermission().then((p) => {
      console.log("Permission:", p);
    });
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);
        })
        .catch((err) => {
          console.error("SW register failed:", err);
        });
    }
  }, []);
  return (
    <Provider store={store}>
      <AntApp>
        <ModalProvider>
          <NotifyContextHolder />
          {messageContextHolder}
          <Wrapper>{children}</Wrapper>
        </ModalProvider>
      </AntApp>
    </Provider>
  );
}
