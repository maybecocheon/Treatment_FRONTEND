'use client'

import { useEffect, useState } from "react";
import { CustomOverlayMap, Map, Polygon, Polyline } from "react-kakao-maps-sdk";
import sidoData from "@/data/sido.json"
import { AlertTriangle, Droplets, Factory } from "lucide-react";
import { WaterSystemDatas } from "@/data/mockData";

import { WaterSystemData } from "@/data/types";

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
                zoomable={true} // 줌인, 줌아웃
                draggable={true} // 드래그
            >
                {/* 폴리곤 */}
                {
                    formattedPath.length > 0 && (
                        <Polygon
                            path={formattedPath}
                            strokeWeight={4}
                            strokeColor={'#3b82f6'}
                            strokeOpacity={0.4}
                            fillColor={'#0f172a'}
                            fillOpacity={0.15}
                        />
                    )
                }

                {/* 연결선 - West System (AA 가압장 라인) */}
                <Polyline
                    path={[
                        { lat: 35.2800, lng: 129.0800 }, // 중앙 정수장
                        { lat: 35.2200, lng: 129.0400 }, // AA 가압장 (거점)
                        { lat: 35.1900, lng: 129.0100 }, // A 배수지
                        { lat: 35.1700, lng: 129.0000 }, // B 배수지
                        { lat: 35.1500, lng: 129.0300 }, // D 배수지
                        { lat: 35.1300, lng: 129.0100 }, // E 배수지
                        { lat: 35.1000, lng: 129.0000 }, // F 배수지
                    ]}
                    strokeWeight={4}
                    strokeColor="#3b82f6"
                    strokeOpacity={0.5}
                    strokeStyle="solid"
                />

                {/* 연결선 - East System (AB 가압장 라인) */}
                <Polyline
                    path={[
                        { lat: 35.2800, lng: 129.0800 }, // 중앙 정수장
                        { lat: 35.2200, lng: 129.1300 }, // J 배수지 (상단 거점)
                        { lat: 35.1900, lng: 129.1500 }, // H 배수지
                        { lat: 35.1700, lng: 129.0900 }, // G 배수지
                        { lat: 35.1500, lng: 129.1200 }, // I 배수지
                        { lat: 35.1300, lng: 129.1000 }, // AB 가압장 (거점)
                        { lat: 35.1300, lng: 129.1400 }, // K 배수지
                        { lat: 35.0900, lng: 129.1100 }, // L 배수지
                    ]}
                    strokeWeight={4}
                    strokeColor="#60a5fa"
                    strokeOpacity={0.5}
                    strokeStyle="solid"
                />

                {/* 정수장 */}
                <CustomOverlayMap position={WaterSystemDatas[0]}>
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 animate-pulse" />
                            <div className="relative bg-white/50 border-2 border-blue-400 p-4 rounded-4xl shadow-2xl">
                                <Factory className="w-8 h-8" />
                            </div>
                        </div>
                        <div className="mt-2 bg-slate-700/70 text-white text-[10px] px-3 py-1 rounded-full font-semibold border border-blue-400/30">
                            광역 정수장
                        </div>
                    </div>
                </CustomOverlayMap>

                {/* 배수지 */}
                {WaterSystemDatas.map((res) => (
                    res.type === "reservoir" && (
                        <CustomOverlayMap key={res.id} position={{ lat: res.lat, lng: res.lng }}>
                            <div
                                onClick={() => setSelectedReservoir(res)}
                                className="group cursor-pointer"
                            >
                                <div className={`
                                    relative w-36 overflow-hidden rounded-2xl border-2 transition-all duration-300 group-hover:-translate-y-2
                                    ${res.currentLevel! < res.minLevel!
                                        ? 'bg-red-950/80 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]'
                                        : 'bg-white/50 border-slate-700 shadow-xl backdrop-blur-md'}
                                `}>
                                    {/* 상단 프로그레스 바 (배경 채우기) */}
                                    <div
                                        className={`absolute bottom-0 left-0 w-full transition-all duration-1000 opacity-20
                                            ${res.currentLevel! < res.minLevel! ? 'bg-red-500' : 'bg-blue-400'}`}
                                        style={{ height: `${(res.currentLevel! / res.maxLevel!) * 100}%` }}
                                    />

                                    <div className="relative p-3">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-[10px] font-black uppercase tracking-tighter line-clamp-1 ${res.currentLevel! < res.minLevel! ? 'text-red-400' : 'text-slate-700'}`}>
                                                {res.name}
                                            </span>
                                            {res.currentLevel! < res.minLevel! && (
                                                <AlertTriangle size={12} className="text-red-500 animate-bounce" />
                                            )}
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className={`text-xl font-black ${res.currentLevel! < res.minLevel! ? 'text-red-400' : 'text-slate-700'}`}>
                                                {res.currentLevel?.toFixed(1)}
                                            </span>
                                            <span className="text-[10px] text-slate-500 font-bold uppercase">meter</span>
                                        </div>

                                        {/* 미니 게이지 바 */}
                                        <div className="mt-2 w-full h-1 bg-white/10 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${res.currentLevel! < res.minLevel! ? 'bg-red-500' : 'bg-blue-500'}`}
                                                style={{ width: `${(res.currentLevel! / res.maxLevel!) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CustomOverlayMap>
                    )
                ))}
            </Map>
        </div>
    );
}
