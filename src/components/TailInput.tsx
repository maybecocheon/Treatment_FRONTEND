import { LucideIcon } from "lucide-react";

export interface InputProps {
    icon?: LucideIcon;
    type?: string;
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export default function TailInput({ icon: Icon, type = "text", placeholder, name, value, onChange, disabled = false }: InputProps) {
    return (
        <div className="relative group">
            {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted group-focus-within:text-primary transition-colors" />}
            <input
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required
                className={`w-full border border-card-border rounded-2xl py-4 pl-12 pr-4 placeholder:text-muted/60 focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all text-sm md:text-base shadow-sm
                    ${disabled ? 'bg-muted/10 text-muted/50' : 'bg-card/50 text-foreground'}`}
            />
        </div>
    );
}