'use client'

import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";

export default function SchedulingSkeleton() {
    return (
        <div className="h-full flex flex-col gap-4 animate-pulse">
            {/* Header Select Sim */}
            <div className="bg-card/90 backdrop-blur-md p-3 rounded-2xl flex items-center gap-3 md:w-auto border border-card-border shadow-sm">
                <div className="p-3 w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                <div className="h-10 w-full max-w-64 bg-slate-200 dark:bg-slate-700 rounded-xl" />
            </div>

            {/* Main Charts area */}
            <div className="flex-1 flex flex-col gap-4">
                {[1, 2].map(i => (
                    <div key={i} className="flex-1 bg-card rounded-3xl p-6 border border-card-border flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded" />
                            <div className="h-5 w-48 bg-slate-200 dark:bg-slate-700 rounded-md" />
                        </div>
                        <div className="flex-1 min-h-[200px]">
                            <TailChartSkeleton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
