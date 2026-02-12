import { WaterWave } from "@/components/WaterWave";
import { ReservoirLevelType } from "@/types/types";
import { AlertTriangle } from "lucide-react";

interface WaterLevelCardProps {
    res: ReservoirLevelType;
    mapLevel: number;
    onClick: () => void;
}

export default function WaterLevelCard({ res, mapLevel, onClick }: WaterLevelCardProps) {

    const isDanger = res.level > res.maxLevel * 0.9 || res.level < res.maxLevel * 0.4;
    const levelPercent = (res.level / res.maxLevel) * 100;

    return (
        <div
            onClick={onClick} key={res.facilityId}
            className="flex-1 pl-4 group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
            <div className={`relative ${mapLevel >= 8 ? "w-14 h-14 rounded-full" : "w-36 h-20 rounded-xl lg:rounded-2xl"} 
          overflow-hidden border-2 shadow-lg backdrop-blur-md transition-all duration-300 
          ${isDanger ? "bg-white/50 border-red-500" : "bg-white/50 border-blue-400"}`}>

                {/* 수위 따라 배경 채우기 */}
                <WaterWave levelPercent={levelPercent} danger={isDanger} />

                {/* 경고 */}
                {isDanger && (
                    <div className="absolute top-1 right-1 z-10">
                        <AlertTriangle size={mapLevel >= 8 ? 16 : 20} className="text-red-500 animate-bounce" />
                    </div>
                )}

                <div className="relative p-2 flex flex-col items-center justify-center h-full">
                    <div className="flex flex-col items-center">
                        <span className={`font-black uppercase tracking-tighter text-slate-700 leading-none ${mapLevel >= 8 ? "text-[14px]" : "text-[12px] mb-1"}`}>
                            {mapLevel >= 8 ? res.level.toFixed(2) : res.reservoirName}
                        </span>

                        {/* 8레벨 미만일 때만 상세 수위 표시 */}
                        {mapLevel < 8 && (
                            <div className="flex items-baseline gap-1">
                                <span className={`text-xl font-black ${isDanger ? "text-red-600" : "text-slate-700"}`}>
                                    {mapLevel !== -1 ? res.level.toFixed(2) : levelPercent.toFixed(0)}
                                </span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase">{mapLevel !== -1 ? "m" : "%"}</span>
                            </div>
                        )}
                    </div>

                    {/* 하단 게이지 바 */}
                    {
                        mapLevel < 8 && (
                            <div className="mt-2 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${isDanger ? "bg-red-500" : "bg-blue-500"}`}
                                    style={{ width: `${Math.min(levelPercent, 100)}%` }}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
}

