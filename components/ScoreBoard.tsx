interface ScoreBoardProps {
  score: { X: number; O: number; draws: number }
}

export default function ScoreBoard({ score }: ScoreBoardProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs" aria-live="polite">
      <div className="flex gap-8 text-center w-full">
        <div className="flex-1">
          <div className="text-3xl font-bold text-sketch-x">{score.X}</div>
          <div className="text-lg text-pencil-light">X</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-pencil">{score.draws}</div>
          <div className="text-lg text-pencil-light">Empate</div>
        </div>
        <div className="flex-1">
          <div className="text-3xl font-bold text-sketch-o">{score.O}</div>
          <div className="text-lg text-pencil-light">O</div>
        </div>
      </div>
      {/* Decorative wobbly underline */}
      <svg
        viewBox="0 0 240 8"
        className="w-full"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M 2,4 C 40,2 80,6 120,4 C 160,2 200,6 238,4"
          stroke="#4a4a4a"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}
