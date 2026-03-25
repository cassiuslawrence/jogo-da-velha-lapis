import type { CellValue } from '@/lib/gameLogic'
import Cell from './Cell'

interface BoardProps {
  board: CellValue[]
  winLine: number[] | null
  onCellClick: (index: number) => void
  disabled: boolean
}

export default function Board({ board, winLine, onCellClick, disabled }: BoardProps) {
  return (
    <div className="relative w-72 h-72">
      {/* SVG grid lines — slightly wobbly bezier paths to simulate pencil */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 288 288"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Vertical line 1 (x≈96) */}
        <path
          d="M 95,5 C 96,50 94,140 97,283"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Vertical line 2 (x≈192) */}
        <path
          d="M 193,6 C 191,55 194,145 192,282"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Horizontal line 1 (y≈96) */}
        <path
          d="M 5,97 C 55,95 145,98 283,96"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Horizontal line 2 (y≈192) */}
        <path
          d="M 6,193 C 60,195 148,191 282,194"
          stroke="#4a4a4a"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Cells */}
      <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            index={index}
            onClick={() => onCellClick(index)}
            disabled={disabled}
            isWinCell={winLine?.includes(index) ?? false}
          />
        ))}
      </div>
    </div>
  )
}
