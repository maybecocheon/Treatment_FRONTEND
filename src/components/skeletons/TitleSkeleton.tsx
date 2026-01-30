'use client'

export default function TitleSkeleton() {
    return (
        <div className="animate-pulse">
            {/* 제목 영역 */}
            <div className="h-8 md:h-10 w-64 bg-slate-200 rounded-2xl mb-3" />
            
            {/* 부제목 영역 */}
            <div className="h-4 md:h-6 w-48 bg-slate-100 rounded-lg" />
        </div>
    )
}