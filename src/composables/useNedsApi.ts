/*
//  * Fetches the "Next to Go" races from the Neds API.
//  * Returns a strictly typed array of Race objects
//  * (filtered to show only items with summaries).
//  *
//  * The default count is 50 so there is a grace buffer to always
//  * display 5 races from each category.
//  */

import type { Race } from '@/types/neds'

const BASE = '/api/neds' // dev: Vite proxy → api.neds.com.au, prod: Vercel Edge Function

type NextRacesResponse = {
  data?: {
    next_to_go_ids?: string[]
    race_summaries?: Record<string, Race | undefined>
  }
}

function withQuery(path: string, params?: Record<string, string | number>) {
  const u = new URL(path, 'http://_') // dummy base to use URLSearchParams
  if (params) for (const [k, v] of Object.entries(params)) u.searchParams.set(k, String(v))
  return `${u.pathname}${u.search}`
}

async function getJson<T>(path: string) {
  const res = await fetch(path, { headers: { accept: 'application/json' } })
  if (!res.ok) throw new Error(`Neds API error: ${res.status}`)
  return res.json() as Promise<T>
}

/**
 * Fetch "Next to Go" races and return a typed Race[]
 */
export async function fetchNextRaces(count = 50): Promise<Race[]> {
  const path = withQuery(`${BASE}/rest/v1/racing/`, { method: 'nextraces', count })
  const json = await getJson<NextRacesResponse>(path)

  const ids = json?.data?.next_to_go_ids ?? []
  const summaries = json?.data?.race_summaries ?? {}

  // Build a clean Race[] list safely
  const races: Race[] = []
  for (const id of ids) {
    const race = summaries[id]
    if (race) races.push(race)
  }
  return races
}
