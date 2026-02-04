# Instruments Dashboard

Single page application built with React + TypeScript + Vite + Tailwind that renders a table of financial instruments with stable sorting, client-side data fetching, and automated tests.

**Demo**

`https://instruments-dashboard.vercel.app/`

**Setup**

1. Install dependencies: `npm install`
2. Run dev server: `npm run dev`
3. Run tests: `npm run test`
4. Build for production: `npm run build`
5. Lint: `npm run lint`
6. Format: `npm run format`
7. Format check: `npm run format:check`

**Design Decisions**

- Stable sorting is handled by a reusable `stableSort` utility and comparator functions in `src/utils/stableSort.ts`.
- The table is generic (`src/components/DataTable.tsx`) with configurable columns, sorting model, and row styling to make it reusable beyond instruments.
- Data fetching is abstracted in `src/features/instruments/data/instrumentsApi.ts` with simulated latency, AbortController cancellation, and a `useInstruments` hook in `src/features/instruments/hooks/useInstruments.ts` that guards against race conditions.
- Derived data is memoized and not stored in state, keeping renders predictable and efficient.
- Accessibility includes semantic table structure, keyboard-accessible sort controls, ARIA sort attributes, and visible focus states.

**Performance Notes**

- Sorting uses memoization and stable comparators to avoid unnecessary recomputation.
- The table is structured so it can be extended with windowing for very large datasets without changing the sorting or column model.

**Security Considerations**

- The example avoids storing sensitive data on the client.
