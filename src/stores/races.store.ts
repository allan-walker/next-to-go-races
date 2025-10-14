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
  getters: {},
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
