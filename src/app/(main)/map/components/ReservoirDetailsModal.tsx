'use client'

import { WaterSystemData } from "@/data/types";
import { BarChart3, Droplets, TrendingUp, Waves, X, ArrowRight, AlertTriangle, Zap } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReservoirDetailsModal({ reservoir, onClose }: { reservoir: WaterSystemData; onClose: () => void; }) {
    const router = useRouter();

    const chartData = reservoir.basePattern?.map((_, idx) => ({
        time: `${idx}h`,
        base: reservoir.basePattern?.[idx] || 0,
        daily: reservoir.dailyForecast?.[idx] || 0,
        recal: reservoir.recalculation?.[idx] || 0,
    })) || [];

    // 수위 위험 상태 체크
    const isLevelCritical = reservoir.currentLevel! < reservoir.minLevel!;

    useEffect(() => {
        if (!reservoir?.id) return; // 데이터가 없으면 실행 안 함

        const currentPath = window.location.pathname;

        if (!currentPath.includes(reservoir.id)) {
            window.history.pushState(null, "", `${currentPath}/${reservoir.id}`);
        }

        document.body.style.overflow = "hidden";

        return () => {
            // 닫힐 때는 ID가 붙기 전의 원래 경로로 복구
            const basePath = currentPath.replace(`/${reservoir.id}`, "");
            window.history.replaceState(null, "", basePath);
            document.body.style.overflow = "auto";
        };
    }, [reservoir.id]);

    // 브라우저 "뒤로가기" 클릭 시 모달이 닫히도록 하고 싶다면 이 로직을 추가하세요.
    useEffect(() => {
        const handlePopState = () => {
            onClose();
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 md:p-6 animate-in fade-in duration-300">
            <div className="bg-white/60 rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">

                {/* 헤더 */}
                <div className="px-6 py-5 md:px-10 md:py-8 flex justify-between items-center transition-colors duration-500 bg-sky-50/50">
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isLevelCritical ? "bg-red-400" : "bg-blue-500/20"}`}>
                            <Droplets className={`${isLevelCritical ? "text-red-100" : "text-blue-400"} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                                {reservoir.name}
                            </h3>
                            <p className={`${isLevelCritical ? "text-red-400" : "text-slate-400"} text-xs md:text-sm font-medium`}>
                                {isLevelCritical ? "즉각적인 펌프 가동 검토가 필요합니다" : "실시간 재산출 기반 용수 수요 예측 현황"}
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-900 hover:text-white transition-all hover:bg-white/10 p-2.5 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50/30">

                    {/* 수위 경고 배너 (위험 시에만 노출) */}
                    {isLevelCritical && (
                        <div className="mb-8 flex items-center gap-4 bg-red-50 border-2 border-red-100 p-6 rounded-3xl animate-pulse">
                            <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200">
                                <AlertTriangle className="text-white w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-red-900 font-bold text-lg leading-tight">저수위 경보 발생</h4>
                                <p className="hidden md:block text-red-600 text-sm font-medium">현재 수위가 설정된 최저치({reservoir.minLevel}m)보다 낮습니다. 공급 부족이 예상됩니다.</p>
                            </div>
                            <button className="bg-red-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors">
                                즉시 조치
                            </button>
                        </div>
                    )}

                    {/* 상단 요약 카드 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                        <div className={`glass p-6 rounded-3xl transition-colors ${isLevelCritical ? "border-red-200 ring-2 ring-red-50" : "border-slate-100"}`}>
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <Waves size={14} className={isLevelCritical ? "text-red-500" : "text-blue-500"} /> 현재 수위 현황
                            </p>
                            <div className="flex items-end justify-between">
                                <div className="flex items-baseline gap-1">
                                    <span className={`text-4xl font-black ${isLevelCritical ? "text-red-600" : "text-slate-900"}`}>
                                        {reservoir.currentLevel?.toFixed(1)}
                                    </span>
                                    <span className="text-slate-500 font-bold text-lg">/ {reservoir.maxLevel}m</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${isLevelCritical ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-600"}`}>
                                    {isLevelCritical ? "위험" : "안정"}
                                </span>
                            </div>
                        </div>

                        <div className="glass p-6 rounded-3xl">
                            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                <BarChart3 size={14} className="text-indigo-500" /> 알고리즘 예측 신뢰도
                            </p>
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-4xl font-black text-slate-900">{reservoir.accuracy}%</span>
                                <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${reservoir.accuracy}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메인 차트 영역 */}
                    <div className="glass rounded-4xl p-8 mb-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-500" /> 단계별 용수수요 예측 추이
                            </h4>
                            <div className="flex flex-wrap gap-3">
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-slate-300 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">기본 패턴</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-blue-400 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">예측</span></div>
                                <div className="flex items-center gap-1.5"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span><span className="text-[10px] font-bold text-slate-500 uppercase">실시간 데이터</span></div>
                            </div>
                        </div>
                        <div className="h-80 w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dy={10} interval={3} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} dx={-5} />
                                    <Tooltip contentStyle={{ borderRadius: "16px", border: "none", boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }} />
                                    <Line type="monotone" dataKey="base" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="daily" stroke="#60a5fa" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="recal" stroke="#10b981" strokeWidth={4} dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 하단 페이지 이동 가이드 */}
                    <button
                        onClick={() => router.push(`/scheduling/${reservoir.id}`)}
                        className="group bg-sky-100 shadow-2xl relative w-full p-8 overflow-hidden rounded-[2.5rem] text-slate-900 transition-all hover:bg-slate-100 active:scale-[0.99] shadow-slate-200"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-sky-500/20 transition-colors" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="text-center md:text-left">
                                <h4 className="text-xl font-black flex items-center justify-center md:justify-start gap-3">
                                    <Zap size={24} className="fill-sky-400 text-sky-400" /> AI 펌프 운영 최적화 리포트
                                </h4>
                                <p className="text-slate-600 text-sm mt-1 tracking-tight">전력 요금을 최소화하는 최적 가동 스케줄링 데이터 확인</p>
                            </div>
                            <div className="flex items-center gap-3 bg-sky-500 px-8 py-4 rounded-2xl font-black group-hover:bg-sky-300/50 transition-all">
                                자세히 보기 <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}