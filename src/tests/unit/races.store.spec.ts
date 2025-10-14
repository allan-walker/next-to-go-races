import { suite, test, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useRacesStore } from '@/stores/races.store'
import { RACE_CATEGORIES } from '@/types/neds'
import type { Race } from '@/types/neds'

// Mock the API composable the store calls
vi.mock('@/composables/useNedsApi', () => ({
  fetchNextRaces: vi.fn(),
}))
import { fetchNextRaces } from '@/composables/useNedsApi'

const nowMs = new Date('2025-01-01T00:00:00.000Z').getTime()
const nowSec = Math.floor(nowMs / 1000)

// Real category IDs
const HORSE_ID = '4a2788f8-e825-4d36-9894-efd4baf1cfae'
const GREYHOUND_ID = '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
const CATEGORY_IDS = Object.keys(RACE_CATEGORIES)
const ANY_ID = CATEGORY_IDS[0] ?? HORSE_ID

function makeRace(p: Partial<Race> = {}): Race {
  return {
    race_id: Math.random().toString(36).slice(2),
    meeting_name: 'Test Meeting',
    race_number: 1,
    category_id: ANY_ID,
    advertised_start: { seconds: nowSec + 300 }, // 5 minutes ahead
    ...p,
  }
}

suite('useRacesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
    vi.setSystemTime(nowMs)
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.resetAllMocks()
  })

  test('filters out races that are >60s past advertised start', () => {
    const store = useRacesStore()
    store.currentTime = nowMs

    const expired61s = makeRace({ advertised_start: { seconds: nowSec - 61 } })
    const expired60s = makeRace({ advertised_start: { seconds: nowSec - 60 } }) // still allowed
    const future = makeRace({ advertised_start: { seconds: nowSec + 10 } })

    store.raceData = [expired61s, expired60s, future]

    const ids = store.filteredSorted.map((r) => r.race_id)
    expect(ids).toContain(expired60s.race_id)
    expect(ids).toContain(future.race_id)
    expect(ids).not.toContain(expired61s.race_id)
  })

  test('sorts races by advertised_start ascending', () => {
    const store = useRacesStore()
    store.currentTime = nowMs

    const later = makeRace({ advertised_start: { seconds: nowSec + 200 } })
    const sooner = makeRace({ advertised_start: { seconds: nowSec + 100 } })
    store.raceData = [later, sooner]

    expect(store.filteredSorted.map((r) => r.race_id)).toEqual([sooner.race_id, later.race_id])
  })

  test('visibleFive returns at most 5 items from filtered & sorted', () => {
    const store = useRacesStore()
    store.currentTime = nowMs

    // ensure all categories are enabled
    store.enabledCategories = new Set(CATEGORY_IDS)

    const many = Array.from({ length: 12 }, (_, i) =>
      makeRace({
        race_number: i + 1,
        advertised_start: { seconds: nowSec + i + 1 },
        category_id: ANY_ID,
      }),
    )
    store.raceData = many

    expect(store.visibleFive.length).toBe(5)

    const first = store.visibleFive[0]
    expect(first).toBeDefined()
    expect(first!.advertised_start.seconds).toBe(nowSec + 1)
  })

  test('toggleCategory adds/removes a category id from enabledCategories', () => {
    const store = useRacesStore()
    const cat = GREYHOUND_ID

    store.enabledCategories.add(cat)
    expect(store.enabledCategories.has(cat)).toBe(true)

    store.toggleCategory(cat)
    expect(store.enabledCategories.has(cat)).toBe(false)

    store.toggleCategory(cat)
    expect(store.enabledCategories.has(cat)).toBe(true)
  })

  test('respects enabledCategories in filteredSorted', () => {
    const store = useRacesStore()
    store.currentTime = nowMs

    const horse = makeRace({ category_id: HORSE_ID, advertised_start: { seconds: nowSec + 50 } })
    const dog = makeRace({ category_id: GREYHOUND_ID, advertised_start: { seconds: nowSec + 40 } })

    store.raceData = [horse, dog]
    store.enabledCategories = new Set<string>([GREYHOUND_ID])

    const cats = new Set(store.filteredSorted.map((r) => r.category_id))
    expect(cats).toEqual(new Set([GREYHOUND_ID]))
  })

  test('tick updates currentTime using Date.now()', () => {
    const store = useRacesStore()
    vi.setSystemTime(nowMs + 5000)
    store.tick()
    expect(store.currentTime).toBe(nowMs + 5000)
  })

  test('refresh sets loading, populates raceData on success, and clears error', async () => {
    const store = useRacesStore()
    const sample = [makeRace(), makeRace({ category_id: GREYHOUND_ID })]

    ;(fetchNextRaces as unknown as ReturnType<typeof vi.fn>).mockResolvedValueOnce(sample)

    const p = store.refresh()
    expect(store.isLoading).toBe(true)
    await p

    expect(fetchNextRaces).toHaveBeenCalledWith(50)
    expect(store.isLoading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.raceData).toEqual(sample)
  })

  test('refresh sets error on failure and stops loading', async () => {
    const store = useRacesStore()
    ;(fetchNextRaces as unknown as ReturnType<typeof vi.fn>).mockRejectedValueOnce(
      new Error('boom'),
    )

    const p = store.refresh()
    expect(store.isLoading).toBe(true)
    await p

    expect(store.isLoading).toBe(false)
    expect(store.error).toBe('boom')
    expect(Array.isArray(store.raceData)).toBe(true)
  })
})
