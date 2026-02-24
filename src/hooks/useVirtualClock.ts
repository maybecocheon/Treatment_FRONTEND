'use client'

import { virtualTimeAtom } from "@/atoms/uniAtoms";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";

export function useVirtualClock(baseDate = "2024-01-02 00:00:00") {
  const [time, setTime] = useAtom(virtualTimeAtom);
  const [extraMs, setExtraMs] = useState<number>(0); // 시간을 더하거나 뺀 오프셋 저장
  const queryClient = useQueryClient();
  const lastRefreshedMinute = useRef<number>(-1);

  const timeOffset = useMemo(() => {
    const basePastTime = new Date(baseDate).getTime();
    return Date.now() - basePastTime;
  }, [baseDate]);

  // 보정된 현재 가상 시간 계산
  const getSimulatedTime = (currentExtra: number): string => {
    return dayjs(Date.now() - timeOffset + currentExtra).format("YYYY-MM-DD HH:mm:ss");
  };

  // 1초마다 가상 시계 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getSimulatedTime(extraMs));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOffset, extraMs, setTime]);

  // 1시간 추가 기능
  const addOneHour = () => {
    setExtraMs(prev => prev + 3600000);

    // 시간 점프 시 캐시 무효화
    queryClient.invalidateQueries({
        predicate: (query) =>
          !query.queryKey.includes("facilities") && // 시설 목록 제외
          !query.queryKey.includes("userProfile")   // 유저 프로필 제외
      });
  };

  // 정각 감시 (0, 15, 30, 45분)
  useEffect(() => {
    if (!time) return;

    const now = dayjs(time);
    const min = now.minute();
    const sec = now.second();

    if (min % 15 === 0 && sec === 0 && lastRefreshedMinute.current !== min) {
      queryClient.invalidateQueries({
        predicate: (query) =>
          !query.queryKey.includes("facilities") && // 시설 목록 제외
          !query.queryKey.includes("userProfile")   // 유저 프로필 제외
      });
      lastRefreshedMinute.current = min;
    }
  }, [time, queryClient]);

  return { time, addOneHour };
}