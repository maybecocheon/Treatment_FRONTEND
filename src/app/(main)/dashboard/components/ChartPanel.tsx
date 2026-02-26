'use client'

import { detailViewModeAtom } from "@/atoms/uniAtoms";
import PredictionChart from "@/components/main/PredictionChart";
import TailChartSkeleton from "@/components/main/skeletons/TailChartSkeleton";
import ErrorFallback from "@/components/skeletons/ErrorFallback";
import PageFallback from "@/components/skeletons/PageFallback";
import { useSetAtom } from "jotai";
import { ArrowUpRight } from "lucide-react";

interface ChartPanelProps {
    error: Error | null;
    isLoading: boolean;
    onClick: () => void;
    onOpen: () => void;
    data: any[];
    labels: string[];
    mode?: "prediction" | "optimization" | undefined;
}

export default function ChartPanel({ error, isLoading, onClick, onOpen, data, labels, mode = "optimization" }: ChartPanelProps) {
    const setDetailViewMode = useSetAtom(detailViewModeAtom);

    const handlePanelClick = () => {
        if (error || isLoading) return;

        const targetViewMode = mode === "optimization" ? "optimization" : "prediction";

        setDetailViewMode(targetViewMode);
        onOpen();
    };

    return (
        <div
            className={`relative flex-1 flex flex-col lg:flex-row gap-4 group ${!error ? "hover:cursor-pointer" : "cursor-default"}`}
            onClick={handlePanelClick}
        >
            {!error && !isLoading && (
                <div className="absolute top-2 lg:-top-5 left-1/2 -translate-x-1/2 z-20 
                    opacity-100 lg:opacity-0 lg:group-hover:opacity-100 
                    transition-all duration-300 lg:translate-y-2 lg:group-hover:translate-y-0">
                    <div className="flex items-center gap-2 px-3 py-1.5 bg-card/90 border border-card-border backdrop-blur-sm text-foreground rounded-full shadow-lg">
                        <ArrowUpRight className="w-3 h-3 text-primary" />
                        <span className="text-[10px] lg:text-[11px] font-medium whitespace-nowrap">
                            <span className="lg:hidden">터치하여 상세 보기</span>
                            <span className="hidden lg:inline">클릭하여 상세 데이터 확인</span>
                        </span>
                    </div>
                </div>
            )}

            <div className={`h-full flex flex-col mt-1 w-full transition-opacity ${!error ? "group-hover:opacity-80" : ""}`}
                style={{ minHeight: "145px" }}>
                {isLoading ? (
                    <PageFallback skeleton={<TailChartSkeleton />} />
                ) : error ? (
                    <ErrorFallback error={error} onClick={onClick} />
                ) : (
                    <PredictionChart
                        data={data}
                        labels={labels}
                        mode={mode}
                    />
                )}
            </div>
        </div>
    )
}
