'use client'

import { ChevronDown, LucideIcon } from 'lucide-react';

interface TailSelectProps {
    icon?: LucideIcon;
    name: string;
    value?: string | number;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    option: React.ReactNode;
}
export default function TailSelect({ icon: Icon, name, value, onChange, option}: TailSelectProps) {
    return (
        <div className={`relative group ${name === "department" ? "w-full" : "w-26"}`}>
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-500 transition-colors z-10 pointer-events-none" />}
            <select
                required
                name={name}
                value={value}
                onChange={onChange}
                className={`w-full bg-white/50 border border-slate-200 rounded-2xl
                            ${name === "department" ? "py-4 pl-12 pr-10 text-sm md:text-base" : "pl-6 py-1.5 pr-2 text-[12px] font-semibold"}
                            focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 transition-all
                            shadow-sm appearance-none
                            ${value === "" ? "text-slate-400" : "text-slate-800"}`}
            >
                {option}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
    )
}
