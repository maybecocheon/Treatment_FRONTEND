'use client'

import { User } from 'lucide-react';

export default function SettingSkeleton() {
    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-0 flex flex-col gap-5 h-screen overflow-hidden">
            {/* 상단 타이틀 영역 스켈레톤 */}
            <div className="flex items-center gap-4 w-full">
                <div className="p-3 glass rounded-2xl w-11 h-11 animate-pulse border border-card-border" />
                <div className="space-y-2">
                    <div className="h-8 w-40 bg-muted/20 rounded-lg animate-pulse" />
                    <div className="h-4 w-56 bg-card-border rounded-md animate-pulse" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 overflow-hidden pb-10">
                {/* 좌측: 프로필 카드 스켈레톤 */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="glass h-full p-8 rounded-[2.5rem] border border-card-border shadow-2xl relative overflow-hidden flex flex-col items-center">
                        <div className="relative mt-6 mb-8">
                            <div className="w-36 h-36 bg-card-border rounded-full flex items-center justify-center animate-pulse border-4 border-card">
                                <User size={72} strokeWidth={1.5} className="text-muted/20" />
                            </div>
                        </div>

                        <div className="text-center space-y-3 mb-10 w-full flex flex-col items-center">
                            <div className="h-9 w-32 bg-muted/20 rounded-md animate-pulse" />
                            <div className="h-6 w-20 bg-info-bg rounded-full animate-pulse" />
                            <div className="h-4 w-40 bg-card-border rounded animate-pulse" />
                        </div>

                        <div className="w-full mt-auto">
                            <div className="bg-muted/10 backdrop-blur-sm rounded-3xl p-5 border border-card-border">
                                <div className="h-3 w-16 bg-card-border rounded mb-3 animate-pulse" />
                                <div className="space-y-2">
                                    <div className="h-2 w-12 bg-card-border rounded animate-pulse" />
                                    <div className="h-4 w-28 bg-muted/20 rounded animate-pulse" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 우측: 설정 영역 스켈레톤 */}
                <div className="lg:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                    {[1, 2].map((i) => (
                        <div key={i} className="glass p-10 rounded-[3rem] flex flex-col border border-card-border">
                            <div className="flex items-center gap-3 mb-8">
                                <div className={`p-3 rounded-2xl w-12 h-12 animate-pulse ${i === 1 ? 'bg-info-bg' : 'bg-warning-bg'}`} />
                                <div className="space-y-2">
                                    <div className="h-6 w-32 bg-muted/20 rounded animate-pulse" />
                                    <div className="h-3 w-24 bg-card-border rounded animate-pulse" />
                                </div>
                            </div>

                            <div className="space-y-6 flex-1">
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="space-y-2">
                                        <div className="h-3 w-20 bg-card-border rounded ml-1 animate-pulse" />
                                        <div className="h-12 w-full bg-card/50 rounded-2xl border border-card-border animate-pulse" />
                                    </div>
                                ))}
                            </div>

                            <div className="h-14 w-full bg-muted/20 rounded-2xl animate-pulse mt-8" />
                        </div>
                    ))}
                </div>
            </div>

            {/* 하단 탈퇴 버튼 스켈레톤 */}
            <div className="px-4 mb-6 flex items-center gap-4">
                <div className="w-10 h-10 bg-danger-bg rounded-xl animate-pulse" />
                <div className="space-y-1">
                    <div className="h-3 w-20 bg-danger-bg rounded animate-pulse" />
                    <div className="h-2 w-24 bg-danger-bg rounded animate-pulse opacity-50" />
                </div>
            </div>
        </div>
    );
}