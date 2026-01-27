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
        <section ref={contentRef} className="py-20 md:py-32 bg-slate-50 px-6 md:px-8 text-slate-900">
            <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-6 md:mb-8 leading-tight tracking-tight">
                            데이터로 잇는 <br />
                            <span className="text-blue-600">지속 가능한 수자원</span> 인프라
                        </h2>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 md:mb-10 font-medium">
                            FLOWISE는 수요를 "현명하게(Wise)" 예측하여 송수유량(Flow)을 최적화합니다. AI 기반 의사결정을 통해 정수장 운영 효율을 극대화하고 에너지를 혁신적으로 절감합니다.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {[
                                { icon: <Target className="w-5 h-5 text-blue-600" />, label: "98% 이상의 수요 예측도" },
                                { icon: <Zap className="w-5 h-5 text-indigo-600" />, label: "에너지 비용 15% 절감" },
                                { icon: <ShieldCheck className="w-5 h-5 text-emerald-600" />, label: "실시간 수압 이상 탐지" },
                                { icon: <Droplets className="w-5 h-5 text-cyan-600" />, label: "자동화된 제어 시나리오" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 font-bold text-slate-700">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">{item.icon}</div>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="relative mt-8 lg:mt-0">
                        <div className="aspect-square bg-blue-600 rounded-[3rem] md:rounded-[4rem] rotate-3 absolute inset-0 opacity-10" />
                        <div className="relative aspect-square bg-white rounded-[3rem] md:rounded-[4rem] shadow-2xl border border-slate-100 flex items-center justify-center p-8 md:p-12 overflow-hidden">
                            <div className="w-full space-y-4">
                                <div className="h-4 bg-slate-100 rounded-full w-3/4" />
                                <div className="h-4 bg-slate-100 rounded-full w-1/2" />
                                <div className="h-32 bg-blue-50 rounded-3xl w-full flex items-end p-4 gap-2">
                                    <div className="flex-1 bg-blue-200 h-1/2 rounded-t-lg" />
                                    <div className="flex-1 bg-blue-400 h-3/4 rounded-t-lg" />
                                    <div className="flex-1 bg-blue-600 h-full rounded-t-lg" />
                                    <div className="flex-1 bg-blue-300 h-2/3 rounded-t-lg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 팀원 소개 */}
                <div className="text-center mb-12 md:mb-16">
                    <h3 className="text-3xl md:text-4xl font-black mb-4">FLOWISE Team Members</h3>
                    <p className="text-slate-500 font-medium">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {TEAM_MEMBERS.map((member, i) => (
                        <div key={i} className="bg-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center">
                            <div className="w-24 h-24 rounded-4xl bg-slate-100 mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                                <img src={`https://picsum.photos/300/300?random=${i + 20}`} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-1">{member.name}</h4>
                            <p className="text-blue-600 font-bold text-sm mb-4">{member.role}</p>
                            <p className="text-slate-500 text-sm leading-relaxed">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}