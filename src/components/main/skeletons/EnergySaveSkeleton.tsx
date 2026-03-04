export default function EnergySaveSkeleton() {
    return (
        <div className="animate-pulse">
            {/* 상단 */}
            <div className="bg-muted/10 rounded-xl p-3 shadow-sm mb-4">
                <div className="flex justify-between items-center mb-2">
                    <div className="h-3 w-28 bg-muted/20 rounded" />
                    <div className="h-4 w-20 bg-muted/20 rounded-full" />
                </div>
                <div className="h-7 w-36 bg-muted/20 rounded" />
            </div>

            {/* 프로그레스 바 */}
            <div className="flex flex-col gap-4 py-2">
                {/* 기존 비용 바 */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <div className="h-2.5 w-12 bg-muted/10 rounded text-[9px]" />
                        <div className="h-2.5 w-20 bg-muted/10 rounded" />
                    </div>
                    <div className="w-full h-2 bg-muted/5 rounded-full overflow-hidden">
                        <div className="h-full w-full bg-muted/10 opacity-50" />
                    </div>
                </div>

                {/* AI 최적 비용 바 */}
                <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-end px-1">
                        <div className="h-2.5 w-16 bg-muted/10 rounded text-[9px]" />
                        <div className="h-2.5 w-20 bg-muted/10 rounded" />
                    </div>
                    <div className="w-full h-2 bg-muted/5 rounded-full overflow-hidden">
                        <div className="h-full w-2/3 bg-muted/10 opacity-50" />
                    </div>
                </div>
            </div>
        </div>
    )
}
