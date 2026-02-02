import { currentUser } from "@/data/mockData";
import { User } from "@/data/types";
import { atom } from "jotai";

// 로그인 페이지에서 스크롤 위치 제어
export const scrollToContentAtom = atom(0);

// 대시보드 카테고리 선택 상태
export const selectedCategoryAtom = atom<string>("OVERVIEW");

// 맵 줌 레벨 상태
export const mapLevelAtom = atom<number>(9);

// 사용자 정보 상태
export const currentUserAtom = atom<User | null>(currentUser);