export function formatCountdown(currentTime: number, startSec: number) {
  const diff = Math.floor(startSec - currentTime / 1000)
  if (diff <= -60) return 'Closed'
  if (diff <= 0) return 'Starting'

  const m = Math.floor(diff / 60)
  const s = diff % 60

  return `${m}:${String(s).padStart(2, '0')}`
}
