'use client'

import { isModalOpenAtom, mapDetailOpenAtom, selectedFacilityTypeAtom, selectedReservoirAtom } from '@/atoms/uniAtoms';
import { ReservoirLevelType } from '@/types/types';
import { useAtom, useSetAtom } from 'jotai';
import { useEffect } from 'react'

export default function useModalSet() {
    const [isModalOpen, setIsModalOpen] = useAtom(isModalOpenAtom);
    const setMapDetailOpen = useSetAtom(mapDetailOpenAtom);
    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const setSelectedReservoir = useSetAtom(selectedReservoirAtom);

    // 모달이 마운트(열림)될 때 스크롤 방지
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => setMapDetailOpen(false);
    }, [isModalOpen]);

    // 맵에서 모달 열릴 때
    const onOpen = (facilityType: string, res?: ReservoirLevelType) => {
        setSelectedFacilityType(facilityType);
        if (res) setSelectedReservoir(res);

        const isMobile = window.innerWidth < 1028;

        if (isMobile) {
            setIsModalOpen(true);
            setMapDetailOpen(false);
        } else {
            setMapDetailOpen(true);
            setIsModalOpen(false);
        }
    };

    // 모달 닫을 때
    const onClose = () => {
        setIsModalOpen(false);
        setSelectedFacilityType("");
        setMapDetailOpen(false);
        document.body.style.overflow = "auto";
    }

    // 브라우저 "뒤로가기" 클릭 시 모달 닫기
    useEffect(() => {
        const handlePopState = () => onClose();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    return { onClose, onOpen };
}
