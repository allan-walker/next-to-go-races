# NextToGo.vue

## Purpose

Feature-level component that displays the “Next to Go Races” panel.  
Handles race data fetching, countdown updates, and category filtering using the shared Pinia store.

## Dependencies

- `useRacesStore` — provides race data, refresh, and tick logic
- `RaceList.vue` — renders race cards
- `RaceCard.vue` — individual race details
- `RaceCategoryToggle.vue` — toggles race categories
- `Panel.vue` — layout wrapper with title and actions slots

## Behavior

- Fetches races on mount via `store.refresh()`
- Polls API every 15s and updates countdowns every 1s
- Clears timers on unmount

## Props

| Name     | Type     | Default | Description               |
| -------- | -------- | ------- | ------------------------- |
| `pollMs` | `number` | `15000` | API refresh interval      |
| `tickMs` | `number` | `1000`  | Countdown update interval |

## Usage

```vue
<template>
  <NextToGo />
</template>

<!-- or with custom intervals -->
<NextToGo :pollMs="30000" :tickMs="500" />
```
