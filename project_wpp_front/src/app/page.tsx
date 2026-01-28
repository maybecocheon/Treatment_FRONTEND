import { Suspense } from 'react';
import Introduce from '@/components/loginJoin/Introduce';
import Login from '@/components/loginJoin/Login';
import LoginSkeleton from '@/components/skeletons/LoginSkeleton';
import IntroduceSkeleton from '@/components/skeletons/IntroduceSkeleton';
import PageFallback from '@/components/loading/PageFallback';
import Footer from '@/components/Footer';
import FooterSkeleton from '@/components/skeletons/FooterSkeleton';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-200">

      {/* 로그인 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<LoginSkeleton />} />}>
        <Login />
      </Suspense>


      {/* 프로젝트 소개 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<IntroduceSkeleton />} />}>
        <Introduce />
      </Suspense>

      {/* footer 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<FooterSkeleton />} />}>
        <Footer />
      </Suspense>
    </div>
  );
};