'use client'

import React, { useRef, useState } from 'react';
import { ChevronDown, Droplets, Target, Zap, ShieldCheck, Lock, User, ArrowRight } from 'lucide-react';
import { TEAM_MEMBERS } from '@/data/constants';

interface LandingPageProps {
  onLogin: () => void;
}

export default function LandingPage(onLogin: React.FC<LandingPageProps>) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ id: '', pw: '' });

  const scrollToContent = () => {
    contentRef.current?.scrollIntoVieaw({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
      {/* Hero & Login Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Ambience */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
        </div>

        <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center">
          <div className="mb-10 text-center animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="inline-flex p-4 rounded-3xl bg-blue-600 shadow-2xl shadow-blue-500/50 mb-6">
              <Droplets className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl font-black text-white tracking-tighter mb-3">FLOWISE</h1>
            <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-sm">Decision Support System</p>
          </div>

          {/* Login Box */}
          <form
            onSubmit={handleSubmit}
            className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-700 delay-200"
          >
            <div className="space-y-4">
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="text"
                  placeholder="아이디 (admin_flowise)"
                  required
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                <input
                  type="password"
                  placeholder="비밀번호"
                  required
                  value={formData.pw}
                  onChange={(e) => setFormData({ ...formData, pw: e.target.value })}
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>
            <button
              type="submit"
              className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                메인화면으로 이동 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </form>
        </div>

        <button
          onClick={scrollToContent}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-black uppercase tracking-widest">About Project</span>
          <ChevronDown className="w-6 h-6" />
        </button>
      </section>

      {/* Info Section */}
      <section ref={contentRef} className="py-32 bg-slate-50 px-8 text-slate-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-5xl font-black mb-8 leading-tight tracking-tight">
                데이터로 잇는 <br />
                <span className="text-blue-600">지속 가능한 수자원</span> 인프라
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-10 font-medium">
                FLOWISE는 수요를 "현명하게(Wise)" 예측하여 송수유량(Flow)을 최적화합니다. AI 기반 의사결정을 통해 정수장 운영 효율을 극대화하고 에너지를 혁신적으로 절감합니다.
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
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
            <div className="relative">
              <div className="aspect-square bg-blue-600 rounded-[4rem] rotate-3 absolute inset-0 opacity-10" />
              <div className="relative aspect-square bg-white rounded-[4rem] shadow-2xl border border-slate-100 flex items-center justify-center p-12 overflow-hidden">
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

          {/* Members */}
          <div className="text-center mb-16">
            <h3 className="text-4xl font-black mb-4">FLOWISE Team Members</h3>
            <p className="text-slate-500 font-medium">프로젝트를 이끄는 핵심 인재들을 소개합니다.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, i) => (
              <div key={i} className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all text-center">
                <div className="w-24 h-24 rounded-[2rem] bg-slate-100 mx-auto mb-6 overflow-hidden border-4 border-white shadow-lg">
                  <img src={`https://picsum.photos/300/300?random=${i + 20}`} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-1">{member.name}</h4>
                <p className="text-blue-600 font-bold text-sm mb-4">{member.role}</p>
                <p className="text-slate-500 text-sm leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-950 text-slate-600 text-center text-sm border-t border-white/5">
        <p>© 2026 FLOWISE System. Innovating Water Infrastructure through Intelligence.</p>
      </footer>
    </div>
  );
};