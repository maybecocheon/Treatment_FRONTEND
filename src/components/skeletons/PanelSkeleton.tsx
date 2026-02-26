'use client'

import { ReactNode } from "react";

interface PanelSkeletonProps {
    children?: ReactNode;
    className?: string;
    count?: number;
}

export default function PanelSkeleton({ children, className = "", count = 1 }: PanelSkeletonProps) {
    return (
        <div className={`p-5 glass rounded-2xl animate-pulse flex flex-col gap-4 ${className}`}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex flex-col gap-4">
                    {children || (
                        <>
                            <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-lg" />
                            <div className="flex-1 min-h-[100px] bg-slate-100 dark:bg-slate-800 rounded-xl" />
                        </>
                    )}
                </div>
            ))}
        </div>
    );
}
