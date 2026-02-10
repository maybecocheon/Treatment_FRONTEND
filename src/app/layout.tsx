import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Toaster } from "sonner";

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
  icons: "/water_drop.svg",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  // 카카오맵 api
  const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_API;

  return (
    <html lang="ko">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col w-full min-h-dvh overflow-x-hidden">
          <main className="w-full min-h-dvh">
            {children}
          </main>
          <Script src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`} strategy="beforeInteractive" />
          <Toaster
            position="top-center"
            richColors
            visibleToasts={1}
            toastOptions={{
              classNames: {
                toast: "pl-6 pr-4 py-4 rounded-2xl border-sky-100 bg-white/90 backdrop-blur-md shadow-lg",
                title: "text-slate-900 font-bold ml-3",
                description: "text-slate-500 text-xs ml-3",
                icon: "scale-125",
              }
            }} />
        </div>
      </body>
    </html>
  );
}
