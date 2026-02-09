import { ChartBoxType } from "@/types/types";

export default function ChartBox({ title, icon: Icon, color = "text-blue-500", textSize = "text-[14px]", children, headerControl }: ChartBoxType) {
  return (
    <div className="glass rounded-[2.5rem] p-6 flex flex-col gap-4 h-100 md:h-full">
      <div className="flex flex-col gap-4 justify-between">
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl bg-slate-200/50 ${color}`}>
            <Icon size={16} />
          </div>
          <h5 className={`${textSize} font-semibold text-blue-950 uppercase tracking-tight`}>{title}</h5>
          {headerControl}
        </div>
      </div>
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}