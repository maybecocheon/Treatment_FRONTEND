'use client'

import { User } from 'lucide-react';

export default function SettingSkeleton() {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-2 flex flex-col gap-6">
            {/* 상단 타이틀 영역 스켈레톤 */}
            <div className="flex items-center gap-4 w-full px-2">
                <div className="p-3 bg-white/50 rounded-2xl w-11 h-11 animate-pulse" />
                <div className="space-y-2">
                    <div className="h-8 w-40 bg-slate-200 rounded-lg animate-pulse" />
                    <div className="h-4 w-56 bg-slate-100 rounded-md animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                
                {/* 좌측: 프로필 카드 스켈레톤 */}
                <div className="lg:col-span-3 h-full">
                    <div className="glass h-full p-8 rounded-[3rem] flex flex-col items-center border border-white/60 relative overflow-hidden">
                        <div className="w-32 h-32 bg-slate-200 rounded-full mb-6 mt-4 animate-pulse flex items-center justify-center">
                            <User size={64} className="text-slate-100" />
                        </div>
                        <div className="h-7 w-24 bg-slate-200 rounded-md mb-2 animate-pulse" />
                        <div className="h-4 w-32 bg-slate-100 rounded-md mb-6 animate-pulse" />
                        
                        <div className="h-8 w-32 bg-blue-50 rounded-xl animate-pulse" />
                        
                        <div className="w-full h-px bg-slate-100 my-8" />
                        
                        <div className="w-full space-y-3">
                            <div className="h-3 w-16 bg-slate-100 rounded animate-pulse" />
                            <div className="h-16 w-full bg-white/40 rounded-2xl border border-white/40 animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* 우측: 설정 영역 스켈레톤 (기본정보 & 비밀번호) */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* 섹션 반복 (기본정보/비밀번호) */}
                    {[1, 2].map((i) => (
                        <div key={i} className="glass p-10 rounded-[3rem] flex flex-col space-y-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-slate-100 rounded-2xl w-12 h-12 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-6 w-32 bg-slate-200 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="space-y-2">
                                        <div className="h-3 w-20 bg-slate-100 rounded ml-1 animate-pulse" />
                                        <div className="h-12 w-full bg-white/50 rounded-2xl border border-slate-100 animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            <div className="h-14 w-full bg-slate-200 rounded-2xl animate-pulse mt-4" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 탈퇴 버튼 스켈레톤 */}
            <div className="mt-8 px-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-red-50 rounded-xl animate-pulse" />
                <div className="space-y-1">
                    <div className="h-3 w-20 bg-red-50 rounded animate-pulse" />
                    <div className="h-2 w-24 bg-red-50/50 rounded animate-pulse" />
                </div>
            </div>
        </div>
    );
}