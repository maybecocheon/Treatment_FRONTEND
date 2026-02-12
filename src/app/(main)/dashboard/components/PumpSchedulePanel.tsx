'use client'

import TailChart from '@/components/main/TailChart';


export default function PumpSchedulePanel() {
  return (
    <div className="flex-1">
      <div className="glass backdrop-blur-xl rounded-3xl p-4 h-full flex flex-col">
        <h2 className="text-xs lg:text-sm font-bold text-slate-800 flex items-center gap-2">
          최적화 스케줄링
        </h2>

        <div className="flex-1 flex flex-col gap-4 min-h-0">
          {/* Graph Section */}
          <div className="h-70 md:h-full lg:col-span-2 min-h-0 relative py-2">
            <TailChart
              time={["0", "1", "2", "3", "4", "5"]}
              data={[1, 2, 3, 4, 5]}
              label1="현재 수요"
            />
          </div>
        </div>
      </div>
    </div>
  );
};


