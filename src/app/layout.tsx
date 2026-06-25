import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";

const notoThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Odoo ERP Workshop",
  description: "ระบบอบรมพื้นฐาน Odoo ERP Cloud Base — Full Loop: Make-to-Order",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th" className={notoThai.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
