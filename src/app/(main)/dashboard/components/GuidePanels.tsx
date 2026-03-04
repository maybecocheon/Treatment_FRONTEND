import { Activity, Plus, ChevronDown } from "lucide-react";

export default function GuidePanels() {
    return (
        <div className="flex-1 flex flex-col rounded-2xl p-4 gap-3 bg-card backdrop-blur-sm border border-card-border">
            <div className="flex flex-col sm:flex-row xl:flex-col items-center gap-2 w-full">
                {/* 1. 하루 정수 계획 */}
                <div className="w-full flex flex-col gap-2">
                    <h4 className="text-[13px] font-black text-foreground text-center uppercase">최적화를 위한 하루 정수 계획</h4>
                    <div className="p-3 rounded-xl bg-success-bg border border-success/20 flex gap-2 items-center">
                        <div className="w-0.5 h-8 bg-success rounded-full" />
                        <div className="flex flex-col gap-1">
                            <p className="text-[12px] font-bold text-success leading-none">
                                <span className="text-primary font-black">23:00~09:00</span> 집중 가동
                            </p>
                            <p className="text-[11px] font-medium text-success-text opacity-70">야간 경부하 요금 활용 에너지 최적화 가동</p>
                        </div>
                    </div>
                </div>

                {/* 플러스 기호 */}
                <div className="shrink-0 bg-card rounded-full p-1 border border-card-border text-muted sm:rotate-0 rotate-90">
                    <Plus size={12} strokeWidth={3} />
                </div>

                {/* 2. 특수 운영 계획 */}
                <div className="flex gap-2 w-full">
                    <div className="flex-1 p-1.5 rounded-lg bg-muted/10 border border-card-border flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-muted">새벽 최고 수위 시</p>
                        <p className="text-[11px] font-black text-foreground opacity-80">중지</p>
                    </div>
                    <div className="flex-1 p-1.5 rounded-lg bg-danger-bg border border-danger/20 flex flex-col items-center justify-center">
                        <p className="text-[10px] font-bold text-danger opacity-70">최저 수위 발생 시</p>
                        <p className="text-[11px] font-black text-danger">긴급</p>
                    </div>
                </div>
            </div>

            {/* 화살표 아이콘 */}
            <div className="flex justify-center -my-1">
                <ChevronDown size={16} className="text-primary animate-bounce" />
            </div>

            {/* 결과 섹션 */}
            <div className="flex-1 flex flex-col w-full rounded-2xl p-3 gap-2 bg-card border border-card-border shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 bg-primary rounded-lg text-white">
                        <Activity size={14} className="animate-pulse" />
                    </div>
                    <h4 className="text-[14px] font-black text-foreground opacity-90 uppercase">지능형 운영 스케줄링</h4>
                </div>

                <div className="flex-1 grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-1 gap-2">
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-info-bg">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                <p className="text-[13px] font-bold text-foreground leading-tight">유출량 예측 기반 충수</p>
                            </div>
                            <p className="text-[11px] text-muted leading-normal font-medium">만수위 도달 전 손실 최소화 가동 (오버플로우 방지)</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 p-4 rounded-lg bg-success-bg">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-success shrink-0" />
                                <p className="text-[13px] font-bold text-foreground leading-tight">에너지 부하 분산 제어</p>
                            </div>
                            <p className="text-[11px] text-muted leading-normal font-medium">평균 1~3대 펌프 운영으로 최적 효율 유지</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}