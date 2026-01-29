'use client'

import Background from '@/components/loginJoin/Background';

export default function JoinSkeleton() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-slate-50 py-12 md:py-20">
            {/* 배경  */}
            <Background />

            {/* 메인 박스 */}
            <div className="relative z-10 w-full max-w-md mx-6 p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/40 shadow-xl animate-pulse">
                
                {/* 상단 로고 & 타이틀 영역 */}
                <div className="flex flex-col items-center mb-8">
                    {/* 로고 자리 */}
                    <div className="h-20 w-20 bg-sky-200/50 rounded-3xl mb-4" />
                    
                    {/* 구분선 */}
                    {/* <div className="w-full h-px bg-slate-100 my-4" /> */}
                    
                    {/* 계정 생성 */}
                    <div className="h-8 w-32 bg-slate-200 rounded-lg" />
                </div>

                {/* 폼 영역 */}
                <div className="space-y-6">
                    {/* 사원 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-4 w-16 bg-sky-100 rounded ml-1" /> 
                        <div className="h-12 w-full bg-slate-100/80 rounded-2xl" /> 
                        <div className="h-12 w-full bg-slate-100/80 rounded-2xl" />
                    </div>

                    {/* 로그인 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-4 w-16 bg-sky-100 rounded ml-1" /> 
                        <div className="h-12 w-full bg-slate-100/80 rounded-2xl" /> 
                        <div className="h-12 w-full bg-slate-100/80 rounded-2xl" />
                        <div className="h-12 w-full bg-slate-100/80 rounded-2xl" />
                    </div>

                    {/* 버튼 자리 */}
                    <div className="h-14 w-full bg-sky-200/60 rounded-2xl mt-4" />

                    {/* 안내 문구 자리 */}
                    <div className="p-4 rounded-xl bg-slate-50/50 border border-slate-100 space-y-2">
                        <div className="h-3 w-full bg-slate-200/70 rounded" />
                        <div className="h-3 w-2/3 bg-slate-200/70 rounded mx-auto" />
                    </div>
                </div>

                {/* 하단 로그인 이동 영역 */}
                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-3">
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-10 w-44 bg-slate-100 rounded-xl" />
                </div>
            </div>
        </section>
    );
}