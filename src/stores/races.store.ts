import { defineStore } from 'pinia'
import { fetchNextRaces } from '@/composables/useNedsApi'
import { RACE_CATEGORIES } from '@/types/neds'
import type { Race } from '@/types/neds'

export const useRacesStore = defineStore('races', {
  state: () => ({
    raceData: [] as Race[],
    enabledRaces: new Set<string>(Object.keys(RACE_CATEGORIES)),
    currentTime: Date.now(),
    isLoading: false,
    error: null as string | null,
  }),
  getters: {
    /**
     * Returns all valid races that:
     *  - belong to one of the currently enabled race categories
     *  - have not expired (within 60 seconds past their advertised start)
     *  - are sorted by advertised start time (ascending)
     *
     * This getter ensures the UI always works with a clean, time-ordered
     * subset of current races that should still be visible to the user.
     */
    filteredSorted(state): Race[] {
      const nowSec = Math.floor(state.currentTime / 1000)
      return state.raceData
        .filter((r) => state.enabledRaces.has(r.category_id))
        .filter((r) => nowSec <= r.advertised_start.seconds + 60)
        .sort((a, b) => a.advertised_start.seconds - b.advertised_start.seconds)
    },
    /**
     * Returns the first five races from the filtered & sorted list.
     *
     * This represents the "Next to Go" set shown in the UI.
     * If fewer than five valid races are available, returns all that qualify.
     */
    visibleFive(): Race[] {
      return this.filteredSorted.slice(0, 5)
    },
  },
  actions: {
    tick() {
      this.currentTime = Date.now()
    },
    async refresh() {
      this.isLoading = true
      this.error = null
      try {
        this.raceData = await fetchNextRaces(50)
      } catch (e: any) {
        this.error = e?.message ?? 'Fetch failed'
      } finally {
        this.isLoading = false
      }
    },
  },
})
