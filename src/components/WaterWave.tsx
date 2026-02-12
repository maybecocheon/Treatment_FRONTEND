'use client'

import { motion } from "framer-motion";

export interface WaterWaveProps {
    levelPercent: number;
    danger: boolean;
}

export function WaterWave({ levelPercent, danger }: WaterWaveProps) {
  // 시각적 보정: 너무 낮을 때 바닥에 붙어 보이지 않게 최소값(min) 설정
  const adjustedHeight = Math.max(levelPercent, 10);

  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden transition-all duration-1000 ease-in-out"
      style={{ height: `${adjustedHeight}%` }}
    >
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-[110%]" 
      >
        <motion.path
          fill={danger ? "#ef4444" : "#60a5fa"}
          fillOpacity="0.4" 
          animate={{
            d: [
              "M0,10 C120,0 240,20 360,10 480,0 600,20 720,10 840,0 960,20 1080,10 1200,0 1320,20 1440,10 L1440,100 L0,100 Z",
              "M0,15 C120,25 240,5 360,15 480,25 600,5 720,15 840,25 960,5 1080,15 1200,25 1320,5 1440,15 L1440,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: danger ? 2 : 4, 
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}