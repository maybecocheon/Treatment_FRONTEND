import { LucideIcon } from "lucide-react";

// 차트 박스 타입
export interface ChartBoxType {
    title: string;
    time: string[];
    data: number[];
    data2?: number[];
    color: string;
    color2?: string;
    label1?: string;
    label2?: string;
    icon: LucideIcon;
    loadData?: (id: FacilityType["facilityId"]) => void;
}

// 시설 타입
export interface FacilityType {
    facilityId: number | string;
    name: string;
    type: string;
    lat?: number;
    lng?: number;
}

// 로그인한 유저 프로필 타입
export interface UserProfile {
  username: string;
  alias: string;
  department: string;
}