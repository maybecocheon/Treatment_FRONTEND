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

export const TEAM_MEMBERS: TeamMemberType[] = [
  {
    name: "이현지",
    role: "Leader / Front-end",
    description: "Next.js 기반의 사용자 친화적 반응형 인터페이스 구현. 대내외 커뮤니케이션을 통한 프로젝트 리딩."
  },
  {
    name: "최윤영",
    role: "Data Scientist",
    description: "Attention Mechanism 기반의 LSTM 수요 예측 모델 설계 및 실험. 데이터 전처리 및 분석 결과를 활용한 시각화 구현."
  },
  {
    name: "박진하",
    role: "AI Engineer / Back-end",
    description: "LSTM·Transformer 기반 수요 예측 모델 설계 및 FastAPI 연동. 데이터 전처리 파이프라인 구축 및 펌프 최적화 API 구현."
  },
  {
    name: "석동찬",
    role: "Back-end Developer",
    description: "정수장 펌프 운영 최적화 알고리즘 설계 및 백엔드 시스템 구축. 효율적인 데이터 관리와 비즈니스 로직의 안정적 구현."
  }
];