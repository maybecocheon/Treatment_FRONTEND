'use client'

import Background from '@/components/loginJoin/Background';

export default function LoginSkeleton() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-20 bg-slate-50">
            {/* 배경 */}
            <Background />

            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center animate-pulse">
                {/* 로고 자리 */}
                <div className="mb-10 text-center space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-4xl bg-sky-200/50" />
                    <div className="h-10 w-48 bg-slate-200 rounded-xl mx-auto" />
                    <div className="h-4 w-56 bg-slate-200 rounded-lg mx-auto" />
                </div>

                {/* 로그인 박스 */}
                <div className="w-full bg-white/70 backdrop-blur-3xl border border-white/40 p-6 md:p-10 rounded-[2.5rem] shadow-xl space-y-6">
                    <div className="h-14 bg-slate-100/80 rounded-2xl" />
                    <div className="h-14 bg-slate-100/80 rounded-2xl" />
                    <div className="h-14 bg-sky-200/50 rounded-2xl" />
                </div>
                
                {/* 하단 회원가입 유도 영역 */}
                <div className="w-full mt-6 h-12 bg-white/40 rounded-2xl border border-white/20" />
            </div>

            {/* 하단 화살표 */}
            <div className="mt-10 space-y-2 animate-pulse flex flex-col items-center">
                <div className="h-3 w-20 bg-slate-200 rounded" />
                <div className="h-6 w-6 bg-sky-200/50 rounded-full" />
            </div>
        </section>
    );
}