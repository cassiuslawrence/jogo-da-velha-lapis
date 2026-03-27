'use client'

import { useReducer, useEffect, useState } from 'react'
import type { CellValue, Player, HistoryEntry } from '@/lib/gameLogic'
import { checkWinner, checkDraw, getWinLine } from '@/lib/gameLogic'
import ScoreBoard from './ScoreBoard'
import Board from './Board'
import GameStatus from './GameStatus'
import GameHistory from './GameHistory'
import { playPencilSound } from '@/lib/sounds'

const SESSION_KEY = 'jdv-game-history'
const MAX_HISTORY = 10

interface GameState {
  board: CellValue[]
  currentPlayer: Player
  nextStarter: Player
  winner: Player | null
  isDraw: boolean
  winLine: number[] | null
  score: { X: number; O: number; draws: number }
  history: HistoryEntry[]
}

type GameAction =
  | { type: 'PLAY_CELL'; index: number }
  | { type: 'NEW_GAME' }
  | { type: 'RESET_ALL' }
  | { type: 'LOAD_HISTORY'; history: HistoryEntry[] }

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  nextStarter: 'O',  // first game starts with X, so next starts with O
  winner: null,
  isDraw: false,
  winLine: null,
  score: { X: 0, O: 0, draws: 0 },
  history: [],
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PLAY_CELL': {
      if (state.board[action.index] || state.winner || state.isDraw) return state

      const newBoard = [...state.board]
      newBoard[action.index] = state.currentPlayer

      const winner = checkWinner(newBoard)
      const isDraw = !winner && checkDraw(newBoard)
      const winLine = winner ? getWinLine(newBoard) : null

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        isDraw,
        winLine,
        score: winner
          ? { ...state.score, [winner]: state.score[winner] + 1 }
          : isDraw
          ? { ...state.score, draws: state.score.draws + 1 }
          : state.score,
      }
    }
    case 'NEW_GAME': {
      // Only save to history if the game actually ended
      const gameEnded = !!state.winner || state.isDraw
      const newHistory = gameEnded
        ? [
            {
              id: Date.now(),
              board: state.board,
              winner: state.winner,
              isDraw: state.isDraw,
              winLine: state.winLine,
            },
            ...state.history,
          ].slice(0, MAX_HISTORY)
        : state.history

      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: state.nextStarter,
        nextStarter: state.nextStarter === 'X' ? 'O' : 'X',
        winner: null,
        isDraw: false,
        winLine: null,
        history: newHistory,
      }
    }
    case 'RESET_ALL':
      return { ...initialState, nextStarter: 'X' }
    case 'LOAD_HISTORY':
      return { ...state, history: action.history }
    default:
      return state
  }
}

export default function GameClient() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [hydrated, setHydrated] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  const handleReset = () => {
    dispatch({ type: 'RESET_ALL' })
    try { sessionStorage.removeItem(SESSION_KEY) } catch { /* ignore */ }
    setConfirming(false)
  }

  // Load history from sessionStorage on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY)
      if (saved) {
        const history = JSON.parse(saved) as HistoryEntry[]
        dispatch({ type: 'LOAD_HISTORY', history })
      }
    } catch {
      // sessionStorage unavailable or corrupted — ignore
    }
    setHydrated(true)
  }, [])

  // Persist history to sessionStorage whenever it changes
  useEffect(() => {
    if (!hydrated) return
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state.history))
    } catch {
      // sessionStorage unavailable — ignore
    }
  }, [state.history, hydrated])

  const gameOver = !!state.winner || state.isDraw

  return (
    <div className="flex flex-col min-h-screen">

      {/* Top bar — reset (left) and sound toggle (right) */}
      <div className="flex justify-between items-start px-3 pt-3 sm:px-5 sm:pt-4">

        {/* Reiniciar tudo — top left */}
        <div className="flex flex-col gap-1.5">
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              className="text-sm text-pencil-light opacity-50 hover:opacity-90 transition-opacity underline underline-offset-2"
            >
              Reiniciar tudo
            </button>
          ) : (
            <div className="flex flex-col gap-1.5">
              <span className="text-sm text-pencil-light">Apagar tudo?</span>
              <div className="flex gap-3">
                <button onClick={handleReset} className="sketch-button text-sm">Sim</button>
                <button onClick={() => setConfirming(false)} className="sketch-button text-sm">Não</button>
              </div>
            </div>
          )}
        </div>

        {/* Som — top right */}
        <button
          onClick={() => setSoundEnabled(e => !e)}
          aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
          className="opacity-50 hover:opacity-90 transition-opacity"
        >
          {soundEnabled ? (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M3,8 L7,8 L12,4.5 L12,17.5 L7,14 L3,14 Z" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15,9 C16.5,10 16.5,12 15,13" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </svg>
          ) : (
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M3,8 L7,8 L12,4.5 L12,17.5 L7,14 L3,14 Z" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15,9 L18,13" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M18,9 L15,13" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      <main className="flex flex-1 items-start justify-center pt-2 px-3 pb-3 sm:items-center sm:p-6">
        <div className="flex flex-col items-center gap-2 sm:gap-6">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-wide text-pencil">Jogo da Velha</h1>
          <ScoreBoard score={state.score} />
          <Board
            board={state.board}
            winLine={state.winLine}
            onCellClick={(index) => {
              if (state.board[index] || state.winner || state.isDraw) return
              if (soundEnabled) playPencilSound(state.currentPlayer)
              dispatch({ type: 'PLAY_CELL', index })
            }}
            disabled={gameOver}
          />
          <GameStatus
            currentPlayer={state.currentPlayer}
            winner={state.winner}
            isDraw={state.isDraw}
            onNewGame={() => dispatch({ type: 'NEW_GAME' })}
          />
        </div>
      </main>

      <GameHistory history={state.history} />
    </div>
  )
}
