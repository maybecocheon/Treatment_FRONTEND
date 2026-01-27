'use client'

export default function IntroduceSkeleton() {
    return (
        <section className="py-20 md:py-32 bg-slate-50 px-6 md:px-8">
            <div className="max-w-6xl mx-auto animate-pulse">

                {/* 상단 소개 영역 */}
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20 md:mb-32">
                    {/* 왼쪽 텍스트 */}
                    <div>
                        <div className="h-10 md:h-14 bg-slate-200 rounded-lg w-3/4 mb-6" />
                        <div className="h-6 bg-slate-200 rounded-lg w-full mb-3" />
                        <div className="h-6 bg-slate-200 rounded-lg w-5/6 mb-8" />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-200 rounded-lg" />
                                    <div className="h-4 bg-slate-200 rounded w-32" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 오른쪽 카드/그래프 */}
                    <div className="relative">
                        <div className="aspect-square bg-slate-200 rounded-[3rem]" />
                    </div>
                </div>

                {/* 팀원 소개 타이틀 */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="h-8 bg-slate-200 rounded-lg w-64 mx-auto mb-4" />
                    <div className="h-4 bg-slate-200 rounded w-80 mx-auto" />
                </div>

                {/* 팀원 카드 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm border border-slate-100 text-center"
                        >
                            <div className="w-24 h-24 bg-slate-200 rounded-4xl mx-auto mb-6" />
                            <div className="h-5 bg-slate-200 rounded w-24 mx-auto mb-2" />
                            <div className="h-4 bg-slate-200 rounded w-32 mx-auto mb-4" />
                            <div className="h-3 bg-slate-200 rounded w-full mb-2" />
                            <div className="h-3 bg-slate-200 rounded w-5/6 mx-auto" />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
