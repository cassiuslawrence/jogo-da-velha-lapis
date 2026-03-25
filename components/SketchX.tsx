export default function SketchX() {
  return (
    <svg
      className="sketch-x w-16 h-16"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* First stroke: top-left to bottom-right, slightly curved */}
      <path
        d="M 16,16 C 28,32 50,50 64,64"
        stroke="#1a2550"
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{ '--stroke-len': '70' } as React.CSSProperties}
      />
      {/* Second stroke: top-right to bottom-left, slightly curved */}
      <path
        d="M 64,16 C 52,30 28,50 16,64"
        stroke="#1a2550"
        strokeWidth="4.5"
        strokeLinecap="round"
        style={{ '--stroke-len': '70' } as React.CSSProperties}
      />
    </svg>
  )
}
