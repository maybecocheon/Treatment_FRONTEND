import { Loader2, RefreshCcw } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit?: React.ReactNode;
  colorClass: string;
  loading?: boolean;
  error?: Error | null;
  onClick?: () => void;
}

export function StatCard({ icon, label, value, unit, colorClass, loading, error, onClick }: StatCardProps) {
  return (
    <div className="glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center transition-all duration-300 hover:scale-[1.02] hover:bg-white/40 group mb-4 md:mb-0 overflow-hidden">
      <div className={`p-4 rounded-2xl transition-colors shadow-inner mb-2 ${colorClass}`}>
        {icon}
      </div>
      <div className="flex flex-col items-center text-center">
        <span className="text-[11px] uppercase font-black tracking-widest text-blue-900/40 mb-2">
          {label}
        </span>
        <div className="flex items-baseline gap-1">
          {loading ? (
            <div className="flex items-center justify-center py-1">
              <Loader2 className="w-10 h-10 text-slate-300 animate-spin" />
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
                <p className="text-3xl font-black text-blue-950 tracking-tight">
                  {value}
                </p>
                {unit && <span className="text-sm font-bold text-blue-900/60">{unit}</span>}
              </>
            )}
        </div>
      </div>
    </div>
  )
}