import { plantData } from "@/data/mockData";
import { Waves, X } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function PlantTrendModal({ onClose }: { onClose: () => void }) {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-indigo-900 px-6 py-5 md:px-8 md:py-6 flex justify-between items-center">
                    <h3 className="text-xl md:text-2xl font-bold text-white flex items-center space-x-2">
                        <Waves className="text-indigo-400 w-5 h-5 md:w-6 md:h-6" />
                        <span>정수장 잔량 상세 분석</span>
                    </h3>
                    <button onClick={onClose} className="text-indigo-300 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-6 md:p-10">
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={plantData.storageHistory}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} unit="%" />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#6366f1" fillOpacity={1} fill="url(#colorValue)" strokeWidth={3} animationDuration={1500} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-6 md:mt-8 flex justify-center">
                        <div className="bg-slate-50 px-6 py-4 md:px-8 md:py-4 rounded-3xl flex items-center justify-between w-full md:w-auto md:justify-start md:space-x-12 border border-slate-100">
                            <div className="text-center flex-1 md:flex-none">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">최고 잔량</p>
                                <p className="text-2xl font-black text-slate-800">82%</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200 mx-4 md:mx-0"></div>
                            <div className="text-center flex-1 md:flex-none">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">최저 잔량</p>
                                <p className="text-2xl font-black text-slate-800">72%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
