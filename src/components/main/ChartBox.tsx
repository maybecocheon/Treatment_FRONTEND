import { ChartBoxType } from "@/types/types";

export default function ChartBox({ title, icon: Icon, color = "text-blue-500", textSize = "text-[14px]", children, headerControl }: ChartBoxType) {
  return (
    <div className="glass border border-card-border rounded-2xl p-6 flex flex-col gap-4 h-100 md:h-full">
      <div className="flex gap-4 justify-between items-center mb-2">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl bg-muted/20 ${color}`}>
            <Icon size={16} />
          </div>
          <h5 className={`${textSize} font-semibold text-foreground uppercase tracking-tight`}>{title}</h5>
        </div>
        <div>{headerControl}</div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}