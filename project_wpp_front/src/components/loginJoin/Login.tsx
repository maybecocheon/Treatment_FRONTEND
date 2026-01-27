'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ChevronDown, Droplets, Lock, User, UserPlus } from "lucide-react";
import { useSetAtom } from "jotai";
import { scrollToContentAtom } from "@/atoms/scroll";
import Logo from "@/components/loginJoin/Logo";
import Background from "@/components/loginJoin/Background";

export default function Login() {
    // 스크롤 트리거
    const triggerScroll = useSetAtom(scrollToContentAtom);

    const router = useRouter();
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    const [credentials, setCredentials] = useState({ username: "", password: "" });

    // 스크롤 0
    useEffect(() => {
        // 1. 진입 시 초기화
        triggerScroll(0);

        // 2. 이탈 시(Clean-up) 초기화 
        return () => {
            triggerScroll(0);
        };
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
                headers: { "Content-Type": "application/json", },
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
    }

    return (
        <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
            {/* 배경 */}
            <Background />

            {/* 로고 */}
            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center justify-center gap-8">
                <Logo />

                {/* 로그인 박스 */}
                <div className="w-full animate-in fade-in zoom-in-95 duration-700 delay-200 overflow-hidden rounded-xl shadow-2xl">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-10 space-y-6"
                    >
                        <div className="space-y-4">
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="아이디"
                                    required
                                    value={credentials.username}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base"
                                />
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="비밀번호"
                                    required
                                    value={credentials.password}
                                    onChange={handleChange}
                                    className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="group relative w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                로그인 <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </form>

                    {/* 회원가입 페이지로 이동 */}
                    <div className="w-full bg-white/10 backdrop-blur-xl border-x border-b border-white/10 p-5 flex items-center justify-center gap-2">
                        <span className="text-slate-400 text-sm font-medium">계정이 없으신가요?</span>
                        <button
                            onClick={() => router.push("/join")}
                            className="text-blue-400 text-sm font-black hover:text-blue-300 hover:cursor-pointer transition-colors flex items-center gap-2 group"
                        >
                            <UserPlus className="w-4 h-4" />
                            회원가입 요청
                        </button>
                    </div>
                </div>
            </div>

            <button
                onClick={() => triggerScroll(v => v + 1)}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 text-slate-500 hover:text-white transition-colors animate-bounce flex flex-col items-center gap-2"
            >
                <span className="text-[10px] font-black uppercase tracking-widest">About Project</span>
                <ChevronDown className="w-6 h-6" />
            </button>
        </section>
    );
}