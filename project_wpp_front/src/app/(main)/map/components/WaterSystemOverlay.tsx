import { WaterSystemData } from "@/data/types";
import { AlertTriangle, Factory } from "lucide-react";
import { WaterWave } from "./WaterWave";

export interface WaterSystemOverlay {
    waterSystem: WaterSystemData;
    onClick?: () => void;
}

export default function WaterSystemOverlay({ waterSystem, onClick }: WaterSystemOverlay) {
    // 1. 정수장
    if (waterSystem.type === "plant") {
        return (
            <div className="flex flex-col items-center cursor-default">
                <div className="relative">
                    <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 animate-pulse" />
                    <div className="relative bg-white/50 border-2 border-blue-400 p-4 rounded-full shadow-2xl backdrop-blur-md">
                        <Factory className="w-8 h-8 text-slate-700" />
                    </div>
                </div>
                <div className="mt-2 bg-slate-700/70 text-white text-[10px] px-3 py-1 rounded-full font-semibold border border-blue-400/30">
                    {waterSystem.name || "광역 정수장"}
                </div>
            </div>
        );
    }

    // 2. 배수지
    const isDanger = (waterSystem.currentLevel ?? 0) < (waterSystem.minLevel ?? 0);
    const levelPercent = ((waterSystem.currentLevel ?? 0) / (waterSystem.maxLevel ?? 1)) * 100;

    if (waterSystem.type === "reservoir") {
        return (
            <div
                onClick={onClick}
                className="group cursor-pointer transition-all duration-300 hover:-translate-y-2"
            >
                <div className={`relative w-36 overflow-hidden rounded-2xl border-2 shadow-xl backdrop-blur-md transition-colors 
                    ${isDanger ? 'bg-white/50 border-red-500' : 'bg-white/50 border-slate-700'}`}>

                    {/* 수위 따라 배경 채우기 */}
                    <WaterWave levelPercent={levelPercent} danger={isDanger} />

                    {/* 경고 */}
                    <div className="relative p-3">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-black uppercase tracking-tighter line-clamp-1 text-slate-700">
                                {waterSystem.name}
                            </span>
                            {isDanger && (
                                <AlertTriangle size={12} className="text-red-500 animate-bounce" />
                            )}
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className={`text-xl font-black ${isDanger ? 'text-red-600' : 'text-slate-700'}`}>
                                {waterSystem.currentLevel?.toFixed(1)}
                            </span>
                            <span className="text-[10px] text-slate-500 font-bold uppercase">meter</span>
                        </div>

                        {/* 하단 미니 게이지 바 */}
                        <div className="mt-2 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 ${isDanger ? 'bg-red-500' : 'bg-blue-500'}`}
                                style={{ width: `${Math.min(levelPercent, 100)}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <></>
    );
}