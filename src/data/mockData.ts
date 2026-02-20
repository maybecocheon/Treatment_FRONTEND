
import { HistoryPoint, KPIData, RiskEvent, RiskFactor, PumpScheduleItem } from '@/data/types';
import { TeamMemberType } from '@/types/types';

export const FACILITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "1": { lat: 35.2850, lng: 129.0850 }, // 중앙 정수장 
  "2": { lat: 35.2150, lng: 128.9650 }, // AA 가압장 
  "3": { lat: 35.3250, lng: 129.1950 }, // AB 가압장
  "4": { lat: 35.1950, lng: 129.0250 }, // A 배수지 
  "5": { lat: 35.1550, lng: 128.9950 }, // B 배수지 
  "6": { lat: 35.2350, lng: 129.0350 }, // C 배수지 
  "7": { lat: 35.1050, lng: 128.8550 }, // D 배수지 
  "8": { lat: 35.0750, lng: 128.9850 }, // E 배수지 
  "9": { lat: 35.1650, lng: 128.9050 }, // F 배수지 
  "10": { lat: 35.1950, lng: 129.1150 }, // G 배수지
  "11": { lat: 35.2150, lng: 129.2050 }, // H 배수지
  "12": { lat: 35.1650, lng: 129.1750 }, // I 배수지 
  "13": { lat: 35.2650, lng: 129.1450 }, // J 배수지
  "14": { lat: 35.1250, lng: 129.1150 }, // K 배수지
  "15": { lat: 35.0750, lng: 129.0750 }, // L 배수지 
};

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

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    name: "이현지",
    role: "Front-end Developer",
    description: "Next.js 기반의 컴포넌트 설계 및 UI 라이브러리를 활용한 사용자 친화적 반응형 인터페이스 구현"
  },
  {
    name: "최윤영",
    role: "Data Scientist",
    description: "LSTM 기반 슬라이딩 윈도우 기법과 공공 기상 데이터를 연계하여 단기 수요 예측 모델 및 자동화 파이프라인 구축"
  },
  {
    name: "박진하",
    role: "Back-end Developer",
    description: "Spring Boot 중심의 아키텍처 설계와 JWT 기반 보안 인증 및 핵심 비즈니스 로직 개발"
  },
  {
    name: "석동찬",
    role: "Back-end Developer",
    description: "MySQL 데이터베이스 스키마 설계 및 쿼리 최적화와 효율적인 데이터 관리를 위한 보조 API 구현"
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