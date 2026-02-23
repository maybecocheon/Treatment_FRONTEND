import { virtualTimeAtom } from "@/atoms/uniAtoms";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

// 현재 데이터 없으므로 시뮬레이션 시 임의 시간 지정
export function useVirtualClock(baseDate = "2024-01-02T00:00:00") {
  const [time, setTime] = useAtom(virtualTimeAtom);
  const [extraMs, setExtraMs] = useState(0);

  const timeOffset = useMemo(() => {
    const basePastTime = new Date(baseDate).getTime();
    return Date.now() - basePastTime;
  }, [baseDate]);

  // 시간을 계산하는 로직을 별도 함수로 분리
  const getSimulatedTime = (currentExtra: number) => {
    return dayjs(Date.now() - timeOffset + currentExtra).format("YYYY-MM-DD HH:mm:ss");
  };

  useEffect(() => {
    // 1초마다 업데이트
    const timer = setInterval(() => {
      setTime(getSimulatedTime(extraMs));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeOffset, extraMs, setTime]);

  const addOneHour = () => {
    const newExtra = extraMs + 3600000;
    setExtraMs(newExtra);
    setTime(getSimulatedTime(newExtra));
  };

  return { time, addOneHour };
}