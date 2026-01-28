'use client'

interface FooterProps {
  variant?: "default" | "sidebar";
}

export default function FooterSkeleton({ variant = "default" }: FooterProps) {
  // 1. 사이드바 스켈레톤
  if (variant === "sidebar") {
    return (
      <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-center">
        <div className="h-3 w-28 bg-slate-800 animate-pulse rounded-full" />
      </div>
    );
  }

  // 2. 일반 페이지 (기본값)
  return (
    <footer className="py-12 md:py-20 bg-slate-950 border-t border-white/5 flex justify-center items-center">
      <div className="h-4 w-64 md:w-96 bg-slate-800 animate-pulse rounded-full" />
    </footer>
  );
}