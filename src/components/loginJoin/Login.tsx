'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Lock, User, UserPlus } from "lucide-react";
import { useSetAtom } from "jotai";
import { scrollAtom } from "@/atoms/uniAtoms";
import Logo from "@/components/loginJoin/Logo";
import Background from "./Background";
import Input from "../TailInput";
import TailButton from "../TailButton";
import { useLogin } from "@/hooks/useLogin";

export default function Login() {
    const setScroll = useSetAtom(scrollAtom);
    const router = useRouter();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const { handleLogin, isLoading } = useLogin();

    useEffect(() => {
        setScroll(0);
        return () => setScroll(0);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await handleLogin(formData);
        if (success) setFormData({ username: "", password: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-50 py-12 md:py-20">
            {/* 배경 */}
            <Background />

            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center gap-8">
                {/* 로고 */}
                <Logo />

                <div className="w-full animate-in fade-in zoom-in-95 duration-1000 slide-in-from-bottom-4 shadow-[0_20px_50px_rgba(0,0,0,0.05)] rounded-3xl overflow-hidden">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-white/70 backdrop-blur-3xl border border-white/40 p-10 space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                                <Input icon={User} type="text" placeholder="아이디" name="username" value={formData.username} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                                <Input icon={Lock} type="password" placeholder="비밀번호" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                        </div>
                        
                        <TailButton disabled={ isLoading } text="로그인" icon={ArrowRight} style="bg-sky-500 hover:bg-sky-600" />
                    </form>

                    <div className="w-full bg-slate-50/50 backdrop-blur-md border-t border-slate-100 p-5 flex items-center justify-center gap-2">
                        <span className="text-slate-500 text-sm font-medium">계정이 없으신가요?</span>
                        <button
                            onClick={() => router.push("/join")}
                            className="text-sky-600 text-sm font-bold hover:text-sky-700 transition-colors flex items-center gap-1 group"
                        >
                            <UserPlus className="w-4 h-4" />
                            회원가입 요청
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => setScroll(v => v + 1)}
                className="mt-12 text-slate-400 hover:text-sky-600 transition-colors animate-bounce flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">About Project</span>
                <ChevronDown className="w-6 h-6 text-sky-400" />
            </button>
        </section>
    );
}