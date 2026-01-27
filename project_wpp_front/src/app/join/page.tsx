import { Suspense } from 'react';
import Join from './Join';


export default function JoinPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">
            <Suspense>
                <Join />
            </Suspense>
        </div>
    );
};
