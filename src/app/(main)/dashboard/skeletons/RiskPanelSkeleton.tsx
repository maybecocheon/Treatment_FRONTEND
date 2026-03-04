export default function RiskPanelSkeleton() {
    return (
        <div className="p-5 glass rounded-2xl animate-pulse flex flex-col gap-4 h-full border border-danger/20">
            {/* 헤더 영역 (아이콘 + 타이틀) */}
            <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 bg-danger/20 rounded-md" />
                <div className="h-5 w-32 bg-danger/10 rounded-md" />
            </div>

            <div className="flex-1 flex flex-col gap-4">
                {/* 상단: Risk Detail 패널 모사 */}
                <div className="p-6 bg-muted/5 rounded-2xl border border-subtle-border">
                    <div className="h-4 w-20 bg-muted/20 rounded mb-6" />
                    <div className="flex justify-center mb-6">
                        {/* 원형 차트 영역 */}
                        <div className="w-24 h-24 rounded-full border-8 border-card-border" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-card-border rounded" />
                        <div className="h-4 w-2/3 bg-card-border rounded" />
                    </div>
                </div>

                {/* 하단: Risk Event 리스트 모사 */}
                <div className="flex-1 border-t border-subtle-border pt-6">
                    <div className="h-4 w-24 bg-muted/20 rounded mb-6" />
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-muted/5 rounded-xl">
                                {/* 리스트 아이템 아이콘 */}
                                <div className="w-10 h-10 rounded-lg bg-card-border" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-1/2 bg-card-border rounded" />
                                    <div className="h-3 w-1/3 bg-card-border rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}