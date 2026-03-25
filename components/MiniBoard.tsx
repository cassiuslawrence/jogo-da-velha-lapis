import type { CellValue, Player } from '@/lib/gameLogic'

interface MiniBoardProps {
  board: CellValue[]
  winner: Player | null
  isDraw: boolean
  winLine: number[] | null
}

function MiniX() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sketch-x" aria-hidden="true">
      <path
        d="M 5,5 C 8,9 14,15 19,19"
        stroke="#1a2550"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ '--stroke-len': '22' } as React.CSSProperties}
      />
      <path
        d="M 19,5 C 15,9 9,15 5,19"
        stroke="#1a2550"
        strokeWidth="2.5"
        strokeLinecap="round"
        style={{ '--stroke-len': '22' } as React.CSSProperties}
      />
    </svg>
  )
}

function MiniO() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 sketch-o" aria-hidden="true">
      <path
        d="M 12,4 C 18,3.5 20.5,7 20,12 C 19.5,17 16,21 12,21 C 8,21 3.5,17 4,12 C 4.5,7 6,4.5 12,4"
        stroke="#4a1a1a"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        style={{ '--stroke-len': '55' } as React.CSSProperties}
      />
    </svg>
  )
}

export default function MiniBoard({ board, winner, isDraw, winLine }: MiniBoardProps) {
  const label = winner ? `${winner} venceu` : isDraw ? 'Empate' : ''

  return (
    <div className="flex flex-col items-center gap-1.5 shrink-0">
      {/* Mini tabuleiro */}
      <div className="relative w-20 h-20">
        {/* Grade SVG torta em miniatura */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 80 80"
          fill="none"
          aria-hidden="true"
        >
          <path d="M 26,2 C 27,18 25,50 27,78" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 54,2 C 53,20 55,48 54,78" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 2,26 C 18,25 48,27 78,26" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M 2,54 C 20,55 48,53 78,55" stroke="#4a4a4a" strokeWidth="1.2" strokeLinecap="round" />
        </svg>

        {/* Células */}
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {board.map((value, i) => (
            <div
              key={i}
              className={`flex items-center justify-center ${winLine?.includes(i) ? 'cell-win' : ''}`}
            >
              {value === 'X' && <MiniX />}
              {value === 'O' && <MiniO />}
            </div>
          ))}
        </div>
      </div>

      {/* Rótulo do resultado */}
      <span className="text-sm text-pencil-light leading-none">{label}</span>
    </div>
  )
}
