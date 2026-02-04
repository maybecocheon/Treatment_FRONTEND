import { virtualTimeAtom } from "@/atoms/uniAtoms";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo } from "react";

// 현재 데이터 없으므로 시뮬레이션 시 임의 시간 지정
export function useVirtualClock(baseDate = "2023-01-06T00:00:00") {
  const [time, setTime] = useAtom(virtualTimeAtom);

  // 컴포넌트가 처음 마운트될 때 딱 한 번만 오프셋을 계산
  const timeOffset = useMemo(() => {
    const basePastTime = new Date(baseDate).getTime();
    return Date.now() - basePastTime;
  }, [baseDate]);

  useEffect(() => {
    // 1. 즉시 한 번 실행해서 초기 빈 문자열 지연 방지
    const updateTime = () => {
      const simulatedTime = dayjs(Date.now() - timeOffset).format("YYYY-MM-DD HH:mm:ss");
      setTime(simulatedTime);
    };

    updateTime();

    // 2. 인터벌 설정
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, [timeOffset]); // offset이 바뀌면 타이머 재설정

  return { time };
}

