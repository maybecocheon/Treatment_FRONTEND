import TailChart from '@/components/main/TailChart'
import { ChartBoxType } from '@/types/types'

export default function HistoryChartBox({ title, time, data, data2, color, color2, label1, label2, icon: Icon, loadData }: ChartBoxType) {
    return (
        <div className="glass px-8 py-6 rounded-[2.5rem]">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-xl font-black text-slate-800 tracking-tight">
                    {title}
                </h4>
                <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                    <Icon size={20} />
                </div>
            </div>
            <div className="h-full w-full">
                <TailChart
                    time={time}
                    data={data}
                    data2={data2}
                    color={color}
                    color2={color2}
                    label1={label1}
                    label2={label2}
                />
            </div>
        </div>
    )
}
