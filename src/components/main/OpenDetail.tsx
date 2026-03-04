'use client'

import { Droplets, X } from "lucide-react";
import { selectedFacilityTypeAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useAtomValue } from "jotai";
import TreatmentDetails from "./TreatmentDetails";
import { useMapUI } from "@/app/(main)/map/components/MapUIContext";
import ReservoirDetails from "./ReservoirDetails";

interface OpenDetailProps {
    isModalOpen?: boolean;
    onClose?: () => void;
}

export default function OpenDetail({ isModalOpen: propIsModalOpen, onClose: propOnClose }: OpenDetailProps) {
    const mapUI = useMapUI();

    // Props가 있으면 props 사용, 없으면 context 사용
    const isModalOpen = propIsModalOpen !== undefined ? propIsModalOpen : mapUI?.isModalOpen;
    const onClose = propOnClose !== undefined ? propOnClose : mapUI?.onClose;
    const mapOpenDetail = mapUI?.mapDetailOpen;

    const selectedFacilityType = useAtomValue(selectedFacilityTypeAtom);
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    const renderContent = () => {
        // 정수장 선택 시
        if (selectedFacilityType === "정수장") {
            return <TreatmentDetails />;
        }
        return <ReservoirDetails isModalOpen={isModalOpen} />
    }

    // 수위 위험 상태 체크
    const isLevelCritical = selectedReservoir?.riskStatus === "low" || selectedReservoir?.riskStatus === "high";

    return (
        <div className={`${isModalOpen ? "fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            : mapOpenDetail ? "relative w-full h-full" : "hidden"
            }`}>
            <div className={`flex flex-col transition-all duration-500 ease-out h-full rounded-4xl bg-card border border-card-border
                ${isModalOpen ? "w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95"
                    : mapOpenDetail ? "w-full h-full animate-in slide-in-from-right " : "hidden"}`}>
                {/* 헤더 */}
                <div className={`px-6 py-4 md:py-6 flex justify-between items-center transition-colors duration-500 rounded-t-4xl
                ${selectedFacilityType === "정수장" ? "bg-info-bg" : isLevelCritical ? "bg-danger-bg" : "bg-info-bg"}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${selectedFacilityType === "정수장" ? "bg-primary/20" : isLevelCritical ? "bg-danger" : "bg-primary/20"}`}>
                            <Droplets className={`${selectedFacilityType === "정수장" ? "text-primary" : isLevelCritical ? "text-white" : "text-primary"} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-foreground tracking-tight">
                                {selectedFacilityType === "정수장" ? "정수장" : selectedReservoir && selectedReservoir.reservoirName} 상세 정보
                            </h3>
                            {selectedFacilityType === "배수지" && isLevelCritical && (
                                <p className="text-danger text-xs md:text-sm font-medium">
                                    즉각적인 펌프 가동 검토가 필요합니다
                                </p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-foreground hover:bg-white/60 p-2.5 rounded-xl transition-all">
                        <X size={24} />
                    </button>
                </div>

                {/* 메인 */}
                {renderContent()}
            </div>
        </div>
    )
}