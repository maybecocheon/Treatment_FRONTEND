import Background from "@/components/loginJoin/Background";
import Logo from "@/components/loginJoin/Logo";
import { Suspense } from "react";
import JoinForm from "./JoinForm";
import PageFallback from "@/components/skeletons/PageFallback";
import JoinFormSkeleton from "./JoinFormSkeleton";

export default function JoinPage() {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-auto bg-slate-50 py-5">
            {/* 배경 */}
            <Background />

            {/* 회원가입 박스 */}
            <div className="flex flex-col items-center relative z-10 w-full max-w-md mx-6 p-6 rounded-4xl glass animate-in fade-in zoom-in-95 duration-700">
                {/* 로고  */}
                <Logo scale={0.6} />
                {/* 회원가입 폼 */}
                <Suspense fallback={<PageFallback skeleton={<JoinFormSkeleton />} />}>
                    <JoinForm />
                </Suspense>
            </div>
        </section>
    )
}