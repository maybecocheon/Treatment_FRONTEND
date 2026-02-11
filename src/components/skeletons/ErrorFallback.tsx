'use client'

import { AlertCircle, RefreshCcw } from "lucide-react";

export default function ErrorFallback({ error, onClick }: { error?: Error; onClick: (id?: string | number) => void; }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-35 p-4 text-center">
      <AlertCircle size={20} className="text-red-400 mb-2" />
      
      <div className="space-y-1 mb-4">
        <h3 className="text-sm font-semibold text-slate-700">로드 실패</h3>
        {error && (
          <p className="text-[11px] text-slate-400 line-clamp-1 max-w-45">
            {error.message}
          </p>
        )}
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        className="group flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-black text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95"
      >
        <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
        다시 시도
      </button>
    </div>
  );
}