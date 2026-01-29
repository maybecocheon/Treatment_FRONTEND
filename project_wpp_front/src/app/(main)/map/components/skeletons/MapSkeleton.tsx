'use client'

export default function MapSkeleton() {
    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden animate-pulse">
            {/* Polygon 대용 */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[60%] h-[50%] bg-sky-100/50 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl" />
            </div>

            {/* Polyline 대용 */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
                <path 
                    d="M 200 300 Q 400 250 600 350 T 900 300" 
                    fill="none" 
                    stroke="url(#grad)" 
                    strokeWidth="4" 
                    strokeDasharray="10 10"
                />
                <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: "#7dd3fc", stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: "#3b82f6", stopOpacity: 1 }} />
                    </linearGradient>
                </defs>
            </svg>

            {/* CustomOverlayMap 대용 */}
            {[
                { top: "30%", left: "40%" },
                { top: "45%", left: "55%" },
                { top: "60%", left: "35%" },
                { top: "25%", left: "70%" },
                { top: "70%", left: "60%" },
            ].map((pos, i) => (
                <div 
                    key={i} 
                    className="absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2"
                    style={{ top: pos.top, left: pos.left }}
                >
                    <div className="w-full h-full bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center">
                        <div className="w-5 h-5 bg-sky-200/50 rounded-lg" />
                    </div>
                </div>
            ))}
        </div>
    );
}