import { Suspense } from 'react';
import Join from './Join';
import PageFallback from '@/components/loading/PageFallback';
import JoinSkeleton from '@/components/loginJoin/skeletons/JoinSkeleton';

export default function JoinPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
            <Suspense fallback={<PageFallback skeleton={<JoinSkeleton />} />}>
                <Join />
            </Suspense>
        </div>
    );
};