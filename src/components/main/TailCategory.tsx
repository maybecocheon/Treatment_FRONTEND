import { selectedCategoryAtom } from "@/atoms/uniAtoms";
import { useAtomValue, useSetAtom } from "jotai";
import { waterSystemDatas } from "@/data/mockData";
import { Database, Droplets, Factory} from "lucide-react";

export default function Category() {
    const selectedCategory = useAtomValue(selectedCategoryAtom);
    const setSelectedCategory = useSetAtom(selectedCategoryAtom);

    return (
        <div className="glass p-4 rounded-3xl flex flex-col xl:flex-row items-stretch xl:items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl overflow-x-auto no-scrollbar w-full">
                {waterSystemDatas.map((waterSystem) => (
                    <button
                        key={waterSystem.id}
                        onClick={() => setSelectedCategory(waterSystem.id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${selectedCategory === waterSystem.id
                            ? 'bg-white text-slate-900 shadow-sm ring-1 ring-slate-200'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {waterSystem.type === 'overview' && <Database className="w-4 h-4" />}
                        {waterSystem.type === 'plant' && <Factory className="w-4 h-4" />}
                        {waterSystem.type === 'reservoir' && <Droplets className="w-4 h-4" />}
                        {waterSystem.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
