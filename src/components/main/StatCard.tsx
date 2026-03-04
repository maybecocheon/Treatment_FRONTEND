import { StatCardType } from "@/types/types";

export function StatCard({ icon, label, value, unit, colorClass }: StatCardType) {
  return (
    <div className="glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center
                transition-all duration-300 hover:scale-[1.02] group mb-4 md:mb-0 overflow-hidden border border-card-border">
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
    </div>
  )
}