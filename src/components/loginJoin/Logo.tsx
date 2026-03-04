'use client'

import { Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

interface LogoProps {
  variant?: "default" | "main";
  scale?: number;
}

export default function Logo({ variant = "default", scale = 1 }: LogoProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      style={{ transform: `scale(${scale})` }}
      className="relative z-10 flex flex-col items-center justify-center w-full 
        transition-all duration-1000 animate-in fade-in slide-in-from-top-4 
        cursor-pointer group"
    >
      <div className={`relative flex ${variant === "main" ? "flex-row" : "flex-col items-center"} gap-4`}>
        {/* 메인 아이콘 */}
        <div className="relative">
          <div className="relative bg-linear-to-br from-sky-400 to-blue-600 shadow-xl shadow-sky-500/30 p-5 rounded-4xl group-hover:scale-105">
            <Droplets className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* 텍스트 로고 */}
        <div className="flex flex-col items-center">
          <h1 className="text-6xl md:text-7xl font-black tracking-[calc(-0.05em)] text-foreground flex items-center">
            <span>FLOWISE</span>
          </h1>
          <p className="mt-3 text-sky-600 font-bold tracking-[0.2em] text-center text-xs md:text-sm uppercase">
            Smart Water Management System
          </p>

          {/* 장식용 하단 바 */}
          <div className="mt-4 flex justify-center">
            <div className="h-1 w-12 bg-sky-500/20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}