'use client'

export default function MapSkeleton() {
    return (
        <div className="w-full h-full min-h-125 relative glass rounded-2xl overflow-hidden animate-pulse">
            {/* 지도 배경 패턴 */}
            <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)", backgroundSize: "40px 40px" }}
            />

            {/* 중심부 폴리곤 스켈레톤 */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-2/3 h-2/3 bg-slate-200 rounded-[30% 70% 70% 30% / 30% 30% 70% 70%] rotate-12 blur-2xl opacity-50" />
            </div>

            {/* 시설물 오버레이(마커) 스켈레톤들 */}
            <div className="absolute top-1/4 left-1/3">
                <div className="w-10 h-10 bg-white/80 rounded-full shadow-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4">
                <div className="w-10 h-10 bg-white/80 rounded-full shadow-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                </div>
            </div>
            <div className="absolute top-1/2 right-1/3">
                <div className="w-10 h-10 bg-white/80 rounded-full shadow-sm flex items-center justify-center">
                    <div className="w-6 h-6 bg-slate-200 rounded-lg" />
                </div>
            </div>
        </div>
    );
}