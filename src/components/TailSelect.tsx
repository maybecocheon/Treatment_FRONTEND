'use client'

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { currentUser } from '@/data/mockData';
import { Building2 } from "lucide-react";

export default function TailSelect() {
    const [selectedValue, setSelectedValue] = useState("");

    return (
        <div className="relative group w-full">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-sky-500 transition-colors z-10 pointer-events-none" />
            <select
                required
                name="dept"
                value={selectedValue || (currentUser.department && currentUser.department)}
                onChange={(e) => setSelectedValue(e.target.value)}
                className={`w-full bg-white/50 border border-slate-200 rounded-2xl py-4 pl-12 pr-10 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-400 transition-all text-sm md:text-base shadow-sm appearance-none
                                                ${(selectedValue || currentUser.department) === "" ? "text-slate-400" : "text-slate-800"}`}
            >
                <option value="" disabled>부서 선택</option>
                <option value="정수운영팀" className="text-slate-800">정수운영팀</option>
                <option value="배수운영팀" className="text-slate-800">배수운영팀</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
        </div>
    )
}
