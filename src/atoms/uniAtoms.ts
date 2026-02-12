import { FacilityType, ReservoirLevelType, UserProfile } from "@/types/types";
import { atom } from "jotai";

// 로그인 페이지에서 스크롤 위치 제어
export const scrollToContentAtom = atom(0);

// 맵 줌 레벨 상태
export const mapLevelAtom = atom<number>(9);

// 사용자 정보 상태
export const userProfileAtom = atom<UserProfile | null>(null);

// header 및 전역에서 공유될 시간 상태
export const virtualTimeAtom = atom("");

// api 관련

// 차트 배수지 선택
export const selectedReservoirAtom = atom<ReservoirLevelType | null>(null);

// 시설 선택
// export const selectedFacilityAtom = atom<FacilityType | null>(null);