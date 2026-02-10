const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// 1. 토큰 갱신 함수
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
const refreshToken = async (): Promise<boolean> => {
    // 이미 갱신 중이라면 진행 중인 Promise 반환 (중복 호출 방지)
    if (isRefreshing && refreshPromise) {
        return refreshPromise;
    }

    isRefreshing = true;

    // 갱신 로직을 Promise에 할당
    refreshPromise = (async () => {
        try {
            const response = await fetch(`${baseUrl}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            if (response.ok) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        } finally {
            // 갱신 완료 후 초기화
            isRefreshing = false;
            refreshPromise = null;
        }
    })();

    return refreshPromise;
};

// 2. 메인 Fetch 함수 (Retry 로직 포함)
export const myFetch = async (url: string, options: RequestInit = {}) => {
    // 최대 2번 시도 (원래 요청 -> [실패시] 갱신 후 재요청)
    for (let i = 0; i < 2; i++) {
        const response = await fetch(`${url}`, {
            ...options,
            headers: { "Content-Type": "application/json", ...options.headers },
            credentials: "include"
        });

        // 401(Unauthorized) 발생 시 갱신 시도
        if (response.status === 401) {

            // CSR에서만 갱신 시도
            const refreshed = await refreshToken();
            if (refreshed) {
                continue; // 갱신 성공 => 루프를 돌아 재요청 (새 쿠키 자동 사용)
            } else {
                // 갱신 실패 (리프레시 토큰도 만료됨)
                if (typeof window !== "undefined") {
                    localStorage.clear();
                    if (window.location.pathname !== "/") {
                        window.location.href = "/"; // redirect 대신 사용
                    }
                }
                return response;
            }
        }

        return response; // 성공(200)이거나 401 아닌 다른 에러면 바로 반환
    }

    return new Response(JSON.stringify({ message: "최대 재시도 횟수 초과" }), {
        status: 500,
        statusText: "Internal Server Error",
    }); // 더미 응답
};