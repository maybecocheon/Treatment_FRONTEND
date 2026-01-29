import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FLOWISE",
  description: "스마트 물 관리 솔루션 - 실시간 배수지 모니터링 및 수위 예측 플랫폼",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  // 카카오맵 api
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API;

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`} strategy="beforeInteractive" />
        <Footer />
      </body>
    </html>
  );
}
