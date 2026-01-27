import { WaterSystemData } from "@/types";
import { AlertCircle, Droplets, TrendingUp, X } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function ReservoirDetailsModal({ reservoir, onClose }: { reservoir: WaterSystemData; onClose: () => void; }) {
    const chartData = reservoir.actualDemand?.map((actual, idx: number) => ({
        time: `${idx * 4}h`,
        실제: actual,
        예측: reservoir.predictedDemand?.[idx]
    })) || [];

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
                <div className="bg-slate-900 px-6 py-5 md:px-8 md:py-6 flex justify-between items-center sticky top-0 z-10">
                    <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
                            <Droplets className="text-blue-400 w-5 h-5 md:w-6 md:h-6" />
                            <span>{reservoir.name} 상세 현황</span>
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 md:p-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-6 md:mb-8">
                        <div className="bg-slate-50 p-5 md:p-6 rounded-2xl border border-slate-100">
                            <p className="text-sm text-slate-500 font-semibold mb-2">현재 수위</p>
                            <div className="flex items-baseline space-x-2">
                                <span className={`text-3xl md:text-4xl font-bold ${reservoir.currentLevel! < reservoir.minLevel! ? 'text-red-600' : 'text-slate-800'}`}>
                                    {reservoir.currentLevel!.toFixed(1)}
                                </span>
                                <span className="text-slate-500 font-medium text-lg md:text-xl">m</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">관리 범위: {reservoir.minLevel}m - {reservoir.maxLevel}m</p>
                        </div>

                        <div className="bg-indigo-50/50 p-5 md:p-6 rounded-2xl border border-indigo-50">
                            <p className="text-sm text-indigo-600 font-semibold mb-2">AI 수요 예측 정확도</p>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-3xl md:text-4xl font-bold text-slate-800">{reservoir.accuracy}%</span>
                            </div>
                            <div className="w-full bg-indigo-100 h-2 rounded-full mt-3 overflow-hidden">
                                <div
                                    className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${reservoir.accuracy}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-6 md:mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-bold text-slate-800 flex items-center space-x-2">
                                <TrendingUp size={20} className="text-emerald-500" />
                                <span>수요량 추이 (24시간)</span>
                            </h4>
                            <div className="flex items-center space-x-4 text-[11px] font-bold uppercase tracking-tight">
                                <div className="flex items-center space-x-1.5">
                                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                                    <span className="text-slate-500">실제</span>
                                </div>
                                <div className="flex items-center space-x-1.5">
                                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                                    <span className="text-slate-500">예측</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-48 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis hide />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="실제" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} animationDuration={1000} />
                                    <Line type="monotone" dataKey="예측" stroke="#f87171" strokeDasharray="5 5" strokeWidth={2} dot={false} animationDuration={1000} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {(reservoir.currentLevel! < reservoir.minLevel!) && (
                        <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start space-x-3">
                            <AlertCircle className="text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-bold text-red-800">시스템 경고</p>
                                <p className="text-sm text-red-600 mt-0.5 leading-relaxed">물 모자라용</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
