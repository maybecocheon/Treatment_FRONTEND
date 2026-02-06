'use client'

import { toast } from "sonner";
import { useUser } from "./useUser";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export function useLogin() {
    // 로그인 성공 시 불러올 유저 프로필
    const { loadProfile } = useUser();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await fetch("/api/proxy/auth/login", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),

            });
            if (response.ok) {
                localStorage.setItem("lastLoginTime", new Date().toLocaleString());
                await loadProfile();

                const redirectTo = searchParams.get("redirect") || "/dashboard";
                toast.success("로그인 성공!", {
                    description: "환영합니다! 대시보드로 이동합니다.",
                    duration: 2000
                });

                if (redirectTo.startsWith("/")) {
                    router.push(redirectTo);
                } else {
                    router.push("/dashboard");
                }
                router.refresh();
                
                return true;
            } else {
                toast.error("아이디 또는 비밀번호를 다시 확인해 주세요.");
            }
        } catch (error) {
            console.error("로그인 오류: ", error);
            toast.error("로그인 오류", {
                description: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
            });
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}