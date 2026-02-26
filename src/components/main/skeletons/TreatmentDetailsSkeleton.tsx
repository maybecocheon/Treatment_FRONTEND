'use client'

export default function TreatmentDetailsSkeleton() {
    return (
        <div className="flex flex-col gap-0 md:gap-4 p-6 h-full bg-info-bg animate-pulse">
            {[1, 2, 3].map(i => (
                <div key={i} className="glass p-5 rounded-3xl flex items-center gap-4 bg-card/50">
                    <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-2xl" />
                    <div className="flex-1 space-y-2">
                        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
                        <div className="h-6 w-32 bg-slate-300 dark:bg-slate-600 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}
