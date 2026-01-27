'use client'

import { StrategyType } from "@/data/types";
import { Zap, ShieldCheck, Settings, BrainCircuit, Info, CheckCircle2, Save, ArrowRight } from "lucide-react";
import { useMemo, useState } from "react";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart } from "recharts";

export default function Decision() {
    const [selectedStrategy, setSelectedStrategy] = useState<StrategyType>('A');
    const [manualValues, setManualValues] = useState({ flow: 11500, pressure: 5.8 });
    const [isApplied, setIsApplied] = useState(false);

    // Mock data for AI analysis comparison
    const comparisonData = useMemo(() => {
        const base = [
            { name: '운영 비용', current: 100, strategy: selectedStrategy === 'A' ? 82 : selectedStrategy === 'B' ? 115 : 95 },
            { name: '공급 안정성', current: 100, strategy: selectedStrategy === 'A' ? 92 : selectedStrategy === 'B' ? 128 : 105 },
            { name: '에너지 효율', current: 100, strategy: selectedStrategy === 'A' ? 130 : selectedStrategy === 'B' ? 95 : 110 },
        ];
        return base;
    }, [selectedStrategy]);

    const handleApply = () => {
        setIsApplied(true);
        setTimeout(() => setIsApplied(false), 3000);
    };

    return (
        <div>
            {/* 헤더 */}
            <div className="mb-6 md:mb-10">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">의사결정 시뮬레이션</h2>
                <p className="text-slate-500 font-medium text-sm md:text-lg">AI 알고리즘이 제안하는 최적의 운영 전략 시뮬레이션</p>
            </div>

            {/* 전략 선택 영역 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* 전략 A: 에너지 최적화 */}
                <button
                    onClick={() => setSelectedStrategy('A')}
                    className={`relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 text-left transition-all group ${selectedStrategy === 'A'
                        ? 'bg-blue-600 border-blue-600 shadow-xl shadow-blue-500/20 text-white'
                        : 'bg-white border-slate-200 hover:border-blue-300 text-slate-600'
                        }`}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl ${selectedStrategy === 'A' ? 'bg-white/20' : 'bg-blue-50 text-blue-600'}`}>
                            <Zap size={28} />
                        </div>
                        <span className={`text-4xl font-black italic opacity-20 ${selectedStrategy === 'A' ? 'text-white' : 'text-slate-900'}`}>A</span>
                    </div>
                    <h3 className="text-xl font-black mb-4">에너지 절감 최적화</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">
                                <span>예상 비용</span>
                                <span className="text-emerald-400">-18%</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${selectedStrategy === 'A' ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <div className="h-full bg-emerald-400 w-[40%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">
                                <span>공급 리스크</span>
                                <span className="text-orange-400">보통</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${selectedStrategy === 'A' ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <div className="h-full bg-orange-400 w-[65%]" />
                            </div>
                        </div>
                    </div>
                </button>

                {/* 전략 B: 안정성 강화 */}
                <button
                    onClick={() => setSelectedStrategy('B')}
                    className={`relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 text-left transition-all group ${selectedStrategy === 'B'
                        ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-500/20 text-white'
                        : 'bg-white border-slate-200 hover:border-indigo-300 text-slate-600'
                        }`}
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className={`p-4 rounded-2xl ${selectedStrategy === 'B' ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                            <ShieldCheck size={28} />
                        </div>
                        <span className={`text-4xl font-black italic opacity-20 ${selectedStrategy === 'B' ? 'text-white' : 'text-slate-900'}`}>B</span>
                    </div>
                    <h3 className="text-xl font-black mb-4">공급 안정성 강화</h3>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">
                                <span>예상 비용</span>
                                <span className="text-red-400">+15%</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${selectedStrategy === 'B' ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <div className="h-full bg-red-400 w-[85%]" />
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest mb-1.5 opacity-80">
                                <span>공급 리스크</span>
                                <span className="text-emerald-400">매우 낮음</span>
                            </div>
                            <div className={`h-1.5 rounded-full overflow-hidden ${selectedStrategy === 'B' ? 'bg-white/20' : 'bg-slate-100'}`}>
                                <div className="h-full bg-emerald-400 w-[20%]" />
                            </div>
                        </div>
                    </div>
                </button>

                {/* 전략 C: 수동 입력 */}
                <div className={`relative p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all ${selectedStrategy === 'C'
                    ? 'bg-slate-900 border-slate-900 shadow-xl text-white'
                    : 'bg-white border-slate-200 text-slate-600'
                    }`}>
                    <div className="flex justify-between items-start mb-6">
                        <button
                            onClick={() => setSelectedStrategy('C')}
                            className={`p-4 rounded-2xl transition-colors ${selectedStrategy === 'C' ? 'bg-white/20' : 'bg-slate-100 text-slate-600'}`}
                        >
                            <Settings size={28} />
                        </button>
                        <span className={`text-4xl font-black italic opacity-20 ${selectedStrategy === 'C' ? 'text-white' : 'text-slate-900'}`}>C</span>
                    </div>
                    <h3 className="text-xl font-black mb-4">수동 운영 계획</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block opacity-60">목표 송수량 (m³/h)</label>
                            <input
                                type="number"
                                value={manualValues.flow}
                                onChange={(e) => setManualValues({ ...manualValues, flow: Number(e.target.value) })}
                                className={`w-full bg-transparent border-b py-2 focus:outline-none focus:border-blue-400 font-bold ${selectedStrategy === 'C' ? 'border-white/20' : 'border-slate-200'}`}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-black uppercase tracking-widest mb-1.5 block opacity-60">목표 토출 압력 (bar)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={manualValues.pressure}
                                onChange={(e) => setManualValues({ ...manualValues, pressure: Number(e.target.value) })}
                                className={`w-full bg-transparent border-b py-2 focus:outline-none focus:border-blue-400 font-bold ${selectedStrategy === 'C' ? 'border-white/20' : 'border-slate-200'}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* AI 추천 분석 영역 */}
            <div className="bg-white p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-200 shadow-sm">
                <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-6 md:mb-8">
                            <div className="p-2 bg-indigo-100 rounded-xl text-indigo-600">
                                <BrainCircuit size={24} />
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">AI 기반 추천 분석</h3>
                        </div>

                        <div className="space-y-6">
                            <div className="p-5 md:p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-start gap-4">
                                <div className="bg-blue-600 p-2 rounded-xl text-white shrink-0">
                                    <Info size={18} />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-900 mb-1">운영 전략 요약</p>
                                    <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                        {selectedStrategy === 'A' && "현재 수요 예측 데이터와 에너지 단가를 분석한 결과, 야간 펌프 가동을 극대화하여 연간 약 4,200만원의 전력비를 절감할 수 있는 최적의 시나리오입니다."}
                                        {selectedStrategy === 'B' && "상부 지역 배수지 수위가 평균보다 낮아지고 있습니다. 공급 안정성을 위해 송수 압력을 0.5 bar 상향 조정하여 민원 발생 리스크를 최소화하는 전략입니다."}
                                        {selectedStrategy === 'C' && "사용자 정의 수동 계획입니다. 입력하신 설정값은 과거 유사 기상/요일 데이터 대비 약 5%의 전력 소모가 더 많을 것으로 예상됩니다."}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-5 md:p-6 bg-emerald-50 rounded-3xl border border-emerald-100">
                                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-2">기대 효과</p>
                                    <p className="text-lg md:text-xl font-black text-slate-800 flex items-center gap-2">
                                        {selectedStrategy === 'A' ? '에너지 효율 30% 증가' : selectedStrategy === 'B' ? '민원 발생률 0.1% 미만' : '운영 자유도 확보'}
                                    </p>
                                </div>
                                <div className="p-5 md:p-6 bg-orange-50 rounded-3xl border border-orange-100">
                                    <p className="text-[10px] font-black text-orange-600 uppercase tracking-widest mb-2">잠재 리스크</p>
                                    <p className="text-lg md:text-xl font-black text-slate-800">
                                        {selectedStrategy === 'A' ? '피크 시간 유압 저하' : selectedStrategy === 'B' ? '관로 피로도 증가' : '수동 제어 오차'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 lg:max-w-[400px]">
                        <div className="h-[250px] md:h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={comparisonData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                                    <XAxis type="number" domain={[0, 150]} hide />
                                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} fontSize={12} fontWeight="700" width={100} />
                                    <Tooltip
                                        cursor={{ fill: '#f8fafc' }}
                                        contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Legend iconType="circle" />
                                    <Bar dataKey="current" name="현재 운영" fill="#cbd5e1" radius={[0, 4, 4, 0]} barSize={12} />
                                    <Bar dataKey="strategy" name="전략 적용 후" fill={selectedStrategy === 'A' ? '#2563eb' : selectedStrategy === 'B' ? '#4f46e5' : '#1e293b'} radius={[0, 4, 4, 0]} barSize={12} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-4">Relative Comparison (Base 100)</p>
                    </div>
                </div>

                {/* 실행 버튼 영역 */}
                <div className="mt-8 md:mt-12 flex justify-center">
                    <button
                        onClick={handleApply}
                        disabled={isApplied}
                        className={`flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 rounded-[2rem] font-black text-base md:text-lg shadow-xl transition-all duration-300 w-full md:w-auto justify-center ${isApplied
                            ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                            : 'bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-1 active:scale-95'
                            }`}
                    >
                        {isApplied ? (
                            <>
                                <CheckCircle2 size={24} />
                                전략 적용 완료
                            </>
                        ) : (
                            <>
                                <Save size={24} />
                                선택한 운영 전략 사용
                                <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}