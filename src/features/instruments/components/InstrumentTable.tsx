import { useCallback, useMemo, useState } from 'react'
import DataTable from '../../../components/DataTable'
import { useInstruments } from '../hooks/useInstruments'
import type { Instrument } from '../types'
import type { SortOption, TableColumn } from '../../../types/Table'
import {
  ASSET_CLASS_CANONICAL,
  ASSET_CLASS_LABELS,
  PRICE_COLOR,
  ROW_BACKGROUND_BY_ASSET,
  SORT_LABELS,
} from '../constants'
import { compareAssetClass, comparePriceDesc, compareTickerAsc } from '../utils/sort'
import { formatPrice } from '../../../utils/format'

const InstrumentTable = () => {
  const { data, loading, error, reload } = useInstruments()
  const [activeSortId, setActiveSortId] = useState('assetClass')

  const columns = useMemo<TableColumn<Instrument>[]>(
    () => [
      {
        id: 'ticker',
        header: 'Ticker',
        cell: (row) => <span className="font-semibold">{row.ticker ?? '—'}</span>,
      },
      {
        id: 'price',
        header: 'Price',
        align: 'right',
        cell: (row) => {
          const priceValue = typeof row.price === 'number' ? row.price : null
          const priceClass =
            priceValue === null
              ? PRICE_COLOR.neutral
              : priceValue > 0
                ? PRICE_COLOR.positive
                : priceValue < 0
                  ? PRICE_COLOR.negative
                  : PRICE_COLOR.neutral

          return <span className={`tabular-nums ${priceClass}`}>{formatPrice(row.price)}</span>
        },
      },
      {
        id: 'assetClass',
        header: 'Asset Class',
        align: 'center',
        cell: (row) => {
          const normalized =
            typeof row.assetClass === 'string' ? row.assetClass.trim().toUpperCase() : ''
          const canonical = normalized ? ASSET_CLASS_CANONICAL[normalized] : undefined
          const assetClass = canonical ?? (row.assetClass as keyof typeof ASSET_CLASS_LABELS)
          const baseClass =
            'rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600'
          const chipClass =
            assetClass === 'Macro'
              ? `${baseClass} bg-white border border-slate-200`
              : `${baseClass} bg-white/70`

          return (
            <span className={chipClass}>
              {assetClass && ASSET_CLASS_LABELS[assetClass]
                ? ASSET_CLASS_LABELS[assetClass]
                : 'Unknown'}
            </span>
          )
        },
      },
    ],
    [],
  )

  const sortOptions = useMemo<SortOption<Instrument>[]>(
    () => [
      {
        id: 'assetClass',
        label: SORT_LABELS.assetClass,
        direction: 'other',
        comparator: compareAssetClass,
      },
      {
        id: 'price',
        label: SORT_LABELS.price,
        direction: 'desc',
        comparator: comparePriceDesc,
      },
      {
        id: 'ticker',
        label: SORT_LABELS.ticker,
        direction: 'asc',
        comparator: compareTickerAsc,
      },
    ],
    [],
  )

  const rowClassName = useCallback((row: Instrument) => {
    const assetClass = row.assetClass as keyof typeof ROW_BACKGROUND_BY_ASSET
    const base = 'border-b border-slate-200 last:border-none'
    return `${base} ${
      assetClass && ROW_BACKGROUND_BY_ASSET[assetClass]
        ? ROW_BACKGROUND_BY_ASSET[assetClass]
        : 'bg-white'
    }`
  }, [])

  if (loading) {
    return (
      <section className="card-surface px-6 py-8">
        <p className="text-sm text-slate-500">Loading instruments...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section className="card-surface px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-800">Unable to load instruments</p>
            <p className="text-sm text-slate-500">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => reload()}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:border-slate-500 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
          >
            Retry
          </button>
        </div>
      </section>
    )
  }

  if (data.length === 0) {
    return (
      <section className="card-surface px-6 py-8">
        <p className="text-sm text-slate-500">No instruments available.</p>
      </section>
    )
  }

  return (
    <section className="space-y-4">
      <DataTable
        data={data}
        columns={columns}
        sortOptions={sortOptions}
        activeSortId={activeSortId}
        onSortChange={setActiveSortId}
        rowKey={(row, index) => `${row.ticker ?? 'unknown'}-${index}`}
        rowClassName={rowClassName}
      />
    </section>
  )
}

export default InstrumentTable
