export type Race = {
  race_id: string
  meeting_name: string
  race_number: number
  category_id: string
  advertised_start: { seconds: number }
}

export const RACE_CATEGORIES = {
  '9daef0d7-bf3c-4f50-921d-8e818c60fe61': 'Greyhound',
  '161d9be2-e909-4326-8c2c-35ed71fb460b': 'Harness',
  '4a2788f8-e825-4d36-9894-efd4baf1cfae': 'Horse',
} as const
