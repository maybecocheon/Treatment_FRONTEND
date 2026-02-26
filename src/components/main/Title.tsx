'use client'

export interface TitleProps {
    title: string;
    subtitle: string;
}

export default function Title({ title, subtitle }: TitleProps) {
    return (
        <div className="p-2 space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">{title}</h2>
            <p className="text-muted font-medium text-sm md:text-base">{subtitle}</p>
        </div>
    )
}
