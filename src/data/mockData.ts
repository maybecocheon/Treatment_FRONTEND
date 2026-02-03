
import { WaterSystemData, PlantStats, User, HistoryPoint, TeamMember, KPIData, RiskEvent, PredictionPoint, RiskFactor, PumpScheduleItem } from '@/data/types';


export const currentUser: User = {
  id: 'admin_flowwise',
  name: '관리자_홍길동',
  password: 'abcd1234!',
  profileImage: 'https://picsum.photos/seed/user1/200/200',
  role: 'Administrator',
  department: '정수운영팀',
};

export const plantData: PlantStats = {
  outflow: 12450,
  pumpAverage: 85.5,
};

const DEMAND_SAMPLE = {
  predictedDemand: [45, 48, 52, 58, 62, 55, 48, 42, 40, 45, 50, 55],
  actualDemand: [44, 49, 50, 57, 65, 53, 47, 43, 41, 44, 51, 56],
};

const SAVINGS_SAMPLE = {
  hourlyCostBaseline: [120, 130, 140, 150, 160, 155, 145, 135, 125, 130, 140, 150],
  hourlyCostOptimized: [100, 110, 115, 120, 125, 123, 118, 112, 108, 110, 115, 120],
  expectedSavingsPercent: 18.5,
};

const ALGORITHM_PROCESS_SAMPLE = {
  // 단계별 예측 필드
  dailyForecast: [460, 430, 410, 390, 420, 470, 560, 630, 660, 640, 610, 590, 570, 560, 580, 610, 650, 690, 710, 660, 590, 530, 490, 470], // 전일실적 비교 (당일 예측)
  recalculation: [465, 425, 405, 385, 425, 475, 565, 635, 665, 645, 615, 595, 575, 565, 585, 615, 655, 695, 715, 665, 595, 535, 495, 475], // 15분 주기 실시간 재산출
};

export const waterSystemDatas: WaterSystemData[] = [
  { id: 'overview', name: '전체', type: 'overview' },
  
  // 1. 중심부 (정수장)
  { id: '1', name: '중앙 정수장', lat: 35.2800, lng: 129.0800, type: 'plant' },

  // 2. 서측 계통 (AA가압장 라인)
  { id: '2', name: 'AA 가압장', lat: 35.2200, lng: 129.0400, type: 'booster', spec: 'Q=14,400m³/day' },
  { id: '4', name: 'A 배수지', lat: 35.1900, lng: 129.0100, type: 'reservoir', v: '2,500m³', currentLevel: 2.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '5', name: 'B 배수지', lat: 35.1700, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 3.2, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '6', name: 'C 배수지', lat: 35.1800, lng: 129.0200, type: 'reservoir', v: '1,500m³', currentLevel: 2.8, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '7', name: 'D 배수지', lat: 35.1500, lng: 129.0300, type: 'reservoir', v: '1,000m³', currentLevel: 2.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '8', name: 'E 배수지', lat: 35.1300, lng: 129.0100, type: 'reservoir', v: '2,000m³', currentLevel: 4.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '9', name: 'F 배수지', lat: 35.1000, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 2.8, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE , ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },

  // 3. 동측 및 기타 계통 (AB가압장 라인)
  { id: '10', name: 'G 배수지', lat: 35.1700, lng: 129.0900, type: 'reservoir', v: '300m³', currentLevel: 1.8, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '11', name: 'H 배수지', lat: 35.1900, lng: 129.1500, type: 'reservoir', v: '100m³', currentLevel: 0.5, maxLevel: 2.0, minLevel: 0.7, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '12', name: 'I 배수지', lat: 35.1500, lng: 129.1200, type: 'reservoir', v: '300m³', currentLevel: 1.5, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '13', name: 'J 배수지', lat: 35.2200, lng: 129.1300, type: 'reservoir', v: '2,000m³', currentLevel: 3.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  

  { id: '3', name: 'AB 가압장', lat: 35.1300, lng: 129.1000, type: 'booster', spec: 'Q=1,000m³/day' },
  { id: '14', name: 'K 배수지', lat: 35.1300, lng: 129.1400, type: 'reservoir', v: '3,456m³', currentLevel: 4.2, maxLevel: 6.0, minLevel: 2.0, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
  { id: '15', name: 'L 배수지', lat: 35.0900, lng: 129.1100, type: 'reservoir', v: '1,200m³', currentLevel: 2.9, maxLevel: 4.0, minLevel: 1.0, accuracy: 97.5, ...DEMAND_SAMPLE, ...SAVINGS_SAMPLE, ...ALGORITHM_PROCESS_SAMPLE },
]

// Mock History Data
const generateHistory = (count: number): HistoryPoint[] => {
  return Array.from({ length: count }).map((_, i) => ({
    time: `${i}:00`,
    level: 60 + Math.random() * 30,
    outflow: 400 + Math.random() * 200,
    supply: 11000 + Math.random() * 3000,
    pressure: 5.5 + Math.random() * 1.5,
    demand: 450 + Math.random() * 100,
  }));
};

export const MOCK_HISTORY_DATA: Record<string, HistoryPoint[]> = {
  'OVERVIEW': generateHistory(24),
  '1': generateHistory(24),
  '2': generateHistory(24),
  '3': generateHistory(24),
  '4': generateHistory(24),
  '5': generateHistory(24),
  '6': generateHistory(24),
  '7': generateHistory(24),
  '8': generateHistory(24),
  '9': generateHistory(24),
  '10': generateHistory(24),
  '11': generateHistory(24),
  '12': generateHistory(24),
  '13': generateHistory(24),
  '14': generateHistory(24),
  '15': generateHistory(24),
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: "이현지",
    role: "Front-end Developer",
    description: "LSTM 및 Transformer 모델을 활용한 시계열 수요 예측 알고리즘 설계 및 고도화 담당"
  },
  {
    name: "최윤영",
    role: "Data Scientist",
    description: "실시간 수압 및 유량 제어 시스템 아키텍처 설계와 하드웨어 인터페이스 연동 최적화"
  },
  {
    name: "박진하",
    role: "Back-end Developer",
    description: "강화학습 기반 정수장 펌프 스케줄링 최적화 및 에너지 절감 시나리오 분석"
  },
  {
    name: "석동찬",
    role: "Back-end Developer",
    description: "강화학습 기반 정수장 펌프 스케줄링 최적화 및 에너지 절감 시나리오 분석"
  }
];

export const generateMockKPIData = (): KPIData => ({
  flowRate: 14500,
  flowChange: 5.2,
  avgLevel: 68,
  minLevelReservoir: '배수지 B',
  minLevelValue: 18,
  maxLevelValue: 82,
  pressureStatus: 'Partial Low',
  riskScore: 78
});

export const generateRiskEvents = (): RiskEvent[] => [
  { 
    id: '1', 
    reservoir: '배수지 B', 
    type: '저수위 위험', 
    score: 78, 
    status: 'Critical', 
    detail: '현재 수위 18% (하한 20%)', 
    subDetail: '관압 미달 확률 42% 상향' 
  },
  { 
    id: '2', 
    reservoir: '배수지 D', 
    type: '수요 급증', 
    score: 63, 
    status: 'Warning', 
    detail: '최근 1h 수요 +27% 급증', 
    subDetail: '예상 저수위 도달 시점: 6h 후' 
  },
  { 
    id: '3', 
    reservoir: '배수지 A', 
    type: '수위 상승', 
    score: 41, 
    status: 'Info', 
    detail: '현재 75% 상승 중', 
    subDetail: '월류 가능성 낮음 (상한 90%)' 
  },
  { 
    id: '4', 
    reservoir: '펌프장 #1', 
    type: '비효율 운전', 
    score: 35, 
    status: 'Info', 
    detail: '펌프 과부하 구간 진입', 
    subDetail: '출력 95% 초과 지속' 
  },
  { 
    id: '5', 
    reservoir: '정수장', 
    type: '부하 집중', 
    score: 22, 
    status: 'Info', 
    detail: '전체 송수량 한계 도달 중', 
    subDetail: '예비 펌프 가동 준비 권장' 
  }
];

export const generatePredictionData = (): PredictionPoint[] => {
  const data: PredictionPoint[] = [];
  const hours = ['08', '10', '12', '14', '16', '18', '20', '22', '00', '02', '04', '06'];
  
  hours.forEach((h, i) => {
    data.push({
      time: `${h}:00`,
      demand: 8000 + Math.random() * 5000,
      level: 60 - (i * 3) + Math.random() * 10,
      isPrediction: i > 6
    });
  });
  return data;
};

export const generateRiskFactors = (): RiskFactor[] => [
  { name: '수위 위험도', value: 35, color: '#ef4444' },
  { name: '관압 위험도', value: 25, color: '#f59e0b' },
  { name: '수요 변동성', value: 20, color: '#3b82f6' },
  { name: '펌프 여유', value: 15, color: '#10b981' },
  { name: '기타 요인', value: 5, color: '#64748b' }
];

export const generatePumpSchedule = (): PumpScheduleItem[] => {
  const data: PumpScheduleItem[] = [];
  const hours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);
  
  hours.forEach((h, i) => {
    const hourNum = parseInt(h.split(':')[0]);
    let rateType: any = 'Off-Peak';
    if (hourNum >= 23 || hourNum < 9) rateType = 'Night';
    else if ((hourNum >= 13 && hourNum < 17)) rateType = 'Peak';
    else if (hourNum >= 10 && hourNum < 12) rateType = 'Mid-Peak';

    data.push({
      time: h,
      demand: 10000 + Math.sin(i / 3) * 5000,
      level: 50 + Math.cos(i / 3) * 20,
      rateType,
      action: rateType === 'Night' ? '충수 가동' : rateType === 'Peak' ? '중지/최소' : '보조 가동',
      pumpOutput: rateType === 'Night' ? 80 : rateType === 'Peak' ? 20 : 45
    });
  });
  return data;
};

export const COLORS = {
  night: '#06b6d4', // cyan-500 (cool, watery)
  offPeak: '#10b981', // emerald-500
  midPeak: '#f59e0b', // amber-500
  peak: '#f43f5e', // rose-500 (urgent but modern)
  demand: '#fb7185', // rose-400 (soft glow)
  level: '#38bdf8', // sky-400 (bright water)
  safe: '#2dd4bf', // teal-400
  warning: '#fb923c', // orange-400
  danger: '#ff4b4b' // bright red
};

export const RESERVOIRS = ['배수지 A', '배수지 B', '배수지 C', '배수지 D', '배수지 E'];