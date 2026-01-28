import { WaterSystemDatas, MOCK_HISTORY_DATA } from "@/data/mockData";
import { Droplets, Gauge, Waves } from "lucide-react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function RenderCharts({ selectedCategory }: { selectedCategory: string }) {
  const currentData = MOCK_HISTORY_DATA[selectedCategory];
  const isReservoir = selectedCategory.startsWith("res");
  const isPlant = selectedCategory === "PLANT";
  const isOverview = selectedCategory === "OVERVIEW";

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
      {/* 그래프 1: 수위 or 송수량 */}
      {
        (isPlant || isReservoir) && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">
                  {isPlant ? '실시간 송수량 (Supply)' : '시간별 수위 변화 (Level)'}
                </h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Hourly Time Series Analysis</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                {isPlant ? <Waves size={20} /> : <Droplets size={20} />}
              </div>
            </div>
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentData}>
                  <defs>
                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} fontWeight="700" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} fontWeight="700" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey={isPlant ? "supply" : "level"} stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorPrimary)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

      {/* 그래프 2: 유출량 or 토출 압력 */}
      {
        (isPlant || isReservoir) && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h4 className="text-xl font-black text-slate-800 tracking-tight">
                  {isPlant ? '정수장 토출 압력 (Pressure)' : '시간별 유출량 (Outflow)'}
                </h4>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Operational Performance Metrics</p>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
                <Gauge size={20} />
              </div>
            </div>
            <div className="h-75">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} fontWeight="700" axisLine={false} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} fontWeight="700" axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line type="monotone" dataKey={isPlant ? "pressure" : "outflow"} stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
      }

      {/* 그래프 3: 배수지별 총 수요량 비교 (Overview Only) */}
      {isOverview && (
        <div className="col-span-1 xl:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-xl font-black text-slate-800 tracking-tight">배수지별 총 수요량 비교</h4>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Aggregated Demand Comparison</p>
            </div>
          </div>
          <div className="h-75">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={WaterSystemDatas.filter(d => d.id.startsWith("res")).map(r => ({ name: r.name, value: r.actualDemand?.reduce((a, b) => a + b, 0) }))}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} fontWeight="800" axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};