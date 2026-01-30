'use client'

import { plantData } from '@/data/mockData';
import { Waves, Gauge, Droplets, TrendingUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import PlantTrendModal from './PlantTrendModal';

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number | string;
  unit?: React.ReactNode;
  colorClass: string;
  onClick?: () => void;
}> = ({ icon, label, value, unit, colorClass, onClick }) => (
  <button
    onClick={onClick}
    className={`glass flex-1 w-full p-6 rounded-4xl flex flex-col justify-center items-center gap-4 transition-all duration-300 hover:scale-[1.02] hover:bg-white/40 group ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
  >
    <div className={`p-4 rounded-2xl transition-colors shadow-inner ${colorClass}`}>
      {icon}
    </div>
    <div className="flex flex-col items-center text-center">
      <span className="text-[11px] uppercase font-black tracking-widest text-blue-900/40 mb-2">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-blue-950 tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-sm font-bold text-blue-900/60">{unit}</span>}
      </div>
    </div>
  </button>
);

export default function PlantStatsBar() {
  const [showTrend, setShowTrend] = useState(false);

  return (
    <div className="flex flex-col justify-stretch gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full min-w-55">
      <StatCard
        icon={<Droplets size={28} />}
        label="정수장 송수량"
        value={plantData.outflow}
        unit="m³/h"
        colorClass="bg-blue-100/60 text-blue-700"
      />
      <StatCard
        icon={<Gauge size={28} />}
        label="펌프 가동률"
        value={plantData.pumpRate}
        unit="%"
        colorClass="bg-emerald-100/60 text-emerald-700"
      />
      <StatCard
        icon={<Waves size={28} />}
        label="정수장 잔량"
        value={plantData.currentStorage}
        unit={
          <div className="flex items-center gap-1">
            % <TrendingUp size={16} className="text-indigo-600" />
          </div>
        }
        colorClass="bg-indigo-100/60 text-indigo-700"
        onClick={() => setShowTrend(true)}
      />
      
      {showTrend && (
        <PlantTrendModal onClose={() => setShowTrend(false)} />
      )}
    </div>
  );
}