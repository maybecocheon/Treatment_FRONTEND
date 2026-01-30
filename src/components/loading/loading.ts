import { useEffect, useState } from "react";

const [loading, setLoading] = useState(true);

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
useEffect(() => {
    // 3초 동안 스켈레톤을 보여주기 위해 의도적 지연
    delay(3000).then(() => setLoading(false));
}, []);

if (loading) {
    // Suspense를 트리거하기 위해 로딩 중엔 null을 던지거나 
    // 혹은 직접 스켈레톤을 리턴해도 되지만, 테스트를 위해 에러를 던지지 않고 
    // 컴포넌트 자체가 '지연'되는 상황을 만들려면 서버 컴포넌트 방식이 가장 좋습니다.
    throw delay(3000); // React 18+ 내부 실험적 방식 (Suspense 트리거)
}