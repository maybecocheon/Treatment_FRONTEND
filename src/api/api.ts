import { toast } from "sonner";

// 갱신 중인지 확인
let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const onTokenRefreshed = (token: string) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

export const myFetch = async (url: string, options: RequestInit = {}): Promise<Response> => {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
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

        // 1. 이미 리프레시 시도 중인 경로라면 무한 루프 방지를 위해 바로 리턴
        if (url.includes("/auth/refresh")) {
            return response;
        }

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
            const refreshResponse = await fetch(`${baseUrl}/auth/refresh`, {
                method: "POST",
                headers: defaultHeaders,
                credentials: "include",
            });

            const data = await refreshResponse.json();

            if (refreshResponse.ok) {
                isRefreshing = false;
                onTokenRefreshed("success");
                return await fetch(url, mergedOptions);
            } else {
                // 리프레시 토큰까지 죽었을 때
                isRefreshing = false;
                localStorage.clear();
                toast.error(data.message || "Refresh Token이 없습니다.");
                //window.location.href = "/";
                throw new Error("Refresh Token Expired");
            }
        } catch (error) {
            isRefreshing = false;
            console.error("토큰 갱신 중 오류:", error);  
            toast.error("토큰 갱신 중 오류가 발생했습니다. 다시 로그인해 주세요.");
            localStorage.clear();
            //window.location.href = "/";
            throw error;
        }
    }

    return response;
};