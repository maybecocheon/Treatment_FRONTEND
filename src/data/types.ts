export interface WaterSystemData {
  id: string;
  name: string;
  type: string;
  lat?: number;
  lng?: number;

  spec?: string;
  v?: string;
  currentLevel?: number;
  minLevel?: number;
  maxLevel?: number;
  accuracy?: number;

  predictedDemand?: number[];
  actualDemand?: number[];

  hourlyCostBaseline?: number[]; // 기존 비용
  hourlyCostOptimized?: number[]; // AI 최적화 비용
  expectedSavingsPercent?: number;

  dailyForecast?: number[];
  recalculation?: number[];
}

export interface PlantStats {
  outflow: number;
  pumpAverage: number;
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface User {
  id: string;
  password: string;
  name: string;
  profileImage?: string;
  role: string;
  department: string;
}

export interface HistoryPoint {
  time: string;
  level?: number;
  outflow?: number;
  supply?: number;
  pressure?: number;
  demand?: number;
}

export type StrategyType = 'A' | 'B' | 'C';