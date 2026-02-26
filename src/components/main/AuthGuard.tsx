'use client'

import { useUser } from "@/hooks/useUser";
import { useRouter, usePathname } from "next/navigation";
import { Loader2, Lock, LogIn } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { profile, isLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 하이드레이션 오류 방지
  if (!isMounted) return null;

  // 로그인 페이지 자체는 가드하지 않음
  if (pathname === "/") return <>{children}</>;

  // 정보를 불러오는 중이라면 로딩중
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-background/50 backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          <div className="absolute w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin" />
        </div>
        <p className="mt-10 text-slate-500 dark:text-slate-400 font-bold animate-pulse tracking-tight">
          사용자 정보를 확인하고 있습니다...
        </p>
      </div>
    );
  }

  // 로딩이 끝났는데 프로필 정보가 없다면 로그인 안 됨
  if (!profile) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" />
        <div className="relative bg-card dark:bg-slate-900 p-8 rounded-[2.5rem] border border-card-border dark:border-slate-800 shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
          <div className="inline-flex p-4 bg-red-50 dark:bg-red-950/30 rounded-3xl text-red-500 dark:text-red-400 mb-6">
            <Lock size={32} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 mb-2">로그인이 필요합니다</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 leading-relaxed">
            해당 기능은 권한이 있는 관리자만<br />접근 가능합니다. 로그인하시겠습니까?
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href={`/`} // 로그인 후 다시 돌아오도록 경로 전달
              className="py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> 로그인하러 가기
            </Link>
            <button
              onClick={() => router.back()}
              className="py-4 text-slate-400 font-semibold hover:text-slate-600 transition-colors"
            >
              이전 페이지로
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 로그인이 되어 있다면 정상적으로 콘텐츠 노출
  return <>{children}</>;
}