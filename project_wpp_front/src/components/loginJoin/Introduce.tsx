'use client'

import { useEffect, useRef } from "react";
import { useAtomValue } from "jotai";
import { scrollToContentAtom } from "@/atoms/scroll";
import { Droplets, ShieldCheck, Target, Zap } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";

export default function Introduce() {
    const contentRef = useRef<HTMLDivElement>(null);
    const scrollSignal = useAtomValue(scrollToContentAtom);

    useEffect(() => {
        if (scrollSignal > 0) {
            contentRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [scrollSignal]);

    return (
        <section ref={contentRef} className="relative py-24 md:py-32 bg-white overflow-hidden px-6 md:px-8 text-slate-900">
            {/* 배경 장식: 상단 섹션과 이어지는 부드러운 빛 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-50 blur-[120px] rounded-full opacity-60" />
                <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-blue-50 blur-[100px] rounded-full opacity-60" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-40">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-black mb-8 leading-[1.15] tracking-tight text-slate-900">
                            데이터로 잇는 <br />
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-blue-600">
                                지속 가능한 수자원
                            </span> 인프라
                        </h2>
                        <p className="text-lg md:text-xl text-slate-500 leading-relaxed mb-10 font-medium">
                            FLOWISE는 수요를 <span className="text-sky-600 font-bold">"현명하게(Wise)"</span> 예측하여 송수유량(Flow)을 최적화합니다. AI 기반 의사결정을 통해 정수장 운영 효율을 극대화하고 에너지를 혁신적으로 절감합니다.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            {[
                                { icon: <Target className="w-5 h-5 text-sky-500" />, label: "98% 이상의 수요 예측도" },
                                { icon: <Zap className="w-5 h-5 text-amber-500" />, label: "에너지 비용 15% 절감" },
                                { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, label: "실시간 수압 이상 탐지" },
                                { icon: <Droplets className="w-5 h-5 text-blue-500" />, label: "자동화된 제어 시나리오" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 font-bold text-slate-700 bg-slate-50/50 p-4 rounded-2xl border border-slate-100/50 transition-hover hover:bg-white hover:shadow-md hover:border-sky-100">
                                    <div className="p-2.5 bg-white rounded-xl shadow-sm border border-slate-100">{item.icon}</div>
                                    <span className="text-sm md:text-base">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative mt-8 lg:mt-0">
                        {/* 시각화 박스 */}
                        <div className="aspect-square bg-sky-400 rounded-[3rem] md:rounded-[4rem] rotate-3 absolute inset-0 opacity-10 animate-pulse" />
                        <div className="relative aspect-square bg-white rounded-[3rem] md:rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center p-8 md:p-12 overflow-hidden">
                            <div className="w-full space-y-6">
                                <div className="h-4 bg-slate-100 rounded-full w-3/4 animate-pulse" />
                                <div className="h-4 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                                <div className="h-40 bg-sky-50/50 rounded-4xl w-full flex items-end p-6 gap-3 border border-sky-100/50">
                                    <div className="flex-1 bg-sky-200 h-1/2 rounded-t-xl animate-bounce [animation-delay:0.1s]" />
                                    <div className="flex-1 bg-sky-400 h-3/4 rounded-t-xl animate-bounce [animation-delay:0.3s]" />
                                    <div className="flex-1 bg-blue-500 h-full rounded-t-xl animate-bounce [animation-delay:0.2s]" />
                                    <div className="flex-1 bg-sky-300 h-2/3 rounded-t-xl animate-bounce [animation-delay:0.4s]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 팀원 소개 영역 */}
                <div className="text-center mb-16 md:mb-24">
                    <h3 className="text-3xl md:text-4xl font-black mb-4">FLOWISE Team Members</h3>
                    <p className="text-slate-500 font-medium mb-6">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
                    <div className="h-1.5 w-20 bg-sky-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {TEAM_MEMBERS.map((member, i) => (
                        <div key={i} className="group bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-sky-200 hover:shadow-[0_20px_40px_rgba(14,165,233,0.1)] transition-all duration-500 text-center">
                            <div className="relative w-28 h-28 mx-auto mb-8">
                                <div className="absolute inset-0 bg-sky-400 rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                                <div className="relative w-full h-full rounded-[2.2rem] bg-slate-100 overflow-hidden border-4 border-white shadow-md">
                                    <img src={`https://picsum.photos/300/300?random=${i + 20}`} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-slate-900 mb-2">{member.name}</h4>
                            <p className="text-sky-600 font-bold text-sm mb-5 px-3 py-1 bg-sky-50 inline-block rounded-full">{member.role}</p>
                            <p className="text-slate-500 text-sm leading-relaxed font-medium">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}