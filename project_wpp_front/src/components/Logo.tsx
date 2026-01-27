'use client'

import { Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Logo({ scale = 1 }: { scale?: number }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push("/")}
      style={{ transform: `scale(${scale})` }}
      className="origin-center text-center animate-in fade-in slide-in-from-top-4 duration-1000 hover:cursor-pointer"
    >
      <div className="inline-flex p-4 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/50 mb-6">
        <Droplets className="w-12 h-12 text-white" />
      </div>
      <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-3">
        FLOWISE
      </h1>
      <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm md:text-base">
        Decision Support System
      </p>
    </div>
  );
}
