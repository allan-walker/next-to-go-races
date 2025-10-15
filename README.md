# Next To Go Races

A Vue 3 single-page application that displays “Next to Go” races using the Neds Racing API, featuring real-time countdowns, category filters, Pinia state management, and Tailwind styling.

# Screenshots
## Desktop
<img width="969" height="687" alt="Screenshot 2025-10-15 at 1 32 41 PM" src="https://github.com/user-attachments/assets/a94140c6-7f76-4c63-a45b-b2c078cd8478" />

## Mobile
<img width="394" height="666" alt="Screenshot 2025-10-15 at 1 30 00 PM" src="https://github.com/user-attachments/assets/076af6ee-6533-4589-bd8d-4055b529849b" />

# "Next To Go" Features
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
