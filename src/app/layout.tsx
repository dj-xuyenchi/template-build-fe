"use client";
import { Provider } from "react-redux";
import "./globals.css";
import Wrapper from "./Wrapper";
import store from "@/store/store";
import { setMessageInstance } from "@/config/push-noti-message/messageContext";
import { App as AntApp } from "antd";
import { NotifyContextHolder } from "@/config/push-noti-message/notifyContext";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messageContextHolder = setMessageInstance();
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AntApp>
            <NotifyContextHolder />
            {messageContextHolder}
            <Wrapper>{children}</Wrapper>{" "}
          </AntApp>
        </Provider>
      </body>
    </html>
  );
}
