import type { Race } from '@/types/neds'

/*
 * Fetches the "Next to Go" races from the Neds API.
 *
 * The default count is 50 so there is a grace buffer to always
 * display 5 races from each category.
 */

export async function fetchNextRaces(count = 50): Promise<Race[]> {
  const res = await fetch(`/neds/rest/v1/racing/?method=nextraces&count=${count}`)
  if (!res.ok) throw new Error(`Neds API error: ${res.status}`)

  const json = await res.json()

  return json
}
