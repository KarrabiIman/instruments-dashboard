import InstrumentTable from './features/instruments/components/InstrumentTable'

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-200 text-slate-900">
      <main className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8 space-y-2">
          <p className="font-display text-sm uppercase tracking-[0.2em] text-slate-500">
            Instruments Dashboard
          </p>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Financial Instruments
          </h1>
          <p className="max-w-2xl text-slate-600">
            Sortable table of financial instruments with client-side data fetching.
          </p>
        </header>
        <InstrumentTable />
      </main>
    </div>
  )
}

export default App
