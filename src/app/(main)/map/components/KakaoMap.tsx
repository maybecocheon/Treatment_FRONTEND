'use client'

import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polygon } from "react-kakao-maps-sdk";
import sidoData from "@/data/sido.json"
import FacilityOverlay from "./FacilityOverlay";
import MapSkeleton from "./skeletons/MapSkeleton";
import { useRouter } from "next/navigation";
import { useAtom } from "jotai";
import { mapLevelAtom } from "@/atoms/uniAtoms";
import { useFacilitiesData } from "@/hooks/useFacilitiesData";


export default function KakaoMap() {
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [formattedPath, setFormattedPath] = useState<{ lat: number, lng: number }[]>([]);
    const [mapLevel, setMapLevel] = useAtom(mapLevelAtom);

    const { loadFacilities, facilities } = useFacilitiesData();

    // 부산 시청 좌표를 중심으로 설정
    const center = { lat: 35.1996, lng: 129.0756 };

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
                console.error("좌표 파싱 중 에러 발생: ", err);
                setFormattedPath([]);
            }
        }
        // 브라우저 준비 시까지 렌더링 미룸
        setIsClient(true);
        loadFacilities();
    }, []);

    if (!isClient)
        return <MapSkeleton />;

    return (
        <div style={{ width: "100%", height: "100%" }}>
            <Map
                center={center}
                level={mapLevel}
                style={{ width: "100%", height: "100%" }}
                zoomable={true} // 줌인, 줌아웃
                draggable={true} // 드래그
                minLevel={9}
                onZoomChanged={map => setMapLevel(map.getLevel())}
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
                        <FacilityOverlay facility={facility} onClick={facility.type === "배수지" ? () => router.push(`/map/${facility.facilityId}`): () => router.push("/scheduling")} />
                    </CustomOverlayMap>
                ))}
            </Map>
        </div>
    );
}