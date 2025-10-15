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

# Project build process

This project is an example of how I build robust UI features. the steps I ttook during this build were:

## Planning & Setup

- Review brief, sketch out UI + architecture, and create acceptance criteria
- Create base Vue app scaffold using TypeScript, Tailwind, Vitest, Pinia
- Remove boilerplate (CSS, HelloWorld component, default templates)
- Add Tailwind and project-specific configuration (fonts, brand colors, utility styles)
- Add Neds font stack and import Inter font
- Update README with setup and usage notes

## API & Data Layer

- Inspect Neds API in Postman and assess data shape
- Create TypeScript types for Race and RaceCategory
- Add `useNedsApi` composable to fetch data from the API
- Add typing and filtering logic to cleanly map API results
- Build and configure Pinia store for Races
- Add actions to store for refreshing and tracking current time
- Add getters to handle filtering of valid and upcoming races
- Validate store behavior with unit tests (refresh, time-based, category filters)

## Components & UI Layer

- Create simple UI components to confirm API → store → UI pipeline
- Add RaceCard component and connect it to Pinia state
- Add props, slots, and reusability support for components like Panel
- Add CategoryToggle component for filtering
- Implement Category filtering logic
- Add Panel component for layout reuse
- Add countdown formatter and integrate with race data
- Add header, body, and brand-styled visual components (Panel, Header)
- Add responsive styling and visual state improvements for cards

## Styling & Theming

- Add custom branded theme styles (colors, utilities, type scale)
- Add responsive tweaks to optimise the design patterns for all screen sizes
- Add body styling and visual clarity updates to panels and cards
- Add race-type color indicators and other visual hierarchy improvements
- Fine-tune visual states and card focus behavior for accessibility

## Accessibility (A11y)

- Add semantic HTML structure to improve screen reader support
- Add ARIA attributes for accessibility
- Add a skip link and declare English as site language
- Add visual focus states for keyboard navigation
- Add header logo link for better navigation
- Add screen reader support for the countdown timer

## Testing & QA

- Add Vitest configuration and resolve test setup errors
- Write test suite for countdown functionality
- Add unit tests for:
  - Races Store refresh action
  - Category-related filtering functions
  - Time-based and validity filters
- Verify data flow: API → Store → Component rendering
- Confirm countdown logic updates dynamically with current time

## Possible Next Steps

- Integrate live countdown updates via `setInterval` tick
- Add loading and error states for API calls
- Implement sorting and pagination (if applicable)
- Write E2E tests (Playwright or Cypress)
- Prepare for deployment (Vite build optimization, environment variables)

# Tests
## Races Store Tests
Eight Test cases:
<img width="707" height="304" alt="Screenshot 2025-10-15 at 2 14 48 PM" src="https://github.com/user-attachments/assets/4f74ef3c-d738-4999-b5f3-187a88cfba15" />

## Countdown Tests
Three Test cases:
<img width="528" height="223" alt="Screenshot 2025-10-15 at 2 18 10 PM" src="https://github.com/user-attachments/assets/a679974b-1784-44f5-89d4-f932479dfa4d" />


