'use client'

import { myFetch } from "@/api/api";
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
            await myFetch(`${baseUrl}/auth/login`, {
                method: "POST",
                body: JSON.stringify(formData),
            });

            localStorage.setItem("lastLoginTime", time);
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });

            const redirectTo = searchParams.get("redirect") || "/dashboard";
            toast.success("로그인 성공!", {
                description: "환영합니다! 대시보드로 이동합니다.",
                duration: 2000
            });

            router.refresh();

            setTimeout(() => {
                const finalRedirect = redirectTo.startsWith("/") ? redirectTo : "/dashboard";
                router.push(finalRedirect);
            }, 100);

            return true;
        } catch (error: any) {
            toast.error(error.message || "로그인 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    }

    return { handleLogin, isLoading };
}