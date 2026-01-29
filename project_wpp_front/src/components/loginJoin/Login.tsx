'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Lock, User, UserPlus } from "lucide-react";
import { useSetAtom } from "jotai";
import { scrollToContentAtom } from "@/atoms/scroll";
import Logo from "@/components/loginJoin/Logo";
import Background from "./Background";
import Input from "./TailInput";

export default function Login() {
    const triggerScroll = useSetAtom(scrollToContentAtom);
    const router = useRouter();
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    useEffect(() => {
        triggerScroll(0);
        return () => triggerScroll(0);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginButton();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    };

    const loginButton = async () => {
        try {
            const response = await fetch(`${server_url}/oauth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(credentials),
            });
            if (response.ok) {
                const jwtToken = response.headers.get("Authorization");
                if (jwtToken) {
                    localStorage.setItem("jwtToken", jwtToken);
                    localStorage.setItem("username", credentials.username);
                }
                router.push("/map");
            } else {
                alert("로그인 실패. 다시 시도해 주세요.");
            }
        } catch (error) {
            console.error("로그인 오류: ", error);
            alert("로그인 실패. 다시 시도해 주세요.");
        }
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
                                <Input icon={User} type="text" placeholder="아이디" name="username" value={credentials.username} onChange={handleChange} />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                                <Input icon={Lock} type="password" placeholder="비밀번호" name="password" value={credentials.password} onChange={handleChange} />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98] overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                로그인 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
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
                onClick={() => triggerScroll(v => v + 1)}
                className="mt-12 text-slate-400 hover:text-sky-600 transition-colors animate-bounce flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">About Project</span>
                <ChevronDown className="w-6 h-6 text-sky-400" />
            </button>
        </section>
    );
}