import { motion } from "framer-motion";

export interface WaterWaveProps {
    levelPercent: number;
    danger: boolean;
}

export function WaterWave({ levelPercent, danger, }: WaterWaveProps) {
  return (
    <div
      className="absolute bottom-0 left-0 w-full overflow-hidden"
      style={{ height: `${levelPercent}%` }}
    >
      <motion.svg
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        className="absolute bottom-0 w-[120%] h-full"
      >
        <motion.path
          fill={danger ? "#ef4444" : "#60a5fa"}
          fillOpacity="0.3"
          animate={{
            d: [
              "M0,40 C120,30 240,50 360,40 480,30 600,50 720,40 840,30 960,50 1080,40 1200,30 1320,50 1440,40 L1440,100 L0,100 Z",
              "M0,45 C120,55 240,35 360,45 480,55 600,35 720,45 840,55 960,35 1080,45 1200,55 1320,35 1440,45 L1440,100 L0,100 Z",
            ],
          }}
          transition={{
            duration: danger ? 3 : 6,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </div>
  );
}