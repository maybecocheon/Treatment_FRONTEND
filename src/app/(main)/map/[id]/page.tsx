import { Suspense } from "react";
import ReservoirDetailsModal from "../components/ReservoirDetailsModal";
import PageFallback from "@/components/loading/PageFallback";
import ReservoirDetailsSkeleton from "../components/skeletons/ReservoirDetailsSkeleton";

export default async function ReservoirDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <Suspense fallback={<PageFallback skeleton={<ReservoirDetailsSkeleton />}/>}>  
            <ReservoirDetailsModal params={{ id }} />   
        </Suspense> 
    );
}