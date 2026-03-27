let audioCtx: AudioContext | null = null

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext()
  return audioCtx
}

function playStroke(
  ctx: AudioContext,
  startOffset: number,
  duration: number,
  filterFreq: number,
  filterQ: number,
  gain: number,
) {
  const now = ctx.currentTime + startOffset

  // White noise buffer
  const bufferSize = Math.ceil(ctx.sampleRate * (duration + 0.05))
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1

  const source = ctx.createBufferSource()
  source.buffer = buffer

  // Bandpass filter shapes noise into pencil scratch texture
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.value = filterFreq
  filter.Q.value = filterQ

  // Amplitude envelope: fast attack, exponential decay
  const gainNode = ctx.createGain()
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(gain, now + 0.008)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  source.connect(filter)
  filter.connect(gainNode)
  gainNode.connect(ctx.destination)

  source.start(now)
  source.stop(now + duration + 0.05)
}

export function playPencilSound(player: 'X' | 'O'): void {
  try {
    const ctx = getCtx()
    if (ctx.state === 'suspended') ctx.resume()

    if (player === 'X') {
      // Two quick diagonal strokes — dry, high frequency
      // Timings mirror the CSS animation: first stroke 0.22s, second delayed 0.16s
      playStroke(ctx, 0,    0.18, 3500, 2.5, 0.14)
      playStroke(ctx, 0.16, 0.18, 4200, 2.0, 0.11)
    } else {
      // One continuous circular stroke — smoother, lower frequency
      // Mirrors the CSS animation duration: 0.38s
      playStroke(ctx, 0, 0.35, 2200, 3.5, 0.11)
    }
  } catch {
    // AudioContext unavailable (e.g. server-side render, sandboxed env) — ignore
  }
}
