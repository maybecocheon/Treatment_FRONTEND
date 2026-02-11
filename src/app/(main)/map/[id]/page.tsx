import { Suspense } from "react";
import ReservoirDetailsModal from "../components/ReservoirDetailsModal";
import ReservoirDetailsSkeleton from "../components/skeletons/ReservoirDetailsSkeleton";

export default async function ReservoirDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white/60 rounded-4xl shadow-2xl w-full max-w-5xl overflow-hidden animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
                <Suspense fallback={<ReservoirDetailsSkeleton />}>
                    <ReservoirDetailsModal params={{ id }} />
                </Suspense>
            </div>
        </div >
    );
}