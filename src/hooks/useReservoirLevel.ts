import { myFetch } from "@/api/api";
import { ReservoirLevelType } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { useRefreshTime } from "./useRefreshTime";
import dayjs from "dayjs";
import { useMemo } from "react";
import { useAllPrediction } from "./useAllPrediction";

export function useReservoirLevel() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { roundedTime: date } = useRefreshTime();
  const formattedDate = useMemo(() => {
    return dayjs(date).add(1, "minute").format("YYYY-MM-DD HH:mm:ss");
  }, [date]);

  const { checkLevelRisk } = useAllPrediction();

  const { data: reservoirLevels = [], isLoading, isFetching, error, refetch: loadLevels } = useQuery<ReservoirLevelType[]>({
    // 1. queryKey: date가 바뀔 때마다 자동으로 fetch
    queryKey: ["reservoirLevels", date],

    // 2. queryFn: 실제 API 호출 로직
    queryFn: async () => {
      const data = await myFetch(`${baseUrl}/reservoir/levels?date=${formattedDate}`);
      return data;
    },

    // 3. 옵션 설정
    enabled: !!date,
    staleTime: 1000 * 60 * 15, // 15분

    select: (data) => data.map(res => ({
      ...res,
      riskStatus: checkLevelRisk(res)
    })),
  });

  return { reservoirLevels, loadLevels, isLoading, isFetching, error };
}