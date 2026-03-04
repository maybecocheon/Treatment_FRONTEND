'use client'

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { useSetAtom } from "jotai";
import { selectedFacilityTypeAtom, selectedReservoirAtom, selectedReservoirIdAtom } from "@/atoms/uniAtoms";
import { ReservoirLevelType } from "@/types/types";

interface MapUIContextType {
    isModalOpen: boolean;
    mapDetailOpen: boolean;
    onOpen: (facilityType: string, res?: ReservoirLevelType) => void;
    onClose: () => void;
}

const MapUIContext = createContext<MapUIContextType | undefined>(undefined);

export function MapUIProvider({ children }: { children: ReactNode }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [mapDetailOpen, setMapDetailOpen] = useState(false);

    const setSelectedFacilityType = useSetAtom(selectedFacilityTypeAtom);
    const setSelectedReservoir = useSetAtom(selectedReservoirAtom);
    const setSelectedReservoirId = useSetAtom(selectedReservoirIdAtom);

    const onClose = useCallback(() => {
        setIsModalOpen(false);
        setMapDetailOpen(false);
        document.body.style.overflow = "auto";
    }, []);

    const onOpen = useCallback((facilityType: string, res?: ReservoirLevelType) => {
        setSelectedFacilityType(facilityType);
        if (res) {
            setSelectedReservoir(res);
            setSelectedReservoirId(res.facilityId);
        }

        const isMobile = window.innerWidth < 1028;
        if (isMobile) {
            setIsModalOpen(true);
            setMapDetailOpen(false);
        } else {
            setMapDetailOpen(true);
            setIsModalOpen(false);
        }
    }, [setSelectedFacilityType, setSelectedReservoir]);

    // 스크롤 방지 로직
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isModalOpen]);

    // resize 되면 초기화
    useEffect(() => {
        const handleResize = () => {
            setIsModalOpen(false);
            setMapDetailOpen(false);
            document.body.style.overflow = "auto";
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // 뒤로가기 리스너 (모바일 등에서 유용)
    useEffect(() => {
        const handlePopState = () => onClose();
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, [onClose]);

    return (
        <MapUIContext.Provider value={{ isModalOpen, mapDetailOpen, onOpen, onClose }}>
            {children}
        </MapUIContext.Provider>
    );
}

export function useMapUI() {
    const context = useContext(MapUIContext);
    return context;
}
