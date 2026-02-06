import { myFetch } from '@/api/api';
import { userProfileAtom } from '@/atoms/uniAtoms';
import { useAtom } from 'jotai';

export function useUser() {
  const [profile, setProfile] = useAtom(userProfileAtom);

  const loadProfile = async () => {
    try {
      const response = await myFetch("/api/proxy/member/profile"); 
      
      if (response && response.ok) {
        const data = await response.json();
        
        const userInfo = {
          username: data.username,
          alias: data.alias,
          department: data.department
        };

        // 1. 리액트 상태 업데이트 (즉시 반영)
        setProfile(userInfo);

        // 2. 로컬스토리지 캐싱 (새로고침 대비)
        localStorage.setItem("user_info", JSON.stringify(userInfo));
      }
    } catch (e) {
      setProfile(null);
      localStorage.removeItem("user_info");
    }
  };

  return { profile, setProfile, loadProfile };
}