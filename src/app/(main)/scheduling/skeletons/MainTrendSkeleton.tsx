import { Activity } from "lucide-react";


export default function MainTrendSkeleton() {
    return (
        <div className="flex-1 flex flex-col gap-4 w-full mt-4">
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-100 rounded-full" />
                    <div className="h-6 w-72 bg-slate-200 rounded-lg" />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full h-full min-h-100">
                {/* 차트 박스 스켈레톤 1 */}
                <div className="bg-white/60 border border-slate-100 rounded-[2.5rem] p-6 flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div className="h-6 w-32 bg-slate-200 rounded" />
                        <div className="h-8 w-24 bg-slate-100 rounded-lg" />
                    </div>
                    <div className="flex-1 w-full bg-slate-50/50 rounded-3xl flex items-end p-4 gap-2">
                        {/* 막대 그래프 느낌의 스켈레톤들 */}
                        {[...Array(12)].map((_, j) => (
                            <div key={j} className="flex-1 bg-slate-200/50 rounded-t" style={{ height: `${Math.random() * 60 + 20}%` }} />
                        ))}
                    </div>
                </div>
                {/* 차트 박스 스켈레톤 2 */}
                <div className="bg-white/60 border border-slate-100 rounded-[2.5rem] p-6 flex flex-col gap-4 mb-4 md:mb-0">
                    <div className="h-6 w-32 bg-slate-200 rounded" />
                    <div className="flex-1 w-full bg-slate-50/50 rounded-3xl flex items-center justify-center">
                        <div className="w-full h-full p-8 space-y-4">
                            <div className="h-full w-full border-b border-l border-slate-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Activity className="text-slate-100 w-20 h-20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
