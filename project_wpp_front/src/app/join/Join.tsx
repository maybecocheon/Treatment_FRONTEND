'use client'

import { useState } from 'react';
import { Lock, User, Mail, Building2, ArrowRight } from 'lucide-react';
import Background from '@/components/Background';
import Logo from '@/components/Logo';
import Input from '@/components/Input';


interface SignUpPageProps {
    onSignUpSuccess?: () => void;
}

export default function Join({ onSignUpSuccess }: SignUpPageProps) {

    const [formData, setFormData] = useState({
        id: '',
        pw: '',
        confirmPw: '',
        name: '',
        dept: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, validation logic would go here
        onSignUpSuccess();
    };

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 배경 */}
            <Background />

            {/* 로고 */}
            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center gap-4">
                <Logo scale={0.8}/>
            </div>

            <div className="w-full max-w-md p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.15)]">
                <h1 className="text-2xl font-bold text-center mb-2">
                    계정 생성
                </h1>
                <p className="text-center text-sm text-slate-400 mb-8">
                    FLOWISE 시스템 접근 권한 신청
                </p>

                <form className="space-y-6">
                    {/* 사원 정보 */}
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400">사원 정보</p>
                        <Input icon={User} placeholder="성함" />
                        <Input icon={Building2} placeholder="부서 (예: 정수운영팀)" />
                    </div>

                    {/* 로그인 정보 */}
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400">로그인 정보</p>
                        <Input icon={Mail} placeholder="아이디" />

                        <div className="grid grid-cols-2 gap-3">
                            <Input icon={Lock} type="password" placeholder="비밀번호" />
                            <Input icon={Lock} type="password" placeholder="비밀번호 확인" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            가입 승인 요청 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <p className="text-xs text-center text-slate-500 mt-4">
                        계정 생성 시 관리자의 승인이 필요합니다.<br />
                        승인 완료 후 입력하신 아이디로 로그인이 가능합니다.
                    </p>
                </form>
            </div>
        </section>
    );
}
