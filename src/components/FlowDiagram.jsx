// A tiny signature element: shows the *actual* data-flow architecture for
// each state-management approach, since that's the real subject of this task.
export default function FlowDiagram({ steps, accent }) {
  const boxW = 150;
  const boxH = 50;
  const gap = 46;
  const width = steps.length * boxW + (steps.length - 1) * gap;
  const height = boxH + 10;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, display: 'block' }}
      role="img"
      aria-label={`Data flow: ${steps.map((s) => s.label).join(' to ')}`}
    >
      <defs>
        <marker
          id={`arrow-${accent}`}
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
        </marker>
      </defs>
      {steps.map((step, i) => {
        const x = i * (boxW + gap);
        return (
          <g key={step.label}>
            <rect
              x={x}
              y={5}
              width={boxW}
              height={boxH}
              rx={9}
              fill="white"
              stroke={accent}
              strokeWidth="1.5"
            />
            <text
              x={x + boxW / 2}
              y={5 + boxH / 2 - 6}
              textAnchor="middle"
              fontFamily="JetBrains Mono, monospace"
              fontSize="11.5"
              fontWeight="600"
              fill="#1A1B23"
            >
              {step.label}
            </text>
            {step.sub && (
              <text
                x={x + boxW / 2}
                y={5 + boxH / 2 + 12}
                textAnchor="middle"
                fontFamily="Inter, sans-serif"
                fontSize="10"
                fill="#6B6E7D"
              >
                {step.sub}
              </text>
            )}
            {i < steps.length - 1 && (
              <line
                x1={x + boxW}
                y1={5 + boxH / 2}
                x2={x + boxW + gap - 6}
                y2={5 + boxH / 2}
                stroke={accent}
                strokeWidth="1.5"
                markerEnd={`url(#arrow-${accent})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
