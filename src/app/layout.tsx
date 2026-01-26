'use client'
import { Provider } from "react-redux";
import "./globals.css";
import Wrapper from "./Wrapper";
import store from "@/store/store";
import { setMessageInstance } from "@/config/messageContext";

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
          {messageContextHolder}
          <Wrapper>
            {children}
          </Wrapper>
        </Provider>
      </body>
    </html>
  );
}
