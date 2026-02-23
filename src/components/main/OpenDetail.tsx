'use client'

import { Droplets, X } from "lucide-react";
import { useEffect } from "react";
import { isModalOpenAtom, mapDetailOpenAtom, selectedFacilityIdAtom, selectedReservoirAtom } from "@/atoms/uniAtoms";
import { useAtom, useAtomValue } from "jotai";
import ReservoirDetails from "./ReservoirDetails";
import TreatmentDetails from "./TreatmentDetails";

export default function OpenDetail() {
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const [mapOpenDetail, setMapOpenDetail] = useAtom(mapDetailOpenAtom);
    const [selectedFacilityId, setSelectedFacilityId] = useAtom(selectedFacilityIdAtom);
    const selectedReservoir = useAtomValue(selectedReservoirAtom);

    // 모달이 마운트(열림)될 때 스크롤 방지 & fetch 차트데이터
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { { document.body.style.overflow = "auto" }; setIsModalOpen(false); setMapOpenDetail(false); }
    }, [isModalOpen, selectedFacilityId]);

    const onClose = () => {
        setIsModalOpen(false);
        setSelectedFacilityId(0);
        setMapOpenDetail(false);
    }

    // 브라우저 "뒤로가기" 클릭 시 모달 닫기
    useEffect(() => {
        const handlePopState = () => onClose();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    // 고수위 & 저수위
    const maxLevelAlert = selectedReservoir ? selectedReservoir.maxLevel * 0.8 : 0;
    const minLevelAlert = selectedReservoir ? selectedReservoir.maxLevel * 0.3 : 0;
    // 수위 위험 상태 체크
    const isLevelCritical = selectedFacilityId === 1 ? false : !!(selectedReservoir && (selectedReservoir.level < minLevelAlert || selectedReservoir.level > maxLevelAlert));

    return (
        <div className={`${isModalOpen ? "fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
            : mapOpenDetail ? "relative w-full h-full" : "hidden"
            }`}>
            <div className={`flex flex-col transition-all duration-500 ease-out h-full rounded-4xl bg-white
                ${isModalOpen ? "w-full max-w-5xl shadow-2xl overflow-hidden max-h-[90vh] animate-in zoom-in-95"
                    : mapOpenDetail ? "w-full h-full animate-in slide-in-from-right " : "hidden"}`}>
                {/* 헤더 */}
                <div className={`px-6 py-4 md:py-6 flex justify-between items-center transition-colors duration-500 rounded-t-4xl
                ${isLevelCritical ? "bg-red-200/50" : "bg-sky-200/50"}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isLevelCritical ? "bg-red-400" : "bg-blue-500/20"}`}>
                            <Droplets className={`${isLevelCritical ? "text-red-100" : "text-blue-400"} w-6 h-6 md:w-8 md:h-8`} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">
                                {selectedFacilityId === 1 ? "정수장" : selectedReservoir && selectedReservoir.reservoirName} 상세 정보
                            </h3>
                            {isLevelCritical && (
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
                {selectedFacilityId === 1 ? <TreatmentDetails /> : <ReservoirDetails />}
            </div>
        </div>
    )
}