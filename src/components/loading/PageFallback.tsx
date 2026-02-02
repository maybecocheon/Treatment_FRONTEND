import { Loader2 } from "lucide-react";

export interface PageFallbackProps {
    skeleton?: React.ReactNode;
    message?: string;
}

export default function PageFallback({ skeleton, message = "화면을 불러오는 중이에요…", }: PageFallbackProps) {
    return (
        <div className="relative flex-1 w-full h-full min-h-100">
            {skeleton}

            {/* 중앙 로딩 오버레이 */}
            <div className="absolute inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
                <div className="flex items-center gap-3 bg-black/40 px-5 py-3 rounded-2xl text-slate-200 backdrop-blur">
                    <Loader2 className="w-5 h-5 animate-spin text-blue-400" />
                    <span className="text-sm font-medium">{message}</span>
                </div>
            </div>
        </div>
    );
}