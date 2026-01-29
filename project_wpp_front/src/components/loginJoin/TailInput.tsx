import { LucideIcon } from "lucide-react";

export interface InputProps {
    icon?: LucideIcon;
    type?: string;  
    placeholder: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function TailInput({ icon: Icon, type = "text", placeholder, name, value, onChange }: InputProps) {
    return (
        <div className="relative group">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                required
                className="w-full bg-white/50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 transition-all text-sm md:text-base shadow-sm"
            />
        </div>
    );
}