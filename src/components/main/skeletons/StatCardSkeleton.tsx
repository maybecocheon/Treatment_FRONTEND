export default function StatCardSkeleton() {
    return (
        <div className="glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center transition-all duration-300 group mb-4 md:mb-0 overflow-hidden border border-card-border animate-pulse">
            {/* 아이콘 */}
            <div className="w-12 h-12 rounded-2xl bg-muted/20 mb-3 shadow-inner" />

            <div className="flex flex-col items-center w-full">
                {/* 라벨 */}
                <div className="h-3 w-16 bg-muted/20 rounded-md mb-3" />

                {/* 값 & 단위 */}
                <div className="flex items-baseline gap-2">
                    <div className="h-8 w-24 bg-muted/20 rounded-lg" />
                    <div className="h-4 w-6 bg-muted/20 rounded" />
                </div>
            </div>
        </div>
    )
}
