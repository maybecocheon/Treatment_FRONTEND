import { selectedCategoryAtom } from "@/atoms/categoryAtom";
import { useAtomValue, useSetAtom } from "jotai";
import { Database, Droplets} from "lucide-react";

const categories = [
    { id: 'OVERVIEW', label: '전체', icon: <Database className="w-4 h-4" /> },
    { id: 'PLANT', label: '정수장', icon: <Database className="w-4 h-4" /> },
    { id: 'res-a', label: 'A 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-b', label: 'B 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-c', label: 'C 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-d', label: 'D 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-e', label: 'E 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-f', label: 'F 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-g', label: 'G 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-h', label: 'H 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-i', label: 'I 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-j', label: 'J 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-k', label: 'K 배수지', icon: <Droplets className="w-4 h-4" /> },
    { id: 'res-l', label: 'L 배수지', icon: <Droplets className="w-4 h-4" /> },
];


export default function Category() {
    const selectedCategory = useAtomValue(selectedCategoryAtom);
    const setSelectedCategory = useSetAtom(selectedCategoryAtom);

    return (
        <div className="glass p-4 rounded-3xl flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar w-full">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === cat.id
                            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {cat.icon}
                        {cat.label}
                    </button>
                ))}
            </div>
        </div>
    )
}
