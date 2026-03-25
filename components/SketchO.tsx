export default function SketchO() {
  return (
    <svg
      className="sketch-o w-16 h-16"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/*
        Imperfect circle via cubic bezier — slightly irregular to look hand-drawn.
        The path starts at top-center and traces clockwise, not quite closing perfectly.
      */}
      <path
        d="M 40,14 C 58,12 68,24 67,40 C 66,56 54,67 40,67 C 26,67 13,56 13,40 C 13,24 22,12 40,14"
        stroke="#4a1a1a"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
