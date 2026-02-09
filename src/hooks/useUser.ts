import { myFetch } from '@/api/api';
import { userProfileAtom } from '@/atoms/uniAtoms';
import { useAtom } from 'jotai';
import { toast } from 'sonner';

export function useUser() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const [profile, setProfile] = useAtom(userProfileAtom);

  const loadProfile = async () => {
    try {
      const response = await myFetch(`${baseUrl}/member/profile`); 
      const data = await response.json();

      if (response.ok) {
        const userInfo = {
          username: data.username,
          alias: data.alias,
          department: data.department
        };

        // 1. 리액트 상태 업데이트 (즉시 반영)
        setProfile(userInfo);

        // 2. 로컬스토리지 캐싱 (새로고침 대비)
        localStorage.setItem("user_info", JSON.stringify(userInfo));
      } else {
        setProfile(null);
        toast.error(data.message || "프로필 불러오기 실패");
      }
    } catch (error) {
      setProfile(null);
      localStorage.removeItem("user_info");
      console.error("프로필 불러오기 오류: ", error);
      toast.error("프로필 불러오기 오류");
    }
  };

  return { profile, setProfile, loadProfile };
}