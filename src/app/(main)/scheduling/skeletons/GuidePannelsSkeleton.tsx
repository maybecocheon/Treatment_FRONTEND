'use client'

export default function GuidePannelsSkeleton() {
    return (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="xl:col-span-3 h-50 bg-white/50 border border-slate-100 rounded-[2.5rem] p-6 flex flex-col justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 w-9 h-9 bg-slate-200 rounded-xl" />
                        <div className="space-y-2">
                            <div className="h-4 w-24 bg-slate-200 rounded" />
                            <div className="h-2 w-16 bg-slate-100 rounded" />
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col justify-center space-y-4">
                        <div className="h-10 w-full bg-slate-100 rounded-2xl" />
                        <div className="h-10 w-full bg-slate-100 rounded-2xl" />
                    </div>
                    <div className="h-16 w-full bg-slate-50 rounded-3xl" />
                </div>
            ))}
        </div>
    )
}
