'use client'

import { plantData } from '@/data/mockData';
import { Waves, Gauge, Droplets, TrendingUp } from 'lucide-react';
import { useState } from 'react';
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
    className={`glass flex-1 min-w-50 p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:scale-[1.02] hover:bg-white/40 group text-left ${onClick ? 'cursor-pointer' : 'cursor-default'}`}
  >
    <div className={`p-3 rounded-2xl transition-colors ${colorClass}`}>
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-[12px] uppercase font-bold tracking-widest text-blue-900/50 mb-1">
        {label}
      </span>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-black text-blue-950">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </span>
        {unit && <span className="text-xs font-semibold text-blue-900/60">{unit}</span>}
      </div>
    </div>
  </button>
);

export default function PlantStatsBar() {
  const [showTrend, setShowTrend] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StatCard
        icon={<Droplets size={24} />}
        label="정수장 송수량"
        value={plantData.outflow}
        unit="m³/h"
        colorClass="bg-blue-100/50 text-blue-700"
      />
      <StatCard
        icon={<Gauge size={24} />}
        label="펌프 가동률"
        value={plantData.pumpRate}
        unit="%"
        colorClass="bg-emerald-100/50 text-emerald-700"
      />
      <StatCard
        icon={<Waves size={24} />}
        label="정수장 잔량"
        value={plantData.currentStorage}
        unit={
          <div className="flex items-center gap-1">
            % <TrendingUp size={14} className="text-indigo-600" />
          </div>
        }
        colorClass="bg-indigo-100/50 text-indigo-700"
        onClick={() => setShowTrend(true)}
      />
      
      {showTrend && (
        <PlantTrendModal onClose={() => setShowTrend(false)} />
      )}
    </div>
  );
}