import { Point } from "framer-motion";

interface FlowingLineProps {
  start: Point;
  end: Point;
}

export default function FlowingLine({ start, end }: FlowingLineProps) {
  const midY = start.y + 40;
  const pathData = `M ${start.x} ${start.y} L ${start.x} ${midY} L ${end.x} ${midY} L ${end.x} ${end.y}`;

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