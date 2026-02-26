'use client'

import { virtualTimeAtom, timeSlideAtom } from "@/atoms/uniAtoms";
import dayjs from "dayjs";
import { useAtomValue } from "jotai";
import { selectAtom } from "jotai/utils";
import { useMemo } from "react";

export function useRefreshTime() {
  const roundedTimeAtom = useMemo(() =>
    selectAtom(virtualTimeAtom, (time) => {
      if (!time) return "";
      const m = dayjs(time);
      const roundedMinutes = Math.floor(m.minute() / 15) * 15;
      return m.minute(roundedMinutes).second(0).format("YYYY-MM-DD HH:mm:ss");
    }),
    []);

  // 15분 단위 문자열 "바뀌었을 때만" 리렌더링
  const roundedTime = useAtomValue(roundedTimeAtom);

  // 타임 슬라이드 값
  const timeSlide = useAtomValue(timeSlideAtom);

  // 최종 쿼리/표시용 시간: 슬라이드 값이 있으면 슬라이드 값, 없으면 15분 단위 시간
  const displayTime = timeSlide || roundedTime;

  return { roundedTime, displayTime };
}