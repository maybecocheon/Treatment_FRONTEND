'use client'

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // hydration mismatch 방지
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-9 h-9 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 animate-pulse" />
        );
    }

    const isDark = theme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-card shadow-sm
                        border border-card-border hover:bg-white/40 dark:hover:bg-slate-800/60 transition-all duration-300 active:scale-90 group overflow-hidden"
            aria-label="테마 전환"
        >
            <div className="relative w-5 h-5">
                <Sun
                    className={`absolute inset-0 transform transition-all duration-500 rotate-0 scale-100
                                ${isDark ? "-rotate-90 scale-0 opacity-0" : "text-amber-500"}`}
                    size={20}
                />
                <Moon
                    className={`absolute inset-0 transform transition-all duration-500 rotate-90 scale-0 opacity-0
                                ${isDark ? "rotate-0 scale-100 opacity-100 text-blue-400" : ""}`}
                    size={20}
                />
            </div>

            {/* 글로우 효과 */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500
                ${isDark ? "bg-blue-400 blur-xl" : "bg-amber-400 blur-xl"}`}
            />
        </button>
    );
}
