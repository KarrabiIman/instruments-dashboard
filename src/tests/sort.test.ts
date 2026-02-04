import { describe, expect, it } from 'vitest'
import {
  compareAssetClass,
  comparePriceDesc,
  compareTickerAsc,
} from '../features/instruments/utils/sort'
import { stableSort } from '../utils/stableSort'
import type { Instrument } from '../features/instruments/types'

describe('sorting utilities', () => {
  it('sorts by asset class in custom order', () => {
    const data: Instrument[] = [
      { ticker: 'A', assetClass: 'Credit' },
      { ticker: 'B', assetClass: 'Equities' },
      { ticker: 'C', assetClass: 'Macro' },
    ]

    const sorted = stableSort(data, compareAssetClass)
    expect(sorted.map((row) => row.assetClass)).toEqual(['Equities', 'Macro', 'Credit'])
  })

  it('sorts by price descending, placing invalid values last', () => {
    const data: Instrument[] = [
      { ticker: 'A', price: 10 },
      { ticker: 'B', price: null },
      { ticker: 'C', price: 30 },
      { ticker: 'D', price: -5 },
    ]

    const sorted = stableSort(data, comparePriceDesc)
    expect(sorted.map((row) => row.ticker)).toEqual(['C', 'A', 'D', 'B'])
  })

  it('sorts by ticker alphabetically, handling case differences', () => {
    const data: Instrument[] = [{ ticker: 'bravo' }, { ticker: 'Alpha' }, { ticker: 'charlie' }]

    const sorted = stableSort(data, compareTickerAsc)
    expect(sorted.map((row) => row.ticker)).toEqual(['Alpha', 'bravo', 'charlie'])
  })

  it('preserves original order when values are equal (stable sort)', () => {
    const data: Instrument[] = [
      { ticker: 'AAA', price: 10 },
      { ticker: 'BBB', price: 10 },
      { ticker: 'CCC', price: 10 },
    ]

    const sorted = stableSort(data, comparePriceDesc)
    expect(sorted.map((row) => row.ticker)).toEqual(['AAA', 'BBB', 'CCC'])
  })
})
