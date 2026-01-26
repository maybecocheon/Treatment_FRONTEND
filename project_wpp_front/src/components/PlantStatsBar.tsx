import { plantData } from '@/data/mockData';
import { Waves, Gauge, Droplets, TrendingUp } from 'lucide-react';

const PlantsStats = ({ text, value, unit }: { text: string, value: number, unit: any}) => {
    return (
        <div>
          <p className="text-xs text-gray-500 font-semibold tracking-wider">{text}</p>
          <p className="text-2xl font-bold text-slate-800 flex">{value.toLocaleString()}{unit}</p>
        </div>
    );
}

export default function PlantStatsBar ({ onStorageClick }: { onStorageClick: () => void }) {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div className="flex-1 min-w-50 bg-white shadow-sm border border-gray-200 p-4 rounded-2xl flex items-center space-x-4">
        <div className="bg-blue-50 p-3 rounded-xl text-blue-600">
          <Droplets size={24} />
        </div>
        <PlantsStats text="정수장 송수량" value={plantData.outflow} unit={<span className="text-xs ml-1 text-slate-400 font-normal">m³/h</span>}/>
      </div>

      <div className="flex-1 min-w-50 bg-white shadow-sm border border-gray-200 p-4 rounded-2xl flex items-center space-x-4">
        <div className="bg-emerald-50 p-3 rounded-xl text-emerald-600">
          <Gauge size={24} />
        </div>
        <PlantsStats text="펌프 가동률" value={plantData.pumpRate} unit="%"/>
      </div>

      <button 
        onClick={onStorageClick}
        className="flex-1 min-w-50 bg-white shadow-sm border border-indigo-100 p-4 rounded-2xl flex items-center space-x-4 
                    hover:border-indigo-300 hover:shadow-md hover:cursor-pointer transition-all group text-left"
      >
        <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 group-hover:bg-indigo-100 transition-colors">
          <Waves size={24} />
        </div>
        <PlantsStats text="정수장 잔량" value={plantData.currentStorage}
                        unit={<span className="flex items-baseline">% <TrendingUp size={14} className="ml-2 text-indigo-400" /></span>}/>
      </button>
    </div>
  );
}