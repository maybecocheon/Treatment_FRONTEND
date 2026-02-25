'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function useJoin() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const router = useRouter();

    // 아이디 중복 확인
    const [usernameChecked, setUsernameChecked] = useState<boolean>(false);

    // 회원가입
    const handleJoin = async (formData: any) => {
        try {
            const response = await fetch(`${baseUrl}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success("회원가입 성공", {
                    description: "로그인 후 서비스를 이용하실 수 있습니다."
                });
                router.push("/");
            } else {
                toast.error("회원가입 실패", {
                    description: "정보를 다시 확인하거나 잠시 후 시도해 주세요."
                });
            }
        } catch (error) {
            toast.error("회원가입 오류", {
                description: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요."
            });
        }
    }

    // 중복 체크
    const handleDuplicate = async (formData: any) => {
        const response = await fetch(`${baseUrl}/member/check/${formData.username}`);

        if (!response.ok) {
            setUsernameChecked(false);
            throw new Error();
        }

        setUsernameChecked(true);
        return response;
    };

    return { handleJoin, handleDuplicate, usernameChecked, setUsernameChecked };
}
