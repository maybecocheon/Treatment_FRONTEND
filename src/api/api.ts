import { mockApiService } from "./mockApiService";

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

// Mock 모드 판별 (환경 변수가 없거나 서버와 통신이 불가능할 경우)
let useMockMode = !baseUrl;

// 2. 메인 Fetch 함수 (Retry 로직 포함)
export const myFetch = async (url: string, options: RequestInit = {}) => {
    // Mock 모드 확인
    if (useMockMode) {
        // console.log(`[Mock Mode] Fetching: ${url}`);
        return mockApiService.handleMockRequest(url);
    }

    // 최대 2번 시도 (원래 요청 -> [실패시] 갱신 후 재요청)
    for (let i = 0; i < 2; i++) {
        try {
            const response = await fetch(`${url}`, {
                ...options,
                headers: { "Content-Type": "application/json", ...options.headers },
                credentials: "include"
            });

            // 성공 시 바로 데이터 반환
            if (response.ok) return response.json().catch(() => ({}));

            // 401(Unauthorized) 발생 시 갱신 시도
            if (response.status === 401) {
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
                    const error = new Error("세션이 만료되었습니다. 다시 로그인해 주세요.");
                    (error as any).status = 401;
                    throw error;
                }
            }

            // 401이 아닌 다른 에러(404, 500 등) 시
            const errorData = await response.json().catch(() => ({}));
            const error = new Error(errorData.message || "서버 에러가 발생했습니다.");
            (error as any).status = response.status;

            throw error;
        } catch (error: any) {
            // 네트워크 에러 등으로 fetch 자체가 실패한 경우 Mock 모드 전환
            if (error.name === "TypeError" || error.message?.includes("failed to fetch") || error.message?.includes("NetworkError")) {
                console.warn("Network error detected. Switching to Mock Mode.");
                useMockMode = true;
                return mockApiService.handleMockRequest(url);
            }
            throw error;
        }
    }
    throw new Error("요청 재시도 횟수를 초과했습니다.");
};
