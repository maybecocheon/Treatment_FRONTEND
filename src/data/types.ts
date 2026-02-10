

export interface HistoryPoint {
  time: string;
  level?: number;
  outflow?: number;
  supply?: number;
  pressure?: number;
  demand?: number;
}

export interface KPIData {
  flowRate: number;
  flowChange: number;
  avgLevel: number;
  minLevelReservoir: string;
  minLevelValue: number;
  maxLevelValue: number;
  pressureStatus: 'Normal' | 'Partial Low' | 'Danger';
  riskScore: number;
}

export interface RiskEvent {
  id: string;
  reservoir: string;
  type: string;
  score: number;
  status: 'Critical' | 'Warning' | 'Info';
  detail: string;
  subDetail: string;
}

export interface RiskFactor {
  name: string;
  value: number;
  color: string;
}

export interface PumpScheduleItem {
  time: string;
  demand: number;
  level: number;
  rateType: 'Night' | 'Off-Peak' | 'Mid-Peak' | 'Peak';
  action: string;
  pumpOutput: number;
}
