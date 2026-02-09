import { myFetch } from "@/api/api";
import { useState } from "react";
import { toast } from "sonner";
import { useUser } from "./useUser";
import { useLogout } from "./useLogout";
import { useRouter } from "next/navigation";

export default function useUpdateProfile() {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
    const router = useRouter();
    const { loadProfile } = useUser();
    const { handleLogout } = useLogout();
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await myFetch(`${baseUrl}/member/update/profile`, {
                method: "PATCH",
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response && response.ok) {
                toast.success("회원 정보가 성공적으로 수정되었습니다.");
                loadProfile();
            } else {
                toast.error(data.message || "회원 정보 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("회원 정보 수정 오류: ", error);
            toast.error("수정 오류", { description: "회원 정보 수정 중 오류가 발생했습니다." });
        } finally {
            setIsLoading(false);
        }
    }

    const updatePassword = async (formData: any) => {
        setIsLoading(true);
        try {
            const response = await myFetch(`${baseUrl}/member/update/password`, {
                method: "PATCH",
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                toast.success("비밀번호 변경 완료", {
                    description: "로그인 페이지로 이동합니다.",
                });

                // 로그아웃 처리
                handleLogout();
                return true;
            } else {
                toast.error(data.message || "비밀번호 수정에 실패했습니다.");
            }
        } catch (error) {
            console.error("비밀번호 변경 오류: ", error);
            toast.error("변경 오류", { description: "비밀번호 수정 중 오류가 발생했습니다." });
        } finally {
            setIsLoading(false);
        }
    }

    const deleteAccount = () => {
        setIsLoading(true);
        toast.error("정말로 탈퇴하시겠습니까?", {
            duration: Infinity,
            description: "모든 데이터가 삭제됩니다.",
            action: {
                label: "탈퇴",
                onClick: () => async () => {
                    try {
                        const response = await myFetch(`${baseUrl}/member/delete`, {
                            method: "DELETE",
                            credentials: "include"
                        });
                        const data = await response.json();
                        if (response.ok) {
                            toast.success("탈퇴 처리되었습니다.");
                            localStorage.clear();
                            router.push("/");
                            router.refresh();
                        } else {
                            toast.error(data.message || "회원 탈퇴에 실패했습니다.");
                        }
                    } catch (error) {
                        console.error("탈퇴 중 오류", error);
                        toast.error("탈퇴 오류", { description: "회원 탈퇴 중 오류가 발생했습니다." });
                    } finally {
                        setIsLoading(false);
                    }
                },
            },
            cancel: {
                label: "취소",
                onClick: () => { toast.dismiss(); setIsLoading(false); },
            },
        });
    }

    return { updateProfile, updatePassword, deleteAccount, isLoading };
}
