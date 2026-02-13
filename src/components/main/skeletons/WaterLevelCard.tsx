import { WaterWave } from "@/components/WaterWave";
import { ReservoirLevelType } from "@/types/types";
import { AlertTriangle } from "lucide-react";

interface WaterLevelCardProps {
    res: ReservoirLevelType;
    mapLevel: number;
    isSelected?: boolean;
    onClick: () => void;
}

export default function WaterLevelCard({ res, mapLevel, isSelected, onClick }: WaterLevelCardProps) {
    const isDanger = res.level > res.maxLevel * 0.9 || res.level < res.maxLevel * 0.4;
    const levelPercent = (res.level / res.maxLevel) * 100;

    return (
        <div
            onClick={onClick}
            key={res.facilityId}
            className={`flex-1 pl-4 group cursor-pointer transition-all duration-300
                ${isSelected ? "scale-105" : "hover:-translate-y-1"}`}
        >
            <div className={`relative overflow-hidden
                ${mapLevel >= 9 ? "w-14 h-14 rounded-full" : "w-36 h-20 rounded-xl lg:rounded-2xl"} 
                border-2 backdrop-blur-md transition-all duration-300 glass
                ${isSelected ?
                    (isDanger ?
                        "border-red-500 bg-red-50/80 ring-4 ring-red-500/20 shadow-red-200"
                        : "border-blue-600 bg-blue-50/80 ring-4 ring-blue-500/20 shadow-blue-200")
                    : (isDanger ?
                        "border-red-500" : "border-blue-400")
                }`}>

                {/* 수위 따라 배경 채우기 */}
                <WaterWave levelPercent={levelPercent} danger={isDanger} />

                {/* 경고 아이콘 */}
                {isDanger && (
                    <div className="absolute top-1 right-1 z-10">
                        <AlertTriangle size={mapLevel >= 9 ? 16 : 20} className="text-red-500 animate-bounce" />
                    </div>
                )}

                {isSelected && (
                    <div className="absolute inset-0 bg-blue-600/5 rounded-[inherit] pointer-events-none animate-pulse" />
                )}

                <div className="relative p-2 flex flex-col items-center justify-center h-full z-20">
                    <div className="flex flex-col items-center">
                        <span className={`font-black uppercase tracking-tighter leading-none text-slate-700
                            ${mapLevel >= 9 ? "text-[14px]" : "text-[12px] mb-1"}`}>
                            {mapLevel >= 9 ? res.level.toFixed(2) : res.reservoirName}
                        </span>

                        {mapLevel < 9 && (
                            <div className="flex items-baseline gap-1">
                                <span className={`text-xl font-black 
                                    ${isDanger ? "text-red-600" : "text-slate-700"}`}>
                                    {mapLevel !== -1 ? res.level.toFixed(2) : levelPercent.toFixed(0)}
                                </span>
                                <span className="text-[10px] font-bold uppercase text-slate-500">
                                    {mapLevel !== -1 ? "m" : "%"}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* 하단 게이지 바 */}
                    {mapLevel < 9 && (
                        <div className="mt-2 w-full h-1 bg-slate-200/50 rounded-full overflow-hidden">
                            <div
                                className={`h-full rounded-full transition-all duration-500 
                                    ${isDanger ? "bg-red-500" : "bg-blue-500"}`}
                                style={{ width: `${Math.min(levelPercent, 100)}%` }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}