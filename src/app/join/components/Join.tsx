'use client'

import { useEffect, useState } from 'react';
import { Lock, User, Mail, Building2, ArrowRight } from 'lucide-react';
import Background from '@/components/loginJoin/Background';
import Logo from '@/components/loginJoin/Logo';
import Input from '@/components/loginJoin/TailInput';
import { validationRules } from './joinRules';
import { useRouter } from 'next/navigation';

export default function Join() {
    const router = useRouter();

    const [passwordMsg, setPasswordMsg] = useState<string>("");
    const [passwordRule, setPasswordRule] = useState<string>("");
    const [usernameRule, setUsernameRule] = useState<string>("");

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        name: "",
        dept: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push("/");
    };

    useEffect(() => {
        if (formData.confirmPassword === "") {
            setPasswordMsg("");
        } else if (formData.password === formData.confirmPassword) {
            setPasswordMsg("✅ 비밀번호가 일치합니다.");
        } else {
            setPasswordMsg("❌ 비밀번호가 일치하지 않습니다.");
        }
    }, [formData.password, formData.confirmPassword]);

    useEffect(() => {
        const result = validationRules.username(formData.username);
        setUsernameRule(result === true ? "" : result);
    }, [formData.username])

    useEffect(() => {
        const result = validationRules.password(formData.password);
        setPasswordRule(result === true ? "" : result);
    }, [formData.password])

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-slate-50 py-12 md:py-20">
            {/* 배경 */}
            <Background />

            {/* 회원가입 박스 */}
            <div className="relative z-10 w-full max-w-md mx-6 p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-700">

                <div className="flex flex-col items-center mb-8">
                    {/* 로고  */}
                    <div className="h-30 flex items-baseline justify-center overflow-hidden p-4 mb-4">
                        <Logo scale={0.45} />
                    </div>

                    {/* 구분선 */}
                    {/* <div className="relative w-full h-px mt-4 mb-6">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-sky-300 to-transparent opacity-50" />
                    </div> */}

                    <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                        계정 생성
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 사원 정보 */}
                    <div className="space-y-3">
                        <p className="text-[11px] text-sky-600 font-bold uppercase tracking-wider ml-1">사원 정보</p>
                        <Input icon={User} placeholder="성함" name="name" onChange={handleChange} />
                        <Input icon={Building2} placeholder="부서 (예: 정수운영팀)" name="dept" onChange={handleChange} />
                    </div>

                    {/* 로그인 정보 */}
                    <div className="space-y-3">
                        <p className="text-[11px] text-sky-600 font-bold uppercase tracking-wider ml-1">로그인 정보</p>
                        <Input icon={Mail} placeholder="아이디" name="username" onChange={handleChange} />
                        {usernameRule && (<p className="text-xs text-red-500 ml-2 font-medium">{usernameRule}</p>)}
                        
                        <Input icon={Lock} type="password" placeholder="비밀번호" name="password" onChange={handleChange} />
                        {passwordRule && (<p className="text-xs text-red-500 ml-2 font-medium">{passwordRule}</p>)}
                        
                        <Input icon={Lock} type="password" placeholder="비밀번호 확인" name="confirmPassword" onChange={handleChange} />
                        {passwordMsg && (
                            <p className={`text-xs ml-2 font-medium mt-1 ${formData.password === formData.confirmPassword ? 'text-sky-600' : 'text-red-500'}`}>
                                {passwordMsg}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="group relative w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98] overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2">
                            가입 승인 요청 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    <div className="bg-sky-50/50 rounded-xl p-4 border border-sky-100/50">
                        <p className="text-[11px] leading-relaxed text-center text-slate-500 font-medium">
                            계정 생성 시 관리자의 승인이 필요합니다.<br />
                            승인 완료 후 입력하신 아이디로 로그인이 가능합니다.
                        </p>
                    </div>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col items-center gap-4">
                    <span className="text-slate-400 text-sm font-medium">이미 계정이 있으신가요?</span>
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-600 font-bold text-sm transition-all duration-300 border border-transparent hover:border-sky-100"
                    >
                        <User className="w-4 h-4" />
                        로그인 화면으로 이동
                    </button>
                </div>
            </div>
        </section>
    );
}