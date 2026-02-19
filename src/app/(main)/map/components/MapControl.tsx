'use client'

import { mapLevelAtom } from '@/atoms/uniAtoms';
import { useSetAtom } from 'jotai';
import { Minus, Plus, RotateCcw } from "lucide-react";

export default function MapControl() {
    const setMapLevel = useSetAtom(mapLevelAtom);

    return (
        <div className="absolute right-6 top-10 z-20 flex flex-col gap-2">
            <div className="flex flex-col bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl overflow-hidden">
                {/* 확대 버튼 */}
                <button
                    onClick={() => setMapLevel((prev) => Math.max(prev - 1, 7))}
                    className="p-3 hover:bg-sky-500 hover:text-white transition-colors border-b border-white/20 text-slate-600"
                >
                    <Plus className="w-5 h-5" />
                </button>

                {/* 축소 버튼 */}
                <button
                    onClick={() => setMapLevel((prev) => Math.min(prev + 1, 9))}
                    className="p-3 hover:bg-sky-500 hover:text-white transition-colors text-slate-600"
                >
                    <Minus className="w-5 h-5" />
                </button>
            </div>

            {/* 초기화 버튼 */}
            <button
                onClick={() => window.location.reload()}
                className="p-3 bg-white/70 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl text-slate-600 hover:text-sky-600 transition-all"
            >
                <RotateCcw className="w-5 h-5" />
            </button>
        </div>
    )
}
