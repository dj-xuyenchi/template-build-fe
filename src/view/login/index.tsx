"use client";
import Image from "next/image";
import styles from "./login.module.scss";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LoginRequest } from "@/model/login/LoginRequest";
import { authApi } from "@/api/authApi";
import { encryptRSA } from "@/util/authen-service/rsaEncrypt";
import { API_OK } from "@/constant/api/errorCode";
import { getMessageInstance } from "@/config/push-noti-message/messageContext";
import { useRouter } from "next/navigation";
import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/constant/authen/authenConst";
export default function Login() {
  const FE_ROOT = process.env.NEXT_PUBLIC_PRODUCTION_URL;
  const [loginModel, setLoginModel] = useState({} as LoginRequest);
  const [traceModeOpen, setTraceModeOpen] = useState(false);
  const messageApi = getMessageInstance();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loginRes = await authApi.login({
        ...loginModel,
        password: encryptRSA(loginModel.password),
      });

      if (loginRes.code == API_OK) {
        if (!loginRes.errorCode) {
          if (typeof window !== "undefined") {
            localStorage.setItem(TOKEN_KEY, loginRes.data.accessToken);
            localStorage.setItem(REFRESH_TOKEN_KEY, loginRes.data.refreshToken);
            window.location.href = FE_ROOT || "/";
            return;
          }
        }
      }
      messageApi.error("Sai tên tài khoản hoặc mật khẩu!");
    } catch (e) {
      console.error(e);
    }
  };
  const handleSetUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginModel({
      ...loginModel,
      userName: e.target.value,
    });
  };
  const handleSetPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginModel({
      ...loginModel,
      password: e.target.value,
    });
  };

  useEffect(() => {
    const debug = (e: KeyboardEvent) => {
      if (e.key === "`") {
        setTraceModeOpen(true);
      }
    };
    window.addEventListener("keydown", debug);
    return () => window.removeEventListener("keydown", debug);
  }, []);
  return (
    <>
      <div className={styles.login}>
        <Row className={styles.formContainer}>
          <div className={styles.loginForm}>
            <div className={styles.row}>
              <Image
                style={{
                  height: "72px",
                  width: "auto",
                }}
                src={
                  "https://cdn.cdnstep.com/PmLsksBbHjSIYWXElfI5/cover-1.thumb128.png"
                }
                alt="logo"
                width={24}
                height={24}
              />
            </div>
            <div
              className={styles.row}
              style={{
                marginTop: "18px",
              }}
            >
              <Form
                onFinish={handleLogin}
                style={{
                  width: "100%",
                }}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập user đăng nhập!",
                    },
                  ]}
                >
                  <Input
                    style={{
                      borderRadius: "3px",
                      height: "48px",
                    }}
                    onChange={handleSetUserName}
                    placeholder="Email"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu!",
                    },
                  ]}
                  style={{
                    marginBottom: "8px",
                  }}
                >
                  <Input.Password
                    style={{
                      borderRadius: "3px",
                      height: "48px",
                    }}
                    onChange={handleSetPass}
                    placeholder="Mật khẩu"
                  />
                </Form.Item>
                <Form.Item
                  style={{
                    marginBottom: "12px",
                  }}
                >
                  <Link
                    href={"quen-mat-khau"}
                    style={{
                      color: "#48E000",
                    }}
                  >
                    Quên mật khẩu?
                  </Link>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      width: "100%",
                      borderRadius: "3px",
                      height: "48px",
                      fontSize: "18px",
                      backgroundColor: "#48E000",
                    }}
                    type="primary"
                    htmlType="submit"
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
            <div className={styles.row}>
              <Divider className={styles.divi} plain>
                Hoặc đăng nhập với
              </Divider>
            </div>
            <div className={styles.row}></div>
            <div
              className={styles.row}
              style={{
                marginTop: "8px",
              }}
            ></div>
          </div>
          <p className={styles.footerText}>
            Copyright © 2015 - {new Date().getFullYear()} 17LAB SERVICES
            TECHNOLOGY
          </p>
        </Row>
      </div>
    </>
  );
}
