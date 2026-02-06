import { Suspense } from 'react';
import Introduce from '@/components/loginJoin/Introduce';
import Login from '@/components/loginJoin/Login';
import LoginSkeleton from '@/components/loginJoin/skeletons/LoginSkeleton';
import IntroduceSkeleton from '@/components/loginJoin/skeletons/IntroduceSkeleton';
import PageFallback from '@/components/loading/PageFallback';
import Footer from '@/components/Footer';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">

      {/* 로그인 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<LoginSkeleton />} />}>
        <Login />
      </Suspense>

      {/* 프로젝트 소개 섹션 */}
      <Suspense fallback={<PageFallback skeleton={<IntroduceSkeleton />} />}>
        <Introduce />
      </Suspense>
      <Footer />
    </div>
  );
};