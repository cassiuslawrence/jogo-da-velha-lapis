export type Player = 'X' | 'O'
export type CellValue = Player | null

export interface HistoryEntry {
  id: number
  board: CellValue[]
  winner: Player | null
  isDraw: boolean
  winLine: number[] | null
}

const WIN_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export function checkWinner(board: CellValue[]): Player | null {
  for (const [a, b, c] of WIN_PATTERNS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a] as Player
    }
  }
  return null
}

export function checkDraw(board: CellValue[]): boolean {
  return board.every((cell) => cell !== null)
}

export function getWinLine(board: CellValue[]): number[] | null {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return pattern
    }
  }
  return null
}
