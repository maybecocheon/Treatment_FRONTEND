'use client'

import { Droplets } from "lucide-react";

interface EmptySelectionProps {
  title?: string;
  description?: string;
}

export default function EmptySelection({ 
  title = "분석할 배수지를 선택해주세요", 
  description = "상단에서 배수지를 선택하면 수요 예측 및 최적화 운영 차트를 확인할 수 있습니다." 
}: EmptySelectionProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-10 px-6 animate-in fade-in zoom-in duration-300">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Droplets className="text-slate-300 animate-bounce" size={32} />
      </div>
      <h2 className="text-lg font-bold text-slate-700 mb-1">{title}</h2>
      <p className="text-sm text-slate-400 whitespace-pre-line leading-relaxed">
        {description}
      </p>
    </div>
  );
}