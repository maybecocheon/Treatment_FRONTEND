'use client'

import { myFetch } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const { data, isLoading, error } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const data = await myFetch(`${baseUrl}/member/profile`);
      return {
        username: data.username,
        alias: data.alias,
        department: data.department,
      };
    },
    // 프로필은 자주 안 바뀜
    staleTime: 1000 * 60 * 60,
  });

  return { 
    profile: data,
    isLoading, 
    error
  };
}