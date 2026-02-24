'use client'

import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { virtualTimeAtom } from "@/atoms/uniAtoms";

export function useLogin() {
    const time = useAtomValue(virtualTimeAtom);
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();

    // 로그인 함수
    const handleLogin = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("lastLoginTime", time);

                queryClient.invalidateQueries({ queryKey: ["userProfile"] });

                const redirectTo = searchParams.get("redirect") || "/dashboard";
                toast.success("로그인 성공!", {
                    description: "환영합니다! 대시보드로 이동합니다.",
                    duration: 2000
                });

                router.refresh();

                setTimeout(() => {
                    if (redirectTo.startsWith("/")) {
                        router.push(redirectTo);
                    } else {
                        router.push("/dashboard");
                    }
                }, 100);

                return true;
            } else {
                toast.error(data.message || "아이디 또는 비밀번호를 다시 확인해 주세요.");
            }
        } catch (error) {
            console.error("로그인 오류: ", error);
            toast.error("로그인 중 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}