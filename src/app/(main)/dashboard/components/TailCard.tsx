'use client'

import { Loader2, RefreshCcw } from 'lucide-react';

export interface TailCardProps {
    label: string;
    value: string;
    unit?: string;
    subLabel: string;
    color: string;
    loading?: boolean;
    error?: Error | null;
    onClick?: () => void;
}

export default function TailCard({ label, value, unit, subLabel, color, loading, error, onClick }: TailCardProps) {
    return (
        <div className="glass backdrop-blur-lg rounded-2xl px-4 py-3 flex flex-col justify-between transition-shadow h-full min-h-20">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>

            <div className="flex items-baseline gap-1 my-0.5 min-h-7">
                {loading ? (
                    <div className="flex items-center justify-center py-1">
                        <Loader2 className="w-5 h-5 text-slate-300 animate-spin" />
                    </div>
                ) : error ? (
                    <div className="flex items-center justify-center py-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.();
                            }}
                            className="group flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
                        >
                            <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
                            다시 시도
                        </button>
                    </div>
                )
                    : (
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
                {loading ? "데이터 로드 중..." : subLabel}
            </p>
        </div>
    )
}