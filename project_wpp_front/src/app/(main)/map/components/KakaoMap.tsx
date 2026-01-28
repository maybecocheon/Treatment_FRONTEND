"use client"

import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polygon, Polyline } from "react-kakao-maps-sdk";
import sidoData from "@/data/sido.json"
import { WaterSystemDatas } from "@/data/mockData";
import WaterSystemOverlay from "./WaterSystemOverlay";

import { WaterSystemData } from "@/data/types";

interface KakaoMapProps {
    setSelectedReservoir: (reservoir: WaterSystemData) => void;
}

export default function KakaoMap({ setSelectedReservoir }: KakaoMapProps) {
    const [isClient, setIsClient] = useState(false);
    const [formattedPath, setFormattedPath] = useState<{ lat: number, lng: number }[]>([])

    // 특정 ID 리스트를 순서대로 좌표 객체 배열로 변환
    const getPathByIds = (ids: string[]) => {
        return ids
            .map(id => {
                const data = WaterSystemDatas.find(item => item.id === id);
                return data ? { lat: data.lat, lng: data.lng } : null;
            })
            .filter((pos): pos is { lat: number; lng: number } => pos !== null);
    };

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
    }, []);

    if (!isClient)
        return <div style={{ width: "100%", height: "360px", background: "#f0f0f0" }} />;

    return (
        <div style={{ width: "100%", height: "700px" }}>
            <Map
                center={center}
                level={8}
                style={{ width: "100%", height: "100%" }}
                zoomable={true} // 줌인, 줌아웃
                draggable={true} // 드래그
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

                {/* 연결선 - West System (AA 가압장 라인) */}
                <Polyline
                    path={getPathByIds(["plant_central", "res_A", "res_B", "res_D", "res_E", "res_F"])}
                    strokeWeight={4}
                    strokeColor="#3b82f6"
                    strokeOpacity={0.5}
                />

                {/* 연결선 - East System (AB 가압장 라인) */}
                <Polyline
                    path={getPathByIds(["plant_central", "res_J", "res_H", "res_G", "res_I", "res_K", "res_L"])}
                    strokeWeight={4}
                    strokeColor="#60a5fa"
                    strokeOpacity={0.5}
                    strokeStyle="solid"
                />

                {/* 정수장 */}
                {WaterSystemDatas.map((res) => (
                    <CustomOverlayMap key={res.id} position={{ lat: res.lat, lng: res.lng }}>
                        <WaterSystemOverlay waterSystem={res} onClick={res.type === "reservoir" ? () => setSelectedReservoir(res) : undefined} />
                    </CustomOverlayMap>
                ))}
            </Map>
        </div>
    );
}