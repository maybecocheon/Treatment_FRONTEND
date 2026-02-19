'use client'

export default function MapLegend() {
    return (
        <div className="absolute bottom-8 right-8 z-20 bg-white/80 backdrop-blur-md p-5 rounded-3xl border border-white/50 shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex flex-col gap-3">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">상태</p>

            <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-20"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.4)]"></span>
                </div>
                <span className="text-xs font-bold text-slate-600">정상 운영</span>
            </div>

            <div className="flex items-center gap-3">
                <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]"></span>
                </div>
                <span className="text-xs font-bold text-slate-600">이상 징후 경고</span>
            </div>
        </div>
    )
}
