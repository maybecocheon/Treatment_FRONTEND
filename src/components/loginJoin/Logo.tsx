'use client'

import { Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logo({ scale = 1 }: { scale?: number }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      style={{ transform: `scale(${scale})` }}
      className="origin-top text-center animate-in fade-in slide-in-from-top-4 duration-1000 hover:cursor-pointer group"
    >
      {/* 로고 아이콘 박스 */}
      <div className="inline-flex p-4 rounded-4xl bg-linear-to-br from-sky-400 to-blue-600 shadow-xl shadow-sky-500/30 mb-6 group-hover:scale-105 transition-transform duration-300">
        <Droplets className="w-12 h-12 text-white" />
      </div>

      {/* 메인 텍스트 */}
      <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter mb-3">
        FLOWISE
      </h1>

      {/* 서브 텍스트 */}
      <p className="text-sky-600 font-extrabold uppercase tracking-[0.3em] text-xs md:text-sm">
        Decision Support System
      </p>

      {/* 장식용 하단 바 */}
      <div className="mt-4 flex justify-center">
        <div className="h-1 w-12 bg-sky-500/20 rounded-full" />
      </div>
    </div>
  );
}