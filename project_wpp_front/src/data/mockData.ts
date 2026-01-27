
import { WaterSystemData, PlantStats, User, HistoryPoint, TeamMember } from '@/types';

export const currentUser: User = {
  id: 'admin_flowwise',
  nickname: '관리자_홍길동',
  profileImage: 'https://picsum.photos/seed/user1/200/200',
  role: 'Administrator',
};

export const plantData: PlantStats = {
  outflow: 12450,
  pumpRate: 85.5,
  currentStorage: 78,
  storageHistory: [
    { time: '00:00', value: 72 },
    { time: '04:00', value: 75 },
    { time: '08:00', value: 82 },
    { time: '12:00', value: 80 },
    { time: '16:00', value: 78 },
    { time: '20:00', value: 76 },
    { time: '24:00', value: 78 },
  ]
};

const DEMAND_SAMPLE = {
  predictedDemand: [45, 48, 52, 58, 62, 55, 48, 42, 40, 45, 50, 55],
  actualDemand: [44, 49, 50, 57, 65, 53, 47, 43, 41, 44, 51, 56],
};

export const WaterSystemDatas: WaterSystemData[] = [
  // 1. 중심부 (정수장)
  { id: 'plant_central', name: '중앙 정수장', lat: 35.2800, lng: 129.0800, type: 'plant' },

  // 2. 서측 계통 (AA가압장 라인)
  { id: 'pump_AA', name: 'AA 가압장', lat: 35.2200, lng: 129.0400, type: 'booster', spec: 'Q=14,400m³/day' },
  { id: 'res_A', name: 'A 배수지', lat: 35.1900, lng: 129.0100, type: 'reservoir', v: '2,500m³', currentLevel: 2.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_B', name: 'B 배수지', lat: 35.1700, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 3.2, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_D', name: 'D 배수지', lat: 35.1500, lng: 129.0300, type: 'reservoir', v: '1,000m³', currentLevel: 2.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_E', name: 'E 배수지', lat: 35.1300, lng: 129.0100, type: 'reservoir', v: '2,000m³', currentLevel: 4.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_F', name: 'F 배수지', lat: 35.1000, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 2.8, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_C', name: 'C 배수지', lat: 35.0800, lng: 129.0000, type: 'reservoir', v: '1,500m³', currentLevel: 1.2, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },

  // 3. 동측 및 기타 계통 (AB가압장 라인)
  { id: 'res_J', name: 'J 배수지', lat: 35.2200, lng: 129.1300, type: 'reservoir', v: '2,000m³', currentLevel: 3.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_H', name: 'H 배수지', lat: 35.1900, lng: 129.1500, type: 'reservoir', v: '100m³', currentLevel: 0.5, maxLevel: 2.0, minLevel: 0.7, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_G', name: 'G 배수지', lat: 35.1700, lng: 129.0900, type: 'reservoir', v: '300m³', currentLevel: 1.8, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_I', name: 'I 배수지', lat: 35.1500, lng: 129.1200, type: 'reservoir', v: '300m³', currentLevel: 1.5, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5, ...DEMAND_SAMPLE },

  { id: 'pump_AB', name: 'AB 가압장', lat: 35.1300, lng: 129.1000, type: 'booster', spec: 'Q=1,000m³/day' },
  { id: 'res_K', name: 'K 배수지', lat: 35.1300, lng: 129.1400, type: 'reservoir', v: '3,456m³', currentLevel: 4.2, maxLevel: 6.0, minLevel: 2.0, accuracy: 97.5, ...DEMAND_SAMPLE },
  { id: 'res_L', name: 'L 배수지', lat: 35.0900, lng: 129.1100, type: 'reservoir', v: '1,200m³', currentLevel: 2.9, maxLevel: 4.0, minLevel: 1.0, accuracy: 97.5, ...DEMAND_SAMPLE },
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
  'PLANT': generateHistory(24),
  'res-a': generateHistory(24),
  'res-b': generateHistory(24),
  'res-c': generateHistory(24),
  'res-d': generateHistory(24),
  'res-e': generateHistory(24),
  'res-f': generateHistory(24),
  'res-g': generateHistory(24),
  'res-h': generateHistory(24),
  'res-i': generateHistory(24),
  'res-j': generateHistory(24),
  'res-k': generateHistory(24),
  'res-l': generateHistory(24),
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