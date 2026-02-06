'use client'

import { myFetch } from "@/api/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useLogout() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // 실제 로그아웃
    const executeLogout = async () => {
        setIsLoading(true);
        const toastId = toast.loading("로그아웃 중...");
        try {
            const response = await myFetch("/api/proxy/auth/logout", {
                method: "POST"
            });

            if (response && response.ok) {
                toast.success("성공적으로 로그아웃되었습니다.", { id: toastId });
            } else {
                toast.error("세션 종료 실패", { id: toastId, description: "강제 로그아웃 처리되었습니다." });
            }
        } catch (error) {
            toast.error("로그아웃 오류", { id: toastId, description: "강제 로그아웃 처리되었습니다." });
        } finally {
            setIsLoading(false);
            localStorage.clear();
            router.push("/");
            router.refresh();
        }
    };

    // 외부에서 호출할 함수
    const handleLogout = (needConfirm = false) => {
        if (!needConfirm) {
            executeLogout();
            return;
        }

        // 컨펌 창 띄우기
        toast.error("로그아웃하시겠습니까?", {
            duration: Infinity,
            action: {
                label: "로그아웃",
                onClick: () => executeLogout(),
            },
            cancel: {
                label: "취소",
                onClick: () => toast.dismiss(),
            },
        });
    };

    return { handleLogout, isLoading };
}