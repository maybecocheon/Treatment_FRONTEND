'use client'

import { Droplets, X } from "lucide-react";
import { isModalOpenAtom, mapDetailOpenAtom, selectedFacilityTypeAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useAtomValue } from "jotai";
import ReservoirDetails from "./ReservoirDetails";
import TreatmentDetails from "./TreatmentDetails";
import useModalSet from "@/hooks/useModalSet";

export default function OpenDetail() {
    const isModalOpen = useAtomValue(isModalOpenAtom);
    const mapOpenDetail = useAtomValue(mapDetailOpenAtom);
    const selectedFacilityType = useAtomValue(selectedFacilityTypeAtom);
    const selectedReservoir = useAtomValue(selectedReservoirAtom);
    const { onClose } = useModalSet();

    // 수위 위험 상태 체크
    const isLevelCritical = selectedReservoir?.riskStatus === "low" || selectedReservoir?.riskStatus === "high";

    return (
        <div className={`${isModalOpen ? "fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            : mapOpenDetail ? "relative w-full h-full" : "hidden"
            }`}>
            <div className={`flex flex-col transition-all duration-500 ease-out h-full rounded-4xl bg-white
                ${isModalOpen ? "w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95"
                    : mapOpenDetail ? "w-full h-full animate-in slide-in-from-right " : "hidden"}`}>
                {/* 헤더 */}
                <div className={`px-6 py-4 md:py-6 flex justify-between items-center transition-colors duration-500 rounded-t-4xl
                ${selectedFacilityType === "정수장" ? "bg-sky-200/80" : isLevelCritical ? "bg-red-200/50" : "bg-sky-200/80"}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${selectedFacilityType === "정수장" ? "bg-blue-500/20" : isLevelCritical ? "bg-red-400" : "bg-blue-500/20"}`}>
                            <Droplets className={`${selectedFacilityType === "정수장" ? "text-blue-400" : isLevelCritical ? "text-red-100" : "text-blue-400"} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {selectedFacilityType === "정수장" ? "정수장" : selectedReservoir && selectedReservoir.reservoirName} 상세 정보
                            </h3>
                            {selectedFacilityType === "배수지" && isLevelCritical && (
                                <p className="text-red-400 text-xs md:text-sm font-medium">
                                    즉각적인 펌프 가동 검토가 필요합니다
                                </p>
                            )}
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-900 hover:text-white transition-all hover:bg-white/10 p-2.5 rounded-xl">
                        <X size={24} />
                    </button>
                </div>

                {/* 메인 */}
                {selectedFacilityType === "정수장" ? <TreatmentDetails /> : <ReservoirDetails />}
            </div>
        </div>
    )
}