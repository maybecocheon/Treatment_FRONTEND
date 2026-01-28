'use client'

export default function LoginSkeleton() {
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-y-auto py-12 md:py-20 bg-slate-950">
            {/* 배경 */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="relative z-10 w-full max-w-md px-6 flex flex-col items-center animate-pulse">
                {/* 로고 자리 */}
                <div className="mb-10 text-center space-y-4">
                    <div className="mx-auto w-20 h-20 rounded-3xl bg-slate-700/50" />
                    <div className="h-10 w-48 bg-slate-700/50 rounded mx-auto" />
                    <div className="h-4 w-56 bg-slate-700/30 rounded mx-auto" />
                </div>

                {/* 로그인 박스 */}
                <div className="w-full bg-white/5 backdrop-blur-2xl border border-white/10 p-6 md:p-10 rounded-4xl md:rounded-[2.5rem] shadow-2xl space-y-6">
                    <div className="h-14 bg-slate-700/40 rounded-2xl" />
                    <div className="h-14 bg-slate-700/40 rounded-2xl" />
                    <div className="h-14 bg-blue-600/40 rounded-2xl" />
                </div>
            </div>

            {/* 화살표 */}
            <div className="mt-10 space-y-2 animate-pulse">
                <div className="h-3 w-24 bg-slate-600/40 rounded mx-auto" />
                <div className="h-6 w-6 bg-slate-600/40 rounded-full mx-auto" />
            </div>
        </section>
    );
}
