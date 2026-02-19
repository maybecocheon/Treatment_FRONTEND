import { myFetch } from '@/api/api';
import { userProfileAtom } from '@/atoms/uniAtoms';
import { useAtom } from 'jotai';
import { useState } from 'react';

export function useUser() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useAtom(userProfileAtom);

  const loadProfile = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await myFetch(`${baseUrl}/member/profile`);
      const userInfo = {
        username: data.username,
        alias: data.alias,
        department: data.department
      };

      // 1. 리액트 상태 업데이트 (즉시 반영)
      setProfile(userInfo);

      // 2. 로컬스토리지 캐싱 (새로고침 대비)
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    } catch (error: any) {
      setProfile(null);
      setError(error);
      localStorage.removeItem("user_info");
    } finally {
      setIsLoading(false);
    }
  };

  return { profile, setProfile, loadProfile, error, isLoading };
}