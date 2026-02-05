export const myFetch = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, {
        ...options,
        credentials: "include",
    });

    if (response.status === 401) {
        alert("로그인이 필요합니다.");
        window.location.href = "/"; 
        return;
    }

    return response;
};