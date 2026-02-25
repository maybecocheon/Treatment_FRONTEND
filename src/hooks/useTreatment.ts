import { myFetch } from "@/api/api";
import { TreatmentType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useRefreshTime } from "./useRefreshTime";
import { useMemo } from "react";
import dayjs from "dayjs";

export function useTreatment() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { roundedTime: date} = useRefreshTime();
  const formattedDate = useMemo(() => {
      return dayjs(date).add(1, "minute").format("YYYY-MM-DD HH:mm:ss");
    }, [date]);

  const { data: treatment, isLoading, isFetching, error, refetch: loadTreatment } = useQuery<TreatmentType>({
    // 1. queryKey: date가 바뀔 때마다 자동으로 API를 다시 호출 (useEffect 역할)
    queryKey: ["treatment", date], 
    
    // 2. queryFn: 실제 fetch 로직
    queryFn: async () => {
      const data = await myFetch(`${baseUrl}/treatment/now?date=${formattedDate}`);
      return data;
    },
    
    // 3. 옵션 설정
    enabled: !!date, // date가 있을 때만 실행
    staleTime: 1000 * 60 * 15, // 15분
  });

  return { treatment, loadTreatment, isLoading: isLoading || (isFetching && !treatment), error };
}