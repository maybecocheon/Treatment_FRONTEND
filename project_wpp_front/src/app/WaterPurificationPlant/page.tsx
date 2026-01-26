'use client'

import { useState } from 'react';
import { AlertCircle, Waves, Gauge, Droplets, TrendingUp, X } from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
    ResponsiveContainer, LineChart, Line
} from 'recharts';
import { plantData } from '@/data/mockData';
import { WaterSystemData } from '@/types';
import PlantStatsBar from '@/components/PlantStatsBar';
import KakaoMap from '@/components/KakaoMap';

const ReservoirDetailsModal = ({ reservoir, onClose }: { reservoir: WaterSystemData; onClose: () => void; }) => {
    const chartData = reservoir.demandActual?.map((actual, idx: number) => ({
        time: `${idx * 4}h`,
        실제: actual,
        예측: reservoir.demandPredicted?.[idx]
    })) || [];

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="bg-slate-900 px-8 py-6 flex justify-between items-center">
                    <div>
                        <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                            <Droplets className="text-blue-400" />
                            <span>{reservoir.name} 상세 현황</span>
                        </h3>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                            <p className="text-sm text-slate-500 font-semibold mb-2">현재 수위</p>
                            <div className="flex items-baseline space-x-2">
                                <span className={`text-4xl font-bold ${reservoir.currentLevel! < reservoir.minLevel! ? 'text-red-600' : 'text-slate-800'}`}>
                                    {reservoir.currentLevel!.toFixed(1)}
                                </span>
                                <span className="text-slate-500 font-medium text-xl">m</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-2 font-medium">관리 범위: {reservoir.minLevel}m - {reservoir.maxLevel}m</p>
                        </div>

                        <div className="bg-indigo-50/50 p-6 rounded-2xl border border-indigo-50">
                            <p className="text-sm text-indigo-600 font-semibold mb-2">AI 수요 예측 정확도</p>
                            <div className="flex items-baseline space-x-2">
                                <span className="text-4xl font-bold text-slate-800">{reservoir.accuracy}%</span>
                            </div>
                            <div className="w-full bg-indigo-100 h-2 rounded-full mt-3 overflow-hidden">
                                <div
                                    className="bg-indigo-500 h-full rounded-full transition-all duration-1000"
                                    style={{ width: `${reservoir.accuracy}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-8">
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
};

const PlantTrendModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-indigo-900 px-8 py-6 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white flex items-center space-x-2">
                        <Waves className="text-indigo-400" />
                        <span>정수장 잔량 상세 분석</span>
                    </h3>
                    <button onClick={onClose} className="text-indigo-300 hover:text-white transition-colors bg-white/10 p-2 rounded-full">
                        <X size={20} />
                    </button>
                </div>
                <div className="p-10">
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
                    <div className="mt-8 flex justify-center">
                        <div className="bg-slate-50 px-8 py-4 rounded-3xl flex items-center space-x-12 border border-slate-100">
                            <div className="text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">최고 잔량</p>
                                <p className="text-2xl font-black text-slate-800">82%</p>
                            </div>
                            <div className="w-px h-10 bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-xs text-slate-400 font-bold uppercase mb-1">최저 잔량</p>
                                <p className="text-2xl font-black text-slate-800">72%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default function Dashboard() {
    const [selectedReservoir, setSelectedReservoir] = useState<WaterSystemData | null>(null);
    const [showPlantTrend, setShowPlantTrend] = useState(false);

    return (
        <div className="relative w-full h-full bg-slate-50 p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">지도 기반 배수지 현황</h1>
                    <p className="text-slate-500 mt-1 font-medium">실시간 모니터링 및 수위 예측</p>
                </div>
            </div>

            {/* 배수지 정보 */}
            <PlantStatsBar onStorageClick={() => setShowPlantTrend(true)} />

            {/* 맵 */}
            <div className="flex-1 bg-white rounded-4xl shadow-xl overflow-hidden relative border border-slate-200">
                <KakaoMap setSelectedReservoir={setSelectedReservoir} />

                {/* Floating Map Legend */}
                <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md p-5 rounded-[1.5rem] shadow-xl border border-gray-100 flex flex-col space-y-3 text-[11px] font-black uppercase tracking-widest text-slate-500">
                    <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-blue-500 rounded-full ring-4 ring-blue-50"></span>
                        <span>정상 수위</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="w-3 h-3 bg-red-500 rounded-full ring-4 ring-red-50"></span>
                        <span>하한 미달</span>
                    </div>
                    <div className="h-px bg-slate-100 my-1"></div>
                    <div className="flex items-center space-x-3">
                        <span className="w-6 h-0.5 border-t-2 border-dashed border-red-300"></span>
                        <span>관리 한계선</span>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {selectedReservoir && (
                <ReservoirDetailsModal
                    reservoir={selectedReservoir}
                    onClose={() => setSelectedReservoir(null)}
                />
            )}
            {showPlantTrend && (
                <PlantTrendModal
                    onClose={() => setShowPlantTrend(false)}
                />
            )}
        </div>
    );
}
