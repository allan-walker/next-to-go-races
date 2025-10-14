import { defineStore } from 'pinia'
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
  actions: {},
})
