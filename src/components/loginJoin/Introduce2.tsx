'use client'

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { scrollAtom } from "@/atoms/uniAtoms";
import { ChevronDown, Droplets, ShieldCheck, Target, User, Zap } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";
import Logo from "./Logo";
import Background from "./Background";
import Login2 from "./Login2";

export default function Introduce2() {
    const contentRef = useRef<HTMLDivElement>(null);
    const [scroll, setScroll] = useAtom(scrollAtom);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        setScroll(0);
        setIsModalOpen(false);
        return () => { setScroll(0); setIsModalOpen(false); };
    }, []);

    useEffect(() => {
        if (!isModalOpen) return;
        document.body.style.overflow = "hidden";
        return () => { { document.body.style.overflow = "auto" }; }
    }, [isModalOpen]);

    useEffect(() => {
        if (scroll > 0) {
            contentRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [scroll]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center gap-8 overflow-hidden bg-slate-50 py-8 md:py-15">
            {/* 배경 */}
            <Background />

            <nav className="fixed top-6 right-6 z-40">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-slate-600 font-bold shadow-sm hover:shadow-md hover:border-sky-300 hover:text-sky-600 transition-all duration-300 group"
                >
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                    로그인
                </button>
            </nav>
            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-md">
                {/* 로고 */}
                <Logo scale={0.8} />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex flex-col mb-40 md:mb-50">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-4xl font-black mb-8 leading-[1.15] tracking-tight text-slate-700">
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
                                    <div key={i} className="flex items-center gap-4 font-bold text-slate-700 p-4">
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
                    <button
                        onClick={() => setScroll(v => v + 1)}
                        className="mt-12 text-slate-400 hover:text-sky-600 transition-colors animate-bounce flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">About Team</span>
                        <ChevronDown className="w-6 h-6 text-sky-400" />
                    </button>
                </div>

                {/* 팀원 소개 영역 */}
                <div ref={contentRef} className="text-center mb-16 md:mb-24">
                    <h3 className="text-3xl md:text-4xl font-black mb-4">FLOWISE Team Members</h3>
                    <p className="text-slate-500 font-medium mb-6">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
                    <div className="h-1.5 w-20 bg-sky-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-25">
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
            {isModalOpen && <Login2 setIsModalOpen={setIsModalOpen} />}
        </section>
    );
}