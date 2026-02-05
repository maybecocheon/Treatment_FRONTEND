'use client'

import { Loader2 } from 'lucide-react';

export interface TailCardProps {
    label: string;
    value: string;
    unit?: string;
    subLabel: string;
    color: string;
}

export default function TailCard({ label, value, unit, subLabel, color }: TailCardProps) {
    const isLoading = value === "---" || value === "";

    return (
        <div className="glass backdrop-blur-lg rounded-2xl p-4 flex flex-col justify-between transition-shadow h-full min-h-25">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
            
            <div className="flex items-baseline gap-1 my-1 min-h-7">
                {isLoading ? (
                    <div className="flex items-center justify-center py-1">
                        <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
                    </div>
                ) : (
                    <>
                        <p className={`text-[20px] font-black ${color} leading-none overflow-hidden`}>
                            {value}
                        </p>
                        {unit && (
                            <span className="text-[10px] text-slate-400 font-bold overflow-hidden">
                                {unit}
                            </span>
                        )}
                    </>
                )}
            </div>
            
            <p className="text-[10px] text-slate-400 font-medium truncate">
                {isLoading ? "데이터 로드 중..." : subLabel}
            </p>
        </div>
    )
}