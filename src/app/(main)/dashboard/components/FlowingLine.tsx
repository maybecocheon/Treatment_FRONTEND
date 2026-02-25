import { Point } from "framer-motion";

interface FlowingLineProps {
  start: Point;
  end: Point;
}

export default function FlowingLine({ start, end }: FlowingLineProps) {
  const getPathData = (start: Point, end: Point) => {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const isMobile = window.innerWidth < 1024;

    if (isMobile) {
      // 가로 방향 곡선 (왼쪽 중앙에 닿을 때)
      const cp1x = start.x + deltaX * 0.5;
      const cp1y = start.y;
      const cp2x = end.x - deltaX * 0.5;
      const cp2y = end.y;
      return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
    } else {
      // 세로 방향 곡선
      const cp1x = start.x;
      const cp1y = start.y + deltaY * 0.5;
      const cp2x = end.x;
      const cp2y = end.y - deltaY * 0.5;
      return `M ${start.x} ${start.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${end.x} ${end.y}`;
    }
  };

  const pathData = getPathData(start, end);

  return (
    <g>
      {/* 1. 배경 점선 */}
      <path
        d={pathData}
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="2"
        strokeDasharray="4 4"
        className="opacity-40"
      />

      {/* 2. 흐르는 물줄기 애니메이션 */}
      <path
        d={pathData}
        fill="none"
        stroke="#3b82f6"
        strokeWidth="3"
        strokeDasharray="10 20"
        strokeLinecap="round"
        className="opacity-60"
        style={{
          animation: 'flow 2s linear infinite'
        }}
      />

      {/* 3. 물방울 입자 애니메이션 */}
      <circle r="3" fill="#3b82f6">
        <animateMotion
          dur="2.5s"
          repeatCount="indefinite"
          path={pathData}
          rotate="auto"
        />
      </circle>

    </g>
  );
};