import { describe, it, expect } from 'vitest'
import { formatCountdown } from '@/composables/useCountdown'

describe('formatCountdown', () => {
  const now = new Date('2025-01-01T00:00:00Z').getTime()

  it('returns mm:ss for upcoming races', () => {
    expect(formatCountdown(now, Math.floor(now / 1000) + 65)).toBe('1:05')
  })

  it('returns "Starting" at or after start time', () => {
    expect(formatCountdown(now, Math.floor(now / 1000))).toBe('Starting')
    expect(formatCountdown(now, Math.floor(now / 1000) - 10)).toBe('Starting')
  })

  it('returns "Closed" after 60s past start', () => {
    expect(formatCountdown(now + 61_000, Math.floor(now / 1000))).toBe('Closed')
  })
})
