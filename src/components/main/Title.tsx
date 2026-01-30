'use client'

export interface TitleProps {
    title: string;
    subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {  
    return (
        <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-950 tracking-tight">{title}</h2>
            <p className="text-blue-800/60 font-medium text-sm md:text-base">{subtitle}</p>
        </div>
    )
}
