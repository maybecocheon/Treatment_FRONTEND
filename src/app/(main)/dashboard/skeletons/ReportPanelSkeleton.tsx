'use client'

import PanelSkeleton from "@/components/skeletons/PanelSkeleton";

export default function ReportPanelSkeleton() {
    return (
        <PanelSkeleton className="h-full border-success/20">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-md" />
                <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded-md" />
            </div>

            {/* Energy Save Sim */}
            <div className="flex flex-col rounded-2xl p-4 gap-3 bg-card border border-card-border">
                <div className="h-4 w-2/3 mx-auto bg-slate-200 dark:bg-slate-700 rounded mb-2" />
                <div className="flex justify-around items-end h-20 gap-2 px-4">
                    {[40, 70, 50, 90].map((h, i) => (
                        <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t-lg" style={{ height: `${h}%` }} />
                    ))}
                </div>
                <div className="h-8 w-full bg-primary/10 rounded-xl" />
            </div>

            {/* Guide Panels Sim */}
            <div className="flex-1 space-y-3">
                {[1, 2, 3].map(i => (
                    <div key={i} className="p-4 bg-muted/5 rounded-2xl border border-card-border">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
                            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                ))}
            </div>
        </PanelSkeleton>
    );
}
