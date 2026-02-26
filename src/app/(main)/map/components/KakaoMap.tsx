'use client'

import { useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, Polygon } from "react-kakao-maps-sdk";
import sidoData from "@/data/sido.json"
import FacilityOverlay from "./FacilityOverlay";
import MapSkeleton from "./skeletons/MapSkeleton";
import { MapUIProvider, useMapUI } from './MapUIContext';
import { useAtom, useAtomValue } from "jotai";
import { mapLevelAtom, selectedFacilityTypeAtom } from "@/atoms/uniAtoms";
import { useFacilities } from "@/hooks/useFacilities";
import OpenDetail from "@/components/main/OpenDetail";
import PageFallback from "@/components/skeletons/PageFallback";
import ErrorFallback from "@/components/skeletons/ErrorFallback";


export default function KakaoMap() {
    const mapUI = useMapUI();
    const mapDetailOpen = mapUI?.mapDetailOpen;
    const selectedFacilityType = useAtomValue(selectedFacilityTypeAtom);
    const [mapLevel, setMapLevel] = useAtom(mapLevelAtom);

    const [isClient, setIsClient] = useState(false);
    const [formattedPath, setFormattedPath] = useState<{ lat: number, lng: number }[]>([]);

    // 부산 시청 좌표를 중심으로 설정
    const center = { lat: 35.1996, lng: 129.0756 };
    const mapRef = useRef<kakao.maps.Map>(null);

    const { loadFacilities, facilities, isLoading, error } = useFacilities();

    useEffect(() => {
        // 카카오맵 형식(lat, lng)으로 변경
        if (sidoData && sidoData.features) {
            try {
                // 부산 데이터 찾기
                const busanFeature = sidoData.features.find((f: any) => f.properties.SIG_KOR_NM.includes("부산"));

                // 좌표 추출
                const geoCoords = busanFeature?.geometry?.coordinates;

                let path: { lat: number; lng: number; }[] = [];
                path = (geoCoords?.flat(1) || []).map((coord: any) => ({
                    lat: coord[1],
                    lng: coord[0]
                }))

                setFormattedPath(path);
            } catch (err) {
                setFormattedPath([]);
            }
        }
        // 브라우저 준비 시까지 렌더링 미룸
        setIsClient(true);

        return () => setMapLevel(9);
    }, []);

    // 상세 정보 오픈 시 지도 크기 조절
    useEffect(() => {
        const handleResize = () => {
            const map = mapRef.current;
            if (map) {
                map.relayout();
                map.setCenter(new kakao.maps.LatLng(center.lat, center.lng));
            }
        };
        if (mapDetailOpen || !mapDetailOpen) handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [mapDetailOpen]);

    if (!isClient || isLoading) return <PageFallback skeleton={<MapSkeleton />} />;
    if (error) return <ErrorFallback error={error} onClick={() => loadFacilities()} />;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Map
                center={center}
                level={mapLevel}
                style={{ width: "100%", height: "100%" }}
                zoomable={true} // 줌인, 줌아웃
                draggable={true} // 드래그
                minLevel={8}
                maxLevel={7}
                onZoomChanged={map => setMapLevel(map.getLevel())}
                ref={mapRef}
            >
                {/* 폴리곤 */}
                {
                    formattedPath.length > 0 && (
                        <Polygon
                            path={formattedPath}
                            strokeWeight={4}
                            strokeColor={"#3b82f6"}
                            strokeOpacity={0.4}
                            fillColor={"#0f172a"}
                            fillOpacity={0.15}
                        />
                    )
                }

                {/* 정수장과 배수지 */}
                {facilities &&
                    facilities.map(facility => ((facility.type === "정수장" || facility.type === "배수지") &&
                        <CustomOverlayMap key={facility.facilityId} position={{ lat: facility.lat || 0, lng: facility.lng || 0 }}>
                            <FacilityOverlay facility={facility} />
                        </CustomOverlayMap>
                    ))}
            </Map>
            {selectedFacilityType && <OpenDetail />}
        </div>
    );
}