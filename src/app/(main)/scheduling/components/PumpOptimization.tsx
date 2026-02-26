'use client'

import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";
import PredictionChart from "@/components/main/PredictionChart";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import PageFallback from "@/components/skeletons/PageFallback";
import { Zap } from "lucide-react";
import useOptimization from "@/hooks/useOptimization";

export default function PumpOptimization() {
  const { optimizationData, isLoading, error, loadOptimization } = useOptimization();

  return (
    <div className="bg-card border border-card-border rounded-2xl p-6 transition-all h-full flex flex-col">
      {/* 1. 헤더 영역 */}
      <div className="flex justify-between items-start mb-5">
        <div className="flex gap-3 items-center">
          <div className="p-2 bg-success-bg rounded-lg text-success shadow-inner">
            <Zap size={22} />
          </div>
          <div>
            <h3 className="text-base font-black text-foreground leading-none uppercase tracking-tight">
              펌프 가동 최적화 현황
            </h3>
            <p className="text-[11px] text-muted mt-1.5 font-bold tracking-tight">
              AI 기반 시간별 펌프 대수 제어
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black bg-success-bg text-success px-2 py-0.5 rounded-md shadow-xs uppercase">
            평균 가동 대수
          </span>
          <div className="flex items-baseline gap-0.5 mt-1 text-success">
            <span className="text-2xl font-black">1~3</span>
            <span className="text-sm font-bold">대</span>
          </div>
        </div>
      </div>

      {/* 2. 시간별 펌프 가동 대수 바 차트 */}
      <div className="w-full h-full bg-muted/10 rounded-xl p-3 border border-card-border">
        {isLoading ? (
          <PageFallback skeleton={<TailChartSkeleton />} />
        ) : error ? (
          <ErrorFallback error={error} onClick={() => loadOptimization()} />
        ) : (
          <PredictionChart
            data={optimizationData}
            labels={["", "펌프 대수"]}
            first={false}
          />
        )}
      </div>
    </div>
  );
}