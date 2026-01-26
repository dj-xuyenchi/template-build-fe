'use client'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // isValidToken()
  return (
    <>
      {children}
    </>
  );
}
