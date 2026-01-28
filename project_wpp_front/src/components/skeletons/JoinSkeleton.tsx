'use client'

import Background from '@/components/loginJoin/Background';

export default function JoinSkeleton() {
    return (
        <section className="relative h-full w-full flex items-center justify-center overflow-auto">
            {/* 배경 */}
            <Background />

            {/* 메인 박스 스켈레톤 */}
            <div className="relative z-10 w-full m-10 max-w-md mx-4 p-8 md:p-10 rounded-3xl bg-slate-700/20 backdrop-blur-2xl border border-slate-700/40 shadow-[0_0_60px_rgba(99,102,241,0.15)] animate-pulse">
                
                {/* 상단 로고 & 타이틀 영역 */}
                <div className="flex flex-col items-center mb-6">
                    {/* 로고 자리 */}
                    <div className="h-25 w-32 bg-slate-700/40 rounded-3xl mb-4" />
                    
                    {/* 구분선 */}
                    <div className="w-full h-px bg-slate-700/40 my-4" />
                    
                    {/* 계정 생성 텍스트 자리 */}
                    <div className="h-7 w-24 bg-slate-700/40 rounded-lg" />
                </div>

                {/* 폼 영역 스켈레톤 */}
                <div className="space-y-6">
                    {/* 사원 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-4 w-16 bg-slate-700/40 rounded ml-1" /> 
                        <div className="h-12 w-full bg-slate-700/40 rounded-2xl" /> 
                        <div className="h-12 w-full bg-slate-700/40 rounded-2xl" />
                    </div>

                    {/* 로그인 정보 섹션 */}
                    <div className="space-y-3">
                        <div className="h-4 w-16 bg-slate-700/40 rounded ml-1" /> 
                        <div className="h-12 w-full bg-slate-700/40 rounded-2xl" /> 
                        
                        <div className="grid grid-cols-2 gap-3">
                            <div className="h-12 bg-slate-700/40 rounded-2xl" /> 
                            <div className="h-12 bg-slate-700/40 rounded-2xl" />
                        </div>
                    </div>

                    {/* 버튼 자리 */}
                    <div className="h-14 w-full bg-blue-600/30 rounded-2xl mt-4" />

                    {/* 안내 문구 자리 */}
                    <div className="space-y-2 mt-4">
                        <div className="h-3 w-3/4 bg-slate-700/40 rounded mx-auto" />
                        <div className="h-3 w-1/2 bg-slate-700/40 rounded mx-auto" />
                    </div>
                </div>

                {/* 하단 로그인 이동 영역 */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center gap-3">
                    <div className="h-4 w-32 bg-slate-700/40 rounded" />
                    <div className="h-10 w-40 bg-slate-700/40 rounded-xl" />
                </div>
            </div>
        </section>
    );
}