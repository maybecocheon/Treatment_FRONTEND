'use client'

import { useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { scrollAtom } from "@/atoms/uniAtoms";
import { ChevronDown, Droplets, ShieldCheck, Target, User, Zap } from "lucide-react";
import { TEAM_MEMBERS } from "@/data/mockData";
import Logo from "./Logo";
import Background from "./Background";
import Login from "./Login";
import { ThemeToggle } from "../main/ThemeToggle";

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

            {/* 로그인 및 테마 버튼 */}
            <nav className="fixed top-4 right-4 md:top-6 md:right-6 z-40 flex items-center gap-3">
                <ThemeToggle />
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 md:px-5 bg-card/90 backdrop-blur-md border border-card-border rounded-xl text-muted font-bold shadow-md hover:shadow-lg hover:border-primary/30 hover:text-primary transition-all duration-300 group"
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

            <div className="relative z-10 max-w-6xl mx-auto w-full flex flex-col">
                {/* 메인 히어로 섹션 */}
                <div className="flex-1 flex flex-col justify-center min-h-[calc(90vh-120px)] mb-32 md:mb-52 lg:mb-64">
                    <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                        <div className="text-center lg:text-left">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 leading-[1.2] tracking-tight text-foreground/80">
                                데이터로 잇는 <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-600">
                                    지속 가능한 수자원
                                </span> 인프라
                            </h2>
                            <p className="text-base md:text-lg lg:text-xl text-muted leading-relaxed mb-8 md:mb-10 font-medium px-2 md:px-0">
                                FLOWISE는 수요를 <span className="text-primary font-bold">"현명하게(Wise)"</span> 예측하여 송수유량(Flow)을 최적화합니다. AI 기반 의사결정을 통해 정수장 운영 효율을 극대화하고 에너지를 절감합니다.
                            </p>

                            {/* 통계/기능 카드 */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5 max-w-2xl mx-auto lg:mx-0">
                                {[
                                    { icon: <Target className="w-5 h-5 text-sky-500" />, label: "90% 이상의 수요 예측도" },
                                    { icon: <Zap className="w-5 h-5 text-amber-500" />, label: "에너지 비용 5~10% 절감" },
                                    { icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />, label: "실시간 수압 이상 탐지" },
                                    { icon: <Droplets className="w-5 h-5 text-blue-500" />, label: "펌프 가동 최적화 운영" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 md:gap-4 font-bold text-foreground/80 p-3 md:p-4 bg-card/50 rounded-2xl border border-card-border lg:bg-transparent lg:border-none">
                                        <div className="p-2 md:p-2.5 bg-card rounded-xl shadow-sm border border-card-border shrink-0">{item.icon}</div>
                                        <span className="text-xs sm:text-sm md:text-base text-left">{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 시각화 박스 */}
                        <div className="relative mt-10 lg:mt-0 max-w-100 lg:max-w-none mx-auto w-full px-4 md:px-0">
                            <div className="aspect-square bg-sky-400 rounded-[2.5rem] md:rounded-[4rem] rotate-3 absolute inset-0 opacity-10 animate-pulse" />
                            <div className="relative aspect-square bg-card rounded-[2.5rem] md:rounded-[4rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-card-border flex items-center justify-center p-6 md:p-12 overflow-hidden">
                                <div className="w-full space-y-4 md:space-y-6">
                                    <div className="h-3 md:h-4 bg-card-border rounded-full w-3/4 animate-pulse" />
                                    <div className="h-3 md:h-4 bg-card-border rounded-full w-1/2 animate-pulse" />
                                    <div className="h-32 md:h-40 bg-primary/5 rounded-3xl md:rounded-4xl w-full flex items-end p-4 md:p-6 gap-2 md:gap-3 border border-primary/20">
                                        <div className="flex-1 bg-primary/30 h-1/2 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.1s]" />
                                        <div className="flex-1 bg-primary/60 h-3/4 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.3s]" />
                                        <div className="flex-1 bg-primary h-full rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.2s]" />
                                        <div className="flex-1 bg-primary/40 h-2/3 rounded-t-lg md:rounded-t-xl animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={() => setScroll(v => v + 1)}
                        className="mt-5 pt-10 text-muted hover:text-primary transition-colors animate-bounce flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">About Team</span>
                        <ChevronDown className="w-6 h-6 text-primary" />
                    </button>
                </div>

                {/* 팀원 소개 영역 */}
                <div ref={contentRef} className="text-center mb-12 md:mb-20 px-4">
                    <h3 className="text-2xl md:text-4xl font-black mb-4">FLOWISE Team Members</h3>
                    <p className="text-sm md:text-base text-muted font-medium mb-6">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
                    <div className="h-1.5 w-16 md:w-20 bg-primary mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 mb-20 md:mb-25 px-4 md:px-0">
                    {TEAM_MEMBERS.map((member, i) => (
                        <div key={i} className="group bg-card p-6 md:p-10 rounded-4xl md:rounded-[2.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-card-border hover:border-primary/30 hover:shadow-[0_20px_40px_rgba(var(--primary),0.1)] transition-all duration-500 text-center">
                            <div className="relative w-24 h-24 md:w-28 md:h-28 mx-auto mb-6 md:mb-8">
                                <div className="absolute inset-0 bg-primary/20 rounded-4xl md:rounded-[2.5rem] rotate-6 opacity-20 group-hover:rotate-12 transition-transform duration-500" />
                                <div className="relative w-full h-full rounded-[1.8rem] md:rounded-[2.2rem] bg-muted/10 overflow-hidden border-4 border-card shadow-md">
                                    <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-black text-foreground mb-2">{member.name}</h4>
                            <p className="text-primary font-bold text-[13px] mb-4 px-3 py-1 bg-primary/10 inline-block rounded-full">{member.role}</p>
                            <p className="text-muted text-xs md:text-sm leading-relaxed font-medium">{member.description}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && <Login setIsModalOpen={setIsModalOpen} />}
        </section>
    );
}