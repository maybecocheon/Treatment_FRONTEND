import { Loader2 } from "lucide-react";

interface FetchingSpinnerProps {
    isFetching: boolean;
}

export default function FetchingSpinner({ isFetching }: FetchingSpinnerProps) {
    if (!isFetching) return null;

    return (
        <div className="absolute top-4 right-4 z-50 pointer-events-none">
            <div className="flex items-center gap-2 bg-card/80 backdrop-blur-md px-2 py-1 rounded-lg border border-card-border shadow-sm animate-in fade-in zoom-in duration-300">
                <Loader2 size={12} className="text-primary animate-spin" />
                <span className="text-[10px] font-bold text-muted uppercase tracking-tighter">불러오는 중...</span>
            </div>
        </div>
    );
}
