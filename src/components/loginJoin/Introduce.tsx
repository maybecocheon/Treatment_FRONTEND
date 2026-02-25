'use client'

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { scrollAtom } from "@/atoms/uniAtoms";
import { ChevronDown, Droplets, ShieldCheck, Target, User, Zap } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";
import Logo from "./Logo";
import Background from "./Background";
import Login from "./Login";

export default function Introduce() {
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
        return () => { document.body.style.overflow = "auto"; }
    }, [isModalOpen]);

    useEffect(() => {
        if (scroll > 0) {
            contentRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [scroll]);

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center gap-6 overflow-y-auto py-12 md:py-20 px-4">
            {/* 배경 */}
            <Background />

            {/* 로그인 버튼 */}
            <nav className="fixed top-4 right-4 md:top-6 md:right-6 z-40">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-md border border-slate-200 rounded-full text-slate-600 font-bold shadow-md hover:shadow-lg hover:border-sky-300 hover:text-sky-600 transition-all duration-300 group"
                >
                    <User className="w-4 h-4 transition-transform group-hover:scale-110" />
                    <span className="text-sm md:text-base">로그인</span>
                </button>
            </nav>

            {/* 모바일용 로고 */}
            <div className="block md:hidden">
                <Logo scale={0.7} />
            </div>

            {/* 데스크톱용 로고 */}
            <div className="hidden md:block">
                <Logo variant="main" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto w-full">
                {/* 메인 히어로 섹션 */}
                <div className="flex flex-col mb-20 md:mb-40 lg:mb-50">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-[1.2] tracking-tight text-slate-700">
                                데이터로 잇는 <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-sky-500 to-blue-600">
                                    지속 가능한 수자원
                                </span> 인프라
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 md:mb-10 font-medium px-2 md:px-0">
                                FLOWISE는 수요를 <span className="text-sky-600 font-bold">"현명하게(Wise)"</span> 예측하여 송수유량(Flow)을 최적화합니다. AI 기반 의사결정을 통해 정수장 운영 효율을 극대화하고 에너지를 혁신적으로 절감합니다.
                            </p>

                            {/* 통계/기능 카드 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 max-w-2xl mx-auto lg:mx-0">
                                {[
                                    { icon: <Target className="w-5 h-5 text-sky-500" />, label: "90% 이상의 수요 예측도" },
                                    { icon: <Zap className="w-5 h-5 text-amber-500" />, label: "에너지 비용 5~10% 절감" },
                                    { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, label: "실시간 수압 이상 탐지" },
                                    { icon: <Droplets className="w-5 h-5 text-blue-500" />, label: "펌프 가동 최적화 운영" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 md:gap-4 font-bold text-slate-700 p-3 md:p-4 bg-white/50 rounded-2xl border border-slate-100 lg:bg-transparent lg:border-none">
                                        <div className="p-2 md:p-2.5 bg-white rounded-xl shadow-sm border border-slate-100 shrink-0">{item.icon}</div>
                                        <span className="text-xs sm:text-sm md:text-base text-left">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 시각화 박스 */}
                        <div className="relative mt-10 lg:mt-0 max-w-100 lg:max-w-none mx-auto w-full px-4 md:px-0">
                            <div className="aspect-square bg-sky-400 rounded-[2.5rem] md:rounded-[4rem] rotate-3 absolute inset-0 opacity-10 animate-pulse" />
                            <div className="relative aspect-square bg-white rounded-[2.5rem] md:rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center justify-center p-6 md:p-12 overflow-hidden">
                                <div className="w-full space-y-4 md:space-y-6">
                                    <div className="h-3 md:h-4 bg-slate-100 rounded-full w-3/4 animate-pulse" />
                                    <div className="h-3 md:h-4 bg-slate-100 rounded-full w-1/2 animate-pulse" />
                                    <div className="h-32 md:h-40 bg-sky-50/50 rounded-3xl md:rounded-4xl w-full flex items-end p-4 md:p-6 gap-2 md:gap-3 border border-sky-100/50">
                                        <div className="flex-1 bg-sky-200 h-1/2 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.1s]" />
                                        <div className="flex-1 bg-sky-400 h-3/4 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.3s]" />
                                        <div className="flex-1 bg-blue-500 h-full rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.2s]" />
                                        <div className="flex-1 bg-sky-300 h-2/3 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setScroll(v => v + 1)}
                        className="mt-16 md:mt-20 text-slate-400 hover:text-sky-600 transition-colors animate-bounce flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">About Team</span>
                        <ChevronDown className="w-6 h-6 text-sky-400" />
                    </button>
                </div>

                {/* 팀원 소개 영역 */}
                <div ref={contentRef} className="text-center mb-12 md:mb-20 px-4">
                    <h3 className="text-2xl md:text-4xl font-black mb-4">FLOWISE Team Members</h3>
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-6">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
                    <div className="h-1.5 w-16 md:w-20 bg-sky-500 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-20 md:mb-25 px-4 md:px-0">
                    {TEAM_MEMBERS.map((member, i) => (
                        <div key={i} className="group bg-white p-6 md:p-10 rounded-4xl md:rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 hover:border-sky-200 hover:shadow-[0_20px_40px_rgba(14,165,233,0.1)] transition-all duration-500 text-center">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 md:mb-8">
                                <div className="absolute inset-0 bg-sky-400 rounded-4xl md:rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                                <div className="relative w-full h-full rounded-[1.8rem] md:rounded-[2.2rem] bg-slate-100 overflow-hidden border-4 border-white shadow-md">
                                    <img src={`https://picsum.photos/300/300?random=${i + 20}`} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-slate-900 mb-2">{member.name}</h4>
                            <p className="text-sky-600 font-bold text-xs md:text-sm mb-4 px-3 py-1 bg-sky-50 inline-block rounded-full">{member.role}</p>
                            <p className="text-slate-500 text-xs md:text-sm leading-relaxed font-medium">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <Login setIsModalOpen={setIsModalOpen} />}
        </section>
    );
}