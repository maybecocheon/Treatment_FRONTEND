"use client"

import { BarChart3, Droplets, Waves, X, ArrowRight, AlertTriangle, Zap, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ModalProps } from "@/app/props/ModalProps";
import { usePredictionData } from "@/hooks/usePredictionData";
import { selectedRangeAtom } from "@/atoms/uniAtoms";
import { useAtom } from "jotai";
import TailChart from "@/components/main/TailChart";

export default function minuteDataDetailsPage({ params }: ModalProps) {
    const { id } = params;
    const router = useRouter();

    // 차트 데이터
    const { minuteData, loadData, filteredChartData, resetRange } = usePredictionData();
    const [selectedRange, setSelectedRange] = useAtom(selectedRangeAtom);

    // 모달이 마운트(열림)될 때 스크롤 방지 & fetch 차트데이터
    useEffect(() => {
        document.body.style.overflow = "hidden";
        loadData(id);
        return () => { { document.body.style.overflow = "auto" }; resetRange(); }
    }, []);

    // 브라우저 "뒤로가기" 클릭 시 모달 닫기
    const onClose = () => {
        router.push("/map");
    };

    useEffect(() => {
        const handlePopState = () => {
            onClose();
        };
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    if (!minuteData) return null;

    // 고수위 & 저수위
    const maxLevelAlert = minuteData?.maxLevel * 0.8;
    const minLevelAlert = minuteData?.maxLevel * 0.3;
    // 수위 위험 상태 체크
    const isLevelCritical = (minuteData?.currentLevel < minLevelAlert) || (minuteData?.currentLevel > maxLevelAlert);

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
                                {minuteData.minuteDataName} 상세 정보
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

                {/* 메인 */}
                <div className="p-6 md:p-10 overflow-y-auto custom-scrollbar bg-slate-50/30">
                    {/* 수위 경고 배너 (위험 시에만 노출) */}
                    {isLevelCritical && (
                        <div className="mb-8 flex items-center gap-4 bg-red-50 border-2 border-red-100 p-6 rounded-3xl animate-pulse">
                            <div className="bg-red-500 p-3 rounded-2xl shadow-lg shadow-red-200">
                                <AlertTriangle className="text-white w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-red-900 font-bold text-lg leading-tight">{minuteData?.currentLevel < minLevelAlert ? "저수위 경보 발생" : "고수위 경보 발생"}</h4>
                                <p className="hidden md:block text-red-600 text-sm font-medium">
                                    현재 수위가 설정된
                                    {minuteData?.currentLevel < minLevelAlert ?
                                        ` 최저치(${minLevelAlert.toFixed(2)}m)보다 낮습니다. 공급 부족이 예상됩니다.` : ` 최고치(${maxLevelAlert.toFixed(2)}m)보다 높습니다. 공급 과잉이 예상됩니다.`}
                                </p>
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
                                        {minuteData?.currentLevel?.toFixed(1)}
                                    </span>
                                    <span className="text-slate-500 font-bold text-lg">/ {minuteData?.maxLevel?.toFixed(1)}m</span>
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
                                <span className="text-4xl font-black text-slate-900">{minuteData?.predictionAccuracy?.toFixed(1)}%</span>
                                <div className="flex-1 h-3 bg-slate-300 rounded-full overflow-hidden">
                                    <div className="bg-indigo-500 h-full rounded-full transition-all duration-1000" style={{ width: `${minuteData?.predictionAccuracy?.toFixed(1)}%` }} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 메인 차트 영역 */}
                    <div className="glass rounded-4xl p-8 mb-10">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
                            <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                <TrendingUp size={20} className="text-emerald-500" />단계별 용수수요 예측 추이
                            </h4>
                            <div className="flex flex-col gap-3 items-end">
                                <div className="flex gap-2">
                                    {["3h", "6h", "24h"].map(t => (
                                        <button
                                            key={t}
                                            onClick={() => setSelectedRange(t)}
                                            className={`text-[12px] px-4 py-1 rounded-2xl transition-colors ${selectedRange === t ?
                                                "bg-sky-500 text-white shadow-md"
                                                : "bg-slate-200 text-slate-500 hover:bg-slate-100"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-full">
                            <TailChart
                                time={filteredChartData.map(d => d.time || 0)}
                                data={filteredChartData.map(d => d.actualValue || 0)}
                                data2={filteredChartData.map(d => d.predictedValue || 0)}
                                color="#3b82f6"
                                color2="#818cf8"
                                label1="현재 수요"
                                label2="수요 예측"
                            />
                        </div>
                    </div>

                    {/* 하단 페이지 이동 가이드 */}
                    <button
                        onClick={() => router.push(`/scheduling`)}
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