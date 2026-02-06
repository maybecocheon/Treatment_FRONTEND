import { LucideIcon } from "lucide-react";

// params 타입
export interface ParamsType {
    params: { id: string };
}

// 차트 박스 타입
export interface ChartBoxType {
    title: string;
    icon: LucideIcon;
    color?: string;
    textSize?: string;
    children?: React.ReactNode;
    headerControl?: React.ReactNode;
}

// 진짜 차트 타입
export interface TailChartType {
    time: string[];
    data: number[];
    data2?: number[];
    data3?: number[];
    data4?: number[];
    color?: string;
    color2?: string;
    color3?: string;
    color4?: string;
    label1?: string;
    label2?: string;
    label3?: string;
    label4?: string;
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