import type { Race } from '@/types/neds'

/*
 * Fetches the "Next to Go" races from the Neds API.
 * Returns a strictly typed array of Race objects
 * (filtered to show only items with summaries).
 *
 * The default count is 50 so there is a grace buffer to always
 * display 5 races from each category.
 */

export async function fetchNextRaces(count = 50): Promise<Race[]> {
  const res = await fetch(`https://api.neds.com.au/rest/v1/racing/?method=nextraces&count=${count}`)
  if (!res.ok) throw new Error(`Neds API error: ${res.status}`)

  const json = (await res.json()) as {
    data?: {
      next_to_go_ids?: string[]
      race_summaries?: Record<string, Race | undefined>
    }
  }

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
