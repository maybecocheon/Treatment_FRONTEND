'use client'

export default function EnergySave() {
    return (
        <>
            <div className="bg-emerald-500 text-white rounded-xl p-3 shadow-sm">
                <div className="flex justify-between items-center mb-0.5">
                    <span className="text-[11px] font-bold opacity-80 uppercase">현재 절감액 및 절감률</span>
                    <span className="text-[11px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full">18.5% SAVING</span>
                </div>
                <p className="text-xl font-black">- ₩1,420,000</p>
            </div>

            <div className="flex flex-col gap-4 py-2">
                <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-end px-1 text-[9px] font-bold">
                        <span className="text-slate-400 uppercase">기존</span>
                        <span className="text-slate-400">₩13.9M</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-slate-200" />
                    </div>
                </div>
                <div className="flex flex-col gap-0.5">
                    <div className="flex justify-between items-end px-1 text-[9px] font-bold">
                        <span className="text-emerald-600 uppercase">AI 최적</span>
                        <span className="text-emerald-600">₩12.4M</span>
                    </div>
                    <div className="w-full h-2 bg-emerald-50 rounded-full overflow-hidden">
                        <div className="h-full w-[89%] bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    </div>
                </div>
            </div>
        </>
    )
}
