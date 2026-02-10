import Background from "@/components/loginJoin/Background";
import Logo from "@/components/loginJoin/Logo";
import { Suspense } from "react";
import JoinForm from "./JoinForm";
import PageFallback from "@/components/loading/PageFallback";
import JoinFormSkeleton from "./JoinFormSkeleton";

export default function JoinPage() {
    return (
            <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
                <section className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-slate-50 py-5">
                    {/* 배경 */}
                    <Background />
    
                    {/* 회원가입 박스 */}
                    <div className="relative z-10 w-full max-w-md mx-6 p-8 md:p-10 rounded-[2.5rem] bg-white/70 backdrop-blur-3xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.05)] animate-in fade-in zoom-in-95 duration-700">
    
                        <div className="flex flex-col items-center mb-8">
                            {/* 로고  */}
                            <div className="h-30 flex items-baseline justify-center overflow-hidden p-4 mb-4">
                                <Logo scale={0.45} />
                            </div>
                            <h1 className="text-2xl font-black text-slate-800 tracking-tight">
                                계정 생성
                            </h1>
                        </div>
                        {/* 회원가입 폼 */}
                        <Suspense fallback={<PageFallback skeleton={<JoinFormSkeleton />} />}>
                            <JoinForm />
                        </Suspense>
                    </div>
                </section>
            </div>
        )
}