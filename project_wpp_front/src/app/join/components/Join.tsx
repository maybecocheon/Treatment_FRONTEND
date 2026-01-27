'use client'

import { useEffect, useState } from 'react';
import { Lock, User, Mail, Building2, ArrowRight } from 'lucide-react';
import Background from '@/components/loginJoin/Background';
import Logo from '@/components/loginJoin/Logo';
import Input from '@/components/loginJoin/Input';
import { validationRules } from './joinRules';
import { useRouter } from 'next/navigation';

export default function Join() {
    const router = useRouter();

    // 비밀번호 일치 메시지 상태
    const [passwordMsg, setPasswordMsg] = useState<string>("");

    // 유효성 검사
    const [passwordRule, setPasswordRule] = useState<string>("");
    const [usernameRule, setUsernameRule] = useState<string>("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        dept: ""
    });

    // 입력란 변경 처리
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // 로그인 폼 제출 처리
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/");
    };

    // 비밀번호와 비밀번호 확인란 일치 검사
    useEffect(() => {
        if (formData.confirmPassword === "") {
            setPasswordMsg("");
        } else if (formData.password === formData.confirmPassword) {
            setPasswordMsg("✅ 비밀번호가 일치합니다.");
        } else {
            setPasswordMsg("❌ 비밀번호가 일치하지 않습니다.");
        }
    }, [formData.password, formData.confirmPassword]);

    // 아이디 입력란, 비밀번호 입력란 바뀔 시 유효성 검사
    useEffect(() => {
        const result = validationRules.username(formData.username);

        if (result === true) {
            setUsernameRule("");
        } else {
            setUsernameRule(result);
        }
    }, [formData.username])

    useEffect(() => {
        const result = validationRules.password(formData.password);

        if (result === true) {
            setPasswordRule("");
        } else {
            setPasswordRule(result);
        }
    }, [formData.password])

    return (
        <section className="relative h-full w-full flex items-center justify-center overflow-auto">
            {/* 배경 */}
            <Background />

            {/* 회원가입 박스 */}
            <div className="relative z-10 w-full m-10 max-w-md mx-4 p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_0_60px_rgba(99,102,241,0.15)]">

                <div className="flex flex-col items-center mb-6">
                    {/* 로고 */}
                    <div className="h-25 flex items-center justify-center overflow-hidden hover:bg-slate-800 p-4 rounded-3xl transition-colors mb-4">
                        <div className="scale-[0.35] origin-center">
                            <Logo />
                        </div>
                    </div>

                    {/* 구분선 */}
                    <div className="relative w-full h-px mt-2 mb-6">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-500/40 to-transparent" />
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-blue-400/30 to-transparent blur-[2px]" />
                    </div>

                    <h1 className="text-xl font-bold text-white tracking-tight">
                        계정 생성
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 사원 정보 */}
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400 font-medium">사원 정보</p>
                        <Input icon={User} placeholder="성함" name="name" onChange={handleChange} />
                        <Input icon={Building2} placeholder="부서 (예: 정수운영팀)" name="dept" onChange={handleChange} />
                    </div>

                    {/* 로그인 정보 */}
                    <div className="space-y-3">
                        <p className="text-xs text-slate-400 font-medium">로그인 정보</p>
                        <Input icon={Mail} placeholder="아이디" name="username" onChange={handleChange} />
                        {usernameRule && (<p className="text-xs text-red-500 ml-1">{usernameRule}</p>)}
                        <Input icon={Lock} type="password" placeholder="비밀번호" name="password" onChange={handleChange} />
                        {passwordRule && (<p className="text-xs text-red-500 ml-1">{passwordRule}</p>)}
                        <Input icon={Lock} type="password" placeholder="비밀번호 확인" name="confirmPassword" onChange={handleChange} />
                        {passwordMsg && <p className={`text-xs mt-1 ${formData.password === formData.confirmPassword ? 'text-blue-500' : 'text-red-500'}`}>{passwordMsg}</p>}
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            가입 승인 요청 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <p className="text-[11px] leading-relaxed text-center text-slate-500 mt-4">
                        계정 생성 시 관리자의 승인이 필요합니다.<br />
                        승인 완료 후 입력하신 아이디로 로그인이 가능합니다.
                    </p>
                </form>
                <div className="mt-8 space-y-4">
                    {/* 구분선 */}
                    <div className="h-px w-full bg-white/5" />

                    <div className="flex flex-col items-center justify-center py-2 gap-3">
                        <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                            <span>이미 계정이 있으신가요?</span>
                        </div>

                        <button
                            onClick={() => router.push("/")}
                            className="group relative flex items-center gap-2 px-6 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 text-blue-400 transition-all duration-300"
                        >
                            <User className="w-4 h-4 text-blue-500 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold tracking-tight">
                                로그인 화면으로 이동
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </section >
    );
}