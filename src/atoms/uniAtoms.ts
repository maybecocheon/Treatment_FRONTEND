import { ReservoirLevelType, UserProfile } from "@/types/types";
import { atom } from "jotai";

// 로그인 페이지에서 스크롤 위치 제어
export const scrollAtom = atom(0);

// 맵 줌 레벨 상태
export const mapLevelAtom = atom<number>(9);


// 사용자 정보 상태
export const userProfileAtom = atom<UserProfile | null>(null);

// header 및 전역에서 공유될 시간 상태
export const virtualTimeAtom = atom("2024-01-02 00:00:00");

export const selectedFacilityTypeAtom = atom<string>("");
export const detailViewModeAtom = atom<"prediction" | "optimization">("prediction");

// 타임 슬라이드에서 선택한 시간 (null이면 현재 가상시간 사용)
export const timeSlideAtom = atom<string | null>(null);

// api 관련
// 배수지 선택
export const selectedReservoirAtom = atom<ReservoirLevelType | null>(null);

// 배수지 아이디 선택 - 카테고리
export const selectedReservoirIdAtom = atom<number>(0);