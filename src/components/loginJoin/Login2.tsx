'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Lock, User, UserPlus, X } from "lucide-react";
import Logo from "@/components/loginJoin/Logo";
import Input from "../TailInput";
import TailButton from "../TailButton";
import { useLogin } from "@/hooks/useLogin";

export default function Login2({ setIsModalOpen } : {setIsModalOpen: Function}) {
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { handleLogin, isLoading } = useLogin();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleLogin(formData);
        if (success) setFormData({ username: "", password: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            {/* 배경 클릭 시 닫기 */}
            <div className="absolute inset-0" onClick={() => setIsModalOpen(false)} />

            <div className="relative bg-white/90 rounded-[2.5rem] shadow-2xl w-full p-10 max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
                
                {/* 닫기 */}
                <button 
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all z-20 group"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="relative z-10 w-full px-8 py-12 flex flex-col items-center gap-8">
                    {/* 로고 영역 */}
                    <div className="mb-2">
                        <Logo scale={0.8} />
                        <p className="text-center text-slate-400 text-sm mt-3 font-medium">관리자 시스템에 로그인하세요</p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="w-full space-y-4"
                    >
                        <div className="space-y-3">
                            <div className="relative group">
                                <Input icon={User} type="text" placeholder="아이디" name="username" value={formData.username} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <Input icon={Lock} type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="pt-2">
                            <TailButton 
                                disabled={isLoading} 
                                text={isLoading ? "로그인 중..." : "로그인"} 
                                icon={ArrowRight} 
                                style="bg-sky-500 hover:bg-sky-600 w-full py-4 shadow-lg shadow-sky-200 transition-all active:scale-[0.98]" 
                            />
                        </div>
                    </form>

                    {/* 하단 푸터 영역 */}
                    <div className="w-full pt-6 border-t border-slate-100 flex items-center justify-center gap-2">
                        <span className="text-slate-400 text-sm">계정이 없으신가요?</span>
                        <button
                            onClick={() => router.push("/join")}
                            className="text-sky-600 text-sm font-bold hover:underline underline-offset-4 flex items-center gap-1"
                        >
                            <UserPlus className="w-4 h-4" />
                            회원가입 요청
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}