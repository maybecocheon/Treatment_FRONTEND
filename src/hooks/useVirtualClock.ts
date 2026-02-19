import { virtualTimeAtom } from "@/atoms/uniAtoms";
import dayjs from "dayjs";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";

// 현재 데이터 없으므로 시뮬레이션 시 임의 시간 지정
export function useVirtualClock(baseDate = "2024-01-01T00:00:00") {
  const [time, setTime] = useAtom(virtualTimeAtom);
  const [extraMs, setExtraMs] = useState(0); // 추가된 밀리초 저장

  // 컴포넌트가 처음 마운트될 때 딱 한 번만 오프셋을 계산
  const timeOffset = useMemo(() => {
    const basePastTime = new Date(baseDate).getTime();
    return Date.now() - basePastTime;
  }, [baseDate]);

  useEffect(() => {
    // 1. 즉시 한 번 실행해서 초기 빈 문자열 지연 방지
    const updateTime = () => {
      const simulatedTime = dayjs(Date.now() - timeOffset + extraMs).format("YYYY-MM-DD HH:mm:ss");
      setTime(simulatedTime);
    };

    updateTime();

    // 2. 인터벌 설정
    const timer = setInterval(updateTime, 1000);
    
    return () => clearInterval(timer);
  }, [timeOffset, extraMs, setTime]);

  // 1시간(3600000ms)을 더하는 함수
  const addOneHour = () => setExtraMs(prev => prev + 3600000);

  return { time, addOneHour };
}