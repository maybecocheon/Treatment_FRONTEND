'use client'

import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polygon, Polyline } from "react-kakao-maps-sdk";
import sidoData from "@/data/sido.json"
import { Droplets } from "lucide-react";
import { WaterSystemDatas } from "@/data/mockData";

import { WaterSystemData } from "@/types";

interface KakaoMapProps {
    setSelectedReservoir: (reservoir: WaterSystemData) => void;
}

export default function KakaoMap({ setSelectedReservoir }: KakaoMapProps) {
    const [isClient, setIsClient] = useState(false);
    const [formattedPath, setFormattedPath] = useState<{ lat: number, lng: number }[]>([])

    // 부산 시청 좌표를 중심으로 설정
    const center = { lat: 35.1996, lng: 129.0756 };

    useEffect(() => {
        // 카카오맵 형식으로 변경
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
                zoomable={false} // 줌인, 줌아웃
                draggable={true} // 드래그
            >
                {/* 폴리곤 */}
                {
                    formattedPath.length > 0 && (
                        <Polygon
                            path={formattedPath}
                            strokeWeight={5}
                            strokeColor={'#39DE2A'}
                            strokeOpacity={0.8}
                            strokeStyle={'solid'}
                            fillColor={'#A2FF99'}
                            fillOpacity={0.5}
                        />
                    )
                }

                {/* 연결선 - West System */}
                <Polyline path={[
                    { lat: 35.2800, lng: 129.0800 }, // Central Plant
                    { lat: 35.1900, lng: 129.0100 }, // Res A
                    { lat: 35.1700, lng: 129.0000 }, // Res B
                    { lat: 35.1500, lng: 129.0300 }, // Res D
                    { lat: 35.1300, lng: 129.0100 }, // Res E
                    { lat: 35.1000, lng: 128.9900 }, // Res F
                    { lat: 35.0800, lng: 128.9700 }, // Res C
                ]}
                    strokeWeight={3}
                    strokeColor={"#64748b"}
                    strokeOpacity={0.8}
                    strokeStyle={"dash"}
                />

                {/* 연결선 - East System */}
                <Polyline path={[
                    { lat: 35.2800, lng: 129.0800 }, // Central Plant
                    { lat: 35.2200, lng: 129.1300 }, // Res J
                    { lat: 35.1900, lng: 129.1500 }, // Res H
                    { lat: 35.1700, lng: 129.0900 }, // Res G
                    { lat: 35.1500, lng: 129.1200 }, // Res I
                    { lat: 35.1300, lng: 129.1400 }, // Res K
                    { lat: 35.0900, lng: 129.1100 }, // Res L
                ]}
                    strokeWeight={3}
                    strokeColor={"#64748b"}
                    strokeOpacity={0.8}
                    strokeStyle={"dash"}
                />

                {/* Central Plant (정수장) */}
                <CustomOverlayMap position={WaterSystemDatas[0]}>
                    <div className="relative flex flex-col items-center pointer-events-none">
                        <svg width="120" height="120" viewBox="0 0 120 120" className="drop-shadow-xl">
                            <circle cx="60" cy="60" r="45" fill="white" stroke="#3b82f6" strokeWidth="4" />
                            <text x="60" y="40" textAnchor="middle" className="text-xs font-bold fill-slate-500">중앙 정수장</text>
                            <Droplets className="text-blue-500" x="44" y="44" size={32} />
                        </svg>
                    </div>
                </CustomOverlayMap>

                {/* Reservoirs (배수지) */}
                {WaterSystemDatas.map((res) => (
                    res.type === "reservoir" && (
                        <CustomOverlayMap key={res.id} position={{ lat: res.lat, lng: res.lng }}>
                            <div onClick={() => setSelectedReservoir(res)} className="cursor-pointer hover:scale-110 transition-transform duration-300">
                                <svg width="200" height="200" viewBox="-100 -100 200 200">
                                    {/* 경고창 */}
                                    {(res.currentLevel && res.minLevel && (res.currentLevel < res.minLevel)) && (
                                        <g transform="translate(0, -65)" className="animate-pulse">
                                            <circle r="14" fill="#ef4444" stroke="white" strokeWidth="2" />
                                            <text textAnchor="middle" dy="5" fill="white" className="text-sm font-bold">!</text>
                                        </g>
                                    )}

                                    {/* Main Box */}
                                    <rect x="-65" y="-45" width="130" height="90" rx="20" fill="white"
                                        stroke={
                                            (res.currentLevel && res.minLevel && res.currentLevel < res.minLevel) ? "#ef4444" : "#e2e8f0"
                                        }
                                        strokeWidth="3" className="drop-shadow-md" />

                                    {/* 수위량 BG */}
                                    {res.currentLevel && res.maxLevel && (
                                        <rect x="-65" y={45 - (res.currentLevel / res.maxLevel * 90)} width="130" height={res.currentLevel / res.maxLevel * 90} rx="20" fill={(res.currentLevel && res.minLevel && res.currentLevel < res.minLevel) ? "#fee2e2" : "#e0f2fe"} opacity="0.6" pointerEvents="none" />
                                    )}

                                    <text y="-18" textAnchor="middle" className="text-xs font-bold fill-slate-400 uppercase tracking-widest">{res.name}</text>

                                    {/* Level Value or Spec */}
                                    {res.currentLevel !== undefined && (
                                        <text y="22" textAnchor="middle" className={`text-base font-black ${(res.minLevel && res.currentLevel < res.minLevel) ? 'fill-red-600' : 'fill-slate-900'}`}>
                                            {res.currentLevel.toFixed(1)}m
                                        </text>
                                    )}

                                    {/* 기준 수위선 */}
                                    {res.minLevel && res.maxLevel && (
                                        <line x1="-55" y1={45 - (res.minLevel / res.maxLevel * 90)} x2="55" y2={45 - (res.minLevel / res.maxLevel * 90)} stroke="#fca5a5" strokeWidth="2" strokeDasharray="3 2" />
                                    )}
                                </svg>
                            </div>
                        </CustomOverlayMap>
                    )))}
            </Map>
        </div>
    );
}
