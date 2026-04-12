'use client'

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
  soundEnabled: boolean
  onSoundToggle: () => void
}

export default function AboutModal({ isOpen, onClose, soundEnabled, onSoundToggle }: AboutModalProps) {
  if (!isOpen) return null

  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? '—'

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Bottom sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Sobre e Ajustes"
        className="fixed bottom-0 left-0 right-0 z-50 bg-paper rounded-t-2xl px-6 pt-3"
        style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 24px)' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-8 h-1 rounded-full bg-pencil-light/30 mx-auto mb-5" />

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-2xl font-bold font-handwritten text-pencil">
            Jogo da Velha
          </span>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="opacity-50 hover:opacity-90 transition-opacity"
          >
            <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M5,5 L17,17" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M17,5 L5,17" stroke="#4a4a4a" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Ajustes */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-pencil-light mb-3">Ajustes</h2>
          <div className="flex items-center justify-between">
            <span className="text-base font-handwritten text-pencil">Som</span>
            <button
              role="switch"
              aria-checked={soundEnabled}
              onClick={onSoundToggle}
              aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
              className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 border-pencil transition-colors ${soundEnabled ? 'bg-pencil' : 'bg-transparent'}`}
            >
              <span
                className={`inline-block h-4 w-4 rounded-full border border-pencil transition-transform ${soundEnabled ? 'translate-x-[22px] bg-paper' : 'translate-x-0.5 bg-pencil'}`}
              />
            </button>
          </div>
        </section>

        {/* Sobre */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-pencil-light mb-2">Sobre</h2>
          <p className="text-sm font-handwritten text-pencil-light leading-relaxed">
            Jogo da velha clássico com estética de caderno e traços de lápis. Simples, offline e sem distrações.
          </p>
        </section>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 pt-3 border-t border-pencil/10">
          <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-sm text-pencil-light">
            <a href="https://mais1app.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75 transition-opacity">Privacidade</a>
            <span aria-hidden="true">·</span>
            <a href="https://mais1app.com/terms" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75 transition-opacity">Termos</a>
            <span aria-hidden="true">·</span>
            <a href="https://mais1app.com/help-center" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75 transition-opacity">Ajuda</a>
            <span aria-hidden="true">·</span>
            <a href="https://mais1app.com/contact" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-75 transition-opacity">Contato</a>
          </div>
          <span className="text-xs text-pencil-light/60">Versão {version}</span>
        </div>
      </div>
    </>
  )
}
