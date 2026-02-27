'use client'

import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";

export default function AnalysisPanelSkeleton() {
    return (
        <div className="flex-1 p-4 md:p-6 rounded-2xl bg-card-border/20 border border-dashed border-muted/30 animate-pulse">
            <div className="flex justify-between items-center mb-4">
                <div className="h-6 w-48 bg-muted/20 rounded-lg" />
                <div className="h-4 w-32 bg-card-border rounded" />
            </div>
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                    <div key={i} className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div className="h-4 w-20 bg-muted/20 rounded" />
                            <div className="flex gap-1">
                                {[1, 2, 3].map(j => <div key={j} className="h-6 w-10 bg-card-border rounded-xl" />)}
                            </div>
                        </div>
                        <div className="flex-1 py-10">
                            <TailChartSkeleton />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
