import { Suspense } from 'react';
import Introduce from '@/index_components/Introduce';
import Login from '@/index_components/Login';
import LoginSkeleton from '@/components/skeletons/LoginSkeleton';
import IntroduceSkeleton from '@/components/skeletons/IntroduceSkeleton';
import PageFallback from '@/components/loading/PageFallback';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">

      {/* 로그인 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<LoginSkeleton />} />}>
        <Login />
      </Suspense>


      {/* 프로젝트 소개 */}
      <Suspense fallback={<PageFallback skeleton={<IntroduceSkeleton />} />}>
        <Introduce />
      </Suspense>

      <footer className="py-12 md:py-20 bg-slate-950 text-slate-600 text-center text-sm border-t border-white/5">
        <p>© 2026 FLOWISE System. Innovating Water Infrastructure through Intelligence.</p>
      </footer>
    </div>
  );
};