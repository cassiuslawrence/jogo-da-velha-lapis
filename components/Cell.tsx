import type { CellValue } from '@/lib/gameLogic'
import SketchX from './SketchX'
import SketchO from './SketchO'

interface CellProps {
  value: CellValue
  index: number
  onClick: () => void
  disabled: boolean
  isWinCell: boolean
}

export default function Cell({ value, index, onClick, disabled, isWinCell }: CellProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || !!value}
      aria-label={`Célula ${index + 1}, ${value ?? 'vazia'}`}
      className={`
        w-full h-full flex items-center justify-center
        transition-colors duration-200
        ${isWinCell ? 'cell-win' : !value && !disabled ? 'hover:bg-black/5' : ''}
        disabled:opacity-100 cursor-pointer disabled:cursor-default
      `}
    >
      {value === 'X' && <SketchX />}
      {value === 'O' && <SketchO />}
    </button>
  )
}
