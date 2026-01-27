import { LucideIcon } from "lucide-react";

export default function Input({ icon: Icon, type = "text", placeholder, }: { icon?: LucideIcon, type?: string; placeholder: string; }) {
    return (
        <div className="relative group">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />}
            <input
                type={type}
                placeholder={placeholder}
                required
                className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-sm md:text-base"
            />
        </div>
    );
}