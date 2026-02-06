import { Loader, LucideIcon } from "lucide-react";

export interface TailButtonProps {
    text: string;
    icon: LucideIcon;
    style: string;
    onClick?: () => void;
    disabled?: boolean;
}

export default function TailButton({ text, icon: Icon, onClick, style, disabled = false }: TailButtonProps) {
    return (
        <button
            type="submit"
            className={`group relative w-full py-4 ${style} text-white rounded-2xl font-bold text-lg shadow-lg shadow-sky-500/20 transition-all active:scale-[0.98] overflow-hidden`}
            onClick={onClick}
            disabled={disabled}
        >
            <span className="relative z-10 flex items-center justify-center gap-2">
                {disabled ? <Loader className="w-5 h-5 text-white animate-spin" /> : <>{text} <Icon className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </span>
        </button>
    )
}
