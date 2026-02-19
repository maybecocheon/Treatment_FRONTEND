import { Suspense } from 'react';
import Introduce from '@/components/loginJoin/Introduce';
import Login from '@/components/loginJoin/Login';
import LoginSkeleton from '@/components/loginJoin/skeletons/LoginSkeleton';
import IntroduceSkeleton from '@/components/loginJoin/skeletons/IntroduceSkeleton';
import PageFallback from '@/components/skeletons/PageFallback';
import Footer from '@/components/Footer';
import Introduce2 from '@/components/loginJoin/Introduce2';

export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-slate-50 text-slate-900">

      {/* 프로젝트 소개 섹션 */}
      <Introduce2 />

      {/* 로그인 섹션 */}
      {/* <Suspense fallback={<PageFallback skeleton={<LoginSkeleton />} />}>
        <Login />
      </Suspense> */}

      <Footer />
    </div>
  );
};