import { Suspense } from 'react';
import Join from './components/Join';
import PageFallback from '@/components/loading/PageFallback';
import JoinSkeleton from '@/components/skeletons/JoinSkeleton';


export default function JoinPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
            <Suspense fallback={<PageFallback skeleton={<JoinSkeleton />} />}>
                <Join />
            </Suspense>
        </div>
    );
};
