import type { Player } from '@/lib/gameLogic'

interface GameStatusProps {
  currentPlayer: Player
  winner: Player | null
  isDraw: boolean
  onNewGame: () => void
}

export default function GameStatus({ currentPlayer, winner, isDraw, onNewGame }: GameStatusProps) {
  let message: string

  if (winner) {
    message = `${winner} venceu!`
  } else if (isDraw) {
    message = 'Empate!'
  } else {
    message = `Vez do jogador ${currentPlayer}`
  }

  const gameOver = !!winner || isDraw

  return (
    <div className="flex flex-col items-center gap-3 sm:gap-4">
      <p
        role="status"
        aria-live="polite"
        className="text-xl sm:text-2xl font-semibold text-pencil"
      >
        {message}
      </p>
      {gameOver && (
        <button onClick={onNewGame} className="sketch-button text-xl">
          Novo jogo
        </button>
      )}
    </div>
  )
}
