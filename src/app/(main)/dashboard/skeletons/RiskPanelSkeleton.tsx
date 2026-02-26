'use client'

import PanelSkeleton from "@/components/skeletons/PanelSkeleton";

export default function RiskPanelSkeleton() {
    return (
        <PanelSkeleton className="h-full border-danger/20">
            <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-danger/20 rounded-md" />
                <div className="h-5 w-32 bg-danger/10 rounded-md" />
            </div>
            <div className="flex-1 flex flex-col gap-4">
                {/* Risk Detail Sim */}
                <div className="p-4 bg-muted/5 rounded-2xl border border-subtle-border">
                    <div className="h-4 w-20 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                    <div className="flex justify-center mb-4">
                        <div className="w-24 h-24 rounded-full border-8 border-slate-100 dark:border-slate-800" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded" />
                        <div className="h-3 w-2/3 bg-slate-100 dark:bg-slate-800 rounded" />
                    </div>
                </div>
                {/* Risk Event Sim */}
                <div className="flex-1 border-t border-subtle-border pt-4">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
                    <div className="space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-muted/5 rounded-xl">
                                <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
                                    <div className="h-2 w-1/3 bg-slate-100 dark:bg-slate-800 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PanelSkeleton>
    );
}
