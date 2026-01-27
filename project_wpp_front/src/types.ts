export interface WaterSystemData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: string;

  spec?: string;
  v?: string;
  currentLevel?: number;
  minLevel?: number;
  maxLevel?: number;
  accuracy?: number;
  predictedDemand?: number[];
  actualDemand?: number[];
  warning?: string;
}

export interface PlantStats {
  outflow: number;
  pumpRate: number;
  currentStorage: number;
  storageHistory: { time: string; value: number }[];
}

export interface TeamMember {
  name: string;
  role: string;
  description: string;
}

export interface User {
  id: string;
  nickname: string;
  profileImage: string;
  role: string;
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