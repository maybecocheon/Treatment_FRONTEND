'use client'

import { myFetch } from "@/api/api";
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
            await myFetch(`${baseUrl}/auth/signup`, {
                method: "POST",
                body: JSON.stringify(formData),
            });
            toast.success("회원가입 성공", {
                description: "로그인 후 서비스를 이용하실 수 있습니다."
            });
            router.push("/");
        } catch (error: any) {
            toast.error("회원가입 실패", {
                description: error.message || "정보를 다시 확인하거나 잠시 후 시도해 주세요."
            });
        }
    }

    // 중복 체크
    const handleDuplicate = async (formData: any) => {
        try {
            const data = await myFetch(`${baseUrl}/member/check/${formData.username}`);
            setUsernameChecked(true);
            return data;
        } catch (error) {
            setUsernameChecked(false);
            throw error;
        }
    };

    return { handleJoin, handleDuplicate, usernameChecked, setUsernameChecked };
}
