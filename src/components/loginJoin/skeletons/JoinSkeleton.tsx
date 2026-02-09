'use client'

import Background from '@/components/loginJoin/Background';

export default function JoinSkeleton() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-slate-50 py-5">
            {/* 배경 */}
            <Background />

            {/* 회원가입 박스 스켈레톤 */}
            <div className="relative z-10 w-full max-w-md mx-6 p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                
                {/* 상단 로고 & 타이틀 영역 */}
                <div className="flex flex-col items-center mb-8">
                    <div className="h-20 w-40 bg-slate-200 animate-pulse rounded-xl mb-6" />
                    <div className="h-8 w-32 bg-slate-200 animate-pulse rounded-lg" />
                </div>

                <div className="space-y-6">
                    {/* 사원 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-3 w-16 bg-sky-100 animate-pulse rounded ml-1" /> 
                        <div className="h-12 w-full bg-slate-100 animate-pulse rounded-xl" /> 
                        <div className="h-12 w-full bg-slate-100 animate-pulse rounded-xl" /> 
                    </div>

                    {/* 로그인 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-3 w-16 bg-sky-100 animate-pulse rounded ml-1" /> 
                        
                        {/* 아이디 + 중복확인 버튼 */}
                        <div className="flex gap-2">
                            <div className="h-12 flex-1 bg-slate-100 animate-pulse rounded-xl" />
                            <div className="h-12 w-20 bg-slate-200 animate-pulse rounded-xl" />
                        </div>

                        <div className="h-12 w-full bg-slate-100 animate-pulse rounded-xl" /> 
                        <div className="h-12 w-full bg-slate-100 animate-pulse rounded-xl" /> 
                    </div>

                    {/* 회원가입 버튼 */}
                    <div className="h-14 w-full bg-slate-200 animate-pulse rounded-2xl mt-4" />
                </div>

                {/* 하단 푸터 영역 */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                    <div className="h-4 w-40 bg-slate-100 animate-pulse rounded" />
                    <div className="h-10 w-48 bg-slate-200 animate-pulse rounded-xl" />
                </div>
            </div>
        </section>
    );
}