import { toast } from "sonner";

// 갱신 중인지 확인
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

export const myFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const defaultHeaders = { "Content-Type": "application/json" };
    const mergedOptions = {
        ...options,
        headers: { ...defaultHeaders, ...options.headers },
        credentials: "include" as const,
    };

    let response = await fetch(url, mergedOptions);

    // 401 발생 시 토큰 만료
    if (response.status === 401) {
        // 이미 갱신 중이라면 대기열로
        if (isRefreshing) {
            return new Promise((resolve) => {
                refreshSubscribers.push(() => {
                    resolve(fetch(url, mergedOptions));
                });
            });
        }

        isRefreshing = true;

        try {
            console.log("AccessToken 만료됨. 갱신 시도 중...");
            const refreshResponse = await fetch("/api/proxy/auth/refresh", {
                ...mergedOptions,
                method: "POST"
            });

            if (refreshResponse.ok) {
                isRefreshing = false;
                onTokenRefreshed("success");
                return await fetch(url, mergedOptions);
            } else {
                // 리프레시 토큰까지 죽었을 때
                isRefreshing = false;
                localStorage.clear();
                toast.error("세션이 만료되었습니다. 다시 로그인해 주세요.");
                window.location.href = "/";
                throw new Error("Refresh Token Expired");
            }
        } catch (error) {
            isRefreshing = false;
            console.error("토큰 갱신 중 오류:", error);
            localStorage.clear();
            toast.error("토큰 갱신 중 오류가 발생했습니다. 다시 로그인해 주세요.");
            window.location.href = "/";
            throw error;
        }
    }

    return response;
};