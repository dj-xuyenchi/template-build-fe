import { Metadata } from "next";
import ClientProviders from "./ClientProvider";

export const metadata: Metadata = {
  title: "Quản trị hệ thống",
  description: "Quản trị hệ thống 17LAB",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
