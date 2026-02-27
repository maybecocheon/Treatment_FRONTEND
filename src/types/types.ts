import { LucideIcon } from "lucide-react";

// 랜딩 페이지 팀원 소개
export interface TeamMemberType {
    name: string;
    role: string;
    description: string;
}

// 로그인한 유저 프로필 타입
export interface UserProfile {
    username: string;
    alias: string;
    department: string;
}

// 정수장 스탯 카드 타입
export interface StatCardType {
    icon: React.ReactNode;
    label: string;
    value: number | string;
    unit?: string;
    colorClass: string;
    loading?: boolean;
    error?: Error | null;
    onClick?: () => void;
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

// 차트 타입
export interface TailChartType {
    time: string[];
    data1?: number[];
    data2?: number[];
    data3?: number[];
    data4?: number[];
    labels: [string?, string?, string?, string?];
    colors?: [string?, string?, string?, string?];
    units?: [string?, string?, string?, string?];
    fills?: [boolean?, boolean?, boolean?, boolean?];
}

// 시설 타입
export interface FacilityType {
    facilityId: number;
    name: string;
    type: string;
    lat?: number;
    lng?: number;
}

export interface TreatmentType {
    pressOutAvg: number;
    flowOutAmt: number;
    reservoirCnt: number
}

// 배수지 수위 타입
export interface ReservoirLevelType {
    reservoirName: string;
    facilityId: number;
    level: number;
    minLevel: number;
    maxLevel: number;
    flowIn: number;
    area: number;
    riskStatus: "normal" | "low" | "high";
}

// 유입, 유출 예측 데이터
export interface PredictionAllType {
    facilityId: number;
    flowInAmt: number;
    flowOutAmt: number;
}

// 대시보드 물 흐르는 효과
export interface Point {
    x: number;
    y: number;
}

// 정수장 히스토리 타입
export interface TreatmentHistoryType {
    facilityId: number;
    avgPress: number;
    maxFlowOut: number;
    powerConsumption: number;
    detectionCnt: number;
}

// 배수지 히스토리 타입
export interface ReservoirHistoryType {
    facilityId: number;
    avgLevel: number;
    maxFlowOut: number;
    powerConsumption: number;
    detectionCnt: number;
}

// 정수장 히스토리 차트 타입
export interface TreatmentHistoryChartType {
    time: string;
    pressPipe: number;
    flowOut: number;
}

// 배수지 히스토리 차트 타입
export interface ReservoirHistoryChartType {
    time: string;
    level: number;
    flowOut: number;
}

// 시뮬레이션 타입
export interface SimulationType {
    facilityId: number;
    facilityName?: string;
    maxLevel: number;
    minLevel: number;
    chartData: SimulationChartType[];
}

export interface SimulationChartType {
    time: string;
    flowOut: number;
    flowIn: number;
    predictLevel: number;
}