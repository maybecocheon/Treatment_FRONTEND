import { FacilityType, ReservoirLevelType, UserProfile } from "@/types/types";
import { atom } from "jotai";

// 로그인 페이지에서 스크롤 위치 제어
export const scrollAtom = atom(0);

// 맵 줌 레벨 상태
export const mapLevelAtom = atom<number>(9);

// 맵 상세 정보 관리
export const mapDetailOpenAtom = atom(false);

// 사용자 정보 상태
export const userProfileAtom = atom<UserProfile | null>(null);

// header 및 전역에서 공유될 시간 상태
export const virtualTimeAtom = atom("");

// 모달창 관리
export const isModalOpenAtom = atom(false);
export const selectedFacilityIdAtom = atom<number>(0);

// api 관련
// 메인보드 차트 배수지 선택
export const selectedReservoirAtom = atom<ReservoirLevelType | null>(null);