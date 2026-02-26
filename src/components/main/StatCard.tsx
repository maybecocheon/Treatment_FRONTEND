import { StatCardType } from "@/types/types";
import { Loader2, RefreshCcw } from "lucide-react";

export function StatCard({ icon, label, value, unit, colorClass, loading, error, onClick }: StatCardType) {
  return (
    <div className="glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center transition-all duration-300 hover:scale-[1.02] group mb-4 md:mb-0 overflow-hidden border border-card-border">
      {loading ?
        <div className="min-h-30 flex items-center justify-center py-1">
          <Loader2 className="w-10 h-10 text-muted animate-spin" />
        </div>
        : error ?
          <div className="min-h-30 flex items-center justify-center py-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              className="group flex items-center gap-1.5 px-3 py-1.5 border border-card-border rounded-lg text-xs font-black text-muted hover:bg-muted/10 hover:border-muted transition-all active:scale-95"
            >
              <RefreshCcw size={12} className="group-hover:rotate-180 transition-transform duration-500" />
              다시 시도
            </button>
          </div>
          :
          <>
            <div className={`p-4 rounded-2xl transition-colors shadow-inner mb-2 ${colorClass}`}>
              {icon}
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-[11px] uppercase font-black tracking-widest text-muted mb-2">
                {label}
              </span>
              <div className="flex items-baseline gap-1">
                <p className="text-3xl font-black text-foreground tracking-tight">
                  {value}
                </p>
                {unit && <span className="text-sm font-bold text-muted">{unit}</span>}
              </div>
            </div>
          </>
      }
    </div>
  )
}