'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import type { HistoryEntry } from '@/lib/gameLogic'
import MiniBoard from './MiniBoard'

interface GameHistoryProps {
  history: HistoryEntry[]
}

function SketchArrow({ direction }: { direction: 'left' | 'right' }) {
  // Hand-drawn chevron: slightly wobbly, same pencil stroke style as the board
  const d =
    direction === 'right'
      ? 'M 4,3 C 6,7 10,11 13,15 C 10,19 6,23 4,27'
      : 'M 13,3 C 11,7 7,11 4,15 C 7,19 11,23 13,27'

  return (
    <svg viewBox="0 0 17 30" fill="none" className="w-4 h-7" aria-hidden="true">
      <path d={d} stroke="#4a4a4a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function GameHistory({ history }: GameHistoryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollStart = useRef(0)

  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 1)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
  }, [])

  // Re-check arrows whenever history changes or after mount
  useEffect(() => {
    updateArrows()
  }, [history, updateArrows])

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = true
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0)
    scrollStart.current = scrollRef.current?.scrollLeft ?? 0
    e.currentTarget.style.cursor = 'grabbing'
  }

  const onMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = false
    e.currentTarget.style.cursor = 'grab'
  }

  const onMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    isDragging.current = false
    e.currentTarget.style.cursor = 'grab'
  }

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const delta = (x - startX.current) * 1.4
    scrollRef.current.scrollLeft = scrollStart.current - delta
  }

  const scrollBy = (direction: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: direction === 'right' ? 140 : -140, behavior: 'smooth' })
  }

  if (history.length === 0) return null

  return (
    <div className="w-full border-t border-[#c8c0b0]">
      <div className="px-3 sm:px-6 py-2 sm:py-4">
        <p className="text-sm text-pencil-light mb-2 sm:mb-3">Jogos recentes</p>

        <div className="relative flex items-center gap-2">
          {/* Left arrow */}
          <button
            onClick={() => scrollBy('left')}
            aria-label="Rolar para a esquerda"
            className={`
              shrink-0 transition-opacity duration-200
              ${canScrollLeft ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <SketchArrow direction="left" />
          </button>

          {/* Scrollable strip */}
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-5 overflow-x-auto pb-1 min-w-0 flex-1 select-none"
            style={{
              scrollbarWidth: 'none',
              cursor: 'grab',
            }}
            onMouseDown={onMouseDown}
            onMouseLeave={onMouseLeave}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            onScroll={updateArrows}
            aria-label="Histórico de partidas"
          >
            {history.map((entry) => (
              <MiniBoard
                key={entry.id}
                board={entry.board}
                winner={entry.winner}
                isDraw={entry.isDraw}
                winLine={entry.winLine}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scrollBy('right')}
            aria-label="Rolar para a direita"
            className={`
              shrink-0 transition-opacity duration-200
              ${canScrollRight ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}
          >
            <SketchArrow direction="right" />
          </button>
        </div>
      </div>
    </div>
  )
}
