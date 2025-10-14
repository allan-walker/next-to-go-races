# Next To Go Races

A Vue 3 single-page application that displays “Next to Go” races using the Neds Racing API, featuring real-time countdowns, category filters, Pinia state management, and Tailwind styling.

# Acceptance criteria

- The app displays five upcoming races at all times, sorted by advertised start time (ascending).
- Each race shows meeting name, race number, and a live countdown timer to start.
- Races automatically disappear one minute after their advertised start time.
- Users can toggle categories (Greyhound, Harness, Horse) to filter visible races.
- Race data is fetched from the Neds “Next to Go” API and refreshed periodically.
- Countdown timers update in real-time without excessive API calls.
- The UI is responsive, accessible, and visually consistent.
- Global state is managed cleanly using Pinia for clarity and scalability.
- Codebase follows Vue 3 best practices.
- Includes unit tests for countdown logic, filtering, and sorting behavior.
- Linting and formatting conform to ESLint + Prettier standards.
- Clear README documentation explaining setup, architecture, and key design decisions.

Optional / Nice-to-haves

- Category filters persist for the session (optional enhancement).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
