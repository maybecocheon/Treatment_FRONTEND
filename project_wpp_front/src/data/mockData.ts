
import { WaterSystemData, PlantStats, User } from '@/types';

export const currentUser: User = {
  id: 'admin_flowwise',
  nickname: '관리자_홍길동',
  profileImage: 'https://picsum.photos/seed/user1/200/200'
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

export const WaterSystemDatas: WaterSystemData[] = [
  // 1. 중심부 (정수장)
  { id: 'plant_central', name: '중앙 정수장', lat: 35.2800, lng: 129.0800, type: 'plant' },

  // 2. 서측 계통 (AA가압장 라인)
  { id: 'pump_AA', name: 'AA 가압장', lat: 35.2200, lng: 129.0400, type: 'booster', spec: 'Q=14,400m³/day' },
  { id: 'res_A', name: 'A 배수지', lat: 35.1900, lng: 129.0100, type: 'reservoir', v: '2,500m³', currentLevel: 2.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_B', name: 'B 배수지', lat: 35.1700, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 3.2, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_D', name: 'D 배수지', lat: 35.1500, lng: 129.0300, type: 'reservoir', v: '1,000m³', currentLevel: 2.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_E', name: 'E 배수지', lat: 35.1300, lng: 129.0100, type: 'reservoir', v: '2,000m³', currentLevel: 4.1, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_F', name: 'F 배수지', lat: 35.1000, lng: 129.0000, type: 'reservoir', v: '1,000m³', currentLevel: 2.8, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_C', name: 'C 배수지', lat: 35.0800, lng: 129.0000, type: 'reservoir', v: '1,500m³', currentLevel: 1.2, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },

  // 3. 동측 및 기타 계통 (AB가압장 라인)
  { id: 'res_J', name: 'J 배수지', lat: 35.2200, lng: 129.1300, type: 'reservoir', v: '2,000m³', currentLevel: 3.5, maxLevel: 5.0, minLevel: 1.5, accuracy: 97.5 },
  { id: 'res_H', name: 'H 배수지', lat: 35.1900, lng: 129.1500, type: 'reservoir', v: '100m³', currentLevel: 0.5, maxLevel: 2.0, minLevel: 0.7, accuracy: 97.5 },
  { id: 'res_G', name: 'G 배수지', lat: 35.1700, lng: 129.0900, type: 'reservoir', v: '300m³', currentLevel: 1.8, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5 },
  { id: 'res_I', name: 'I 배수지', lat: 35.1500, lng: 129.1200, type: 'reservoir', v: '300m³', currentLevel: 1.5, maxLevel: 3.0, minLevel: 0.8, accuracy: 97.5 },

  { id: 'pump_AB', name: 'AB 가압장', lat: 35.1300, lng: 129.1000, type: 'booster', spec: 'Q=1,000m³/day' },
  { id: 'res_K', name: 'K 배수지', lat: 35.1300, lng: 129.1400, type: 'reservoir', v: '3,456m³', currentLevel: 4.2, maxLevel: 6.0, minLevel: 2.0, accuracy: 97.5 },
  { id: 'res_L', name: 'L 배수지', lat: 35.0900, lng: 129.1100, type: 'reservoir', v: '1,200m³', currentLevel: 2.9, maxLevel: 4.0, minLevel: 1.0, accuracy: 97.5 },
]
