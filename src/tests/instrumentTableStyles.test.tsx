import { beforeEach, describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import InstrumentTable from '../features/instruments/components/InstrumentTable'
import type { Instrument } from '../features/instruments/types'

const mockUseInstruments = vi.fn()

vi.mock('../features/instruments/hooks/useInstruments', () => ({
  useInstruments: () => mockUseInstruments(),
}))

describe('InstrumentTable styling', () => {
  beforeEach(() => {
    mockUseInstruments.mockReturnValue({
      data: [
        { ticker: 'ALPHA', price: 10, assetClass: 'Equities' },
        { ticker: 'BRAVO', price: -5, assetClass: 'Credit' },
        { ticker: 'CHARLIE', price: 0, assetClass: 'Macro' },
      ] as Instrument[],
      loading: false,
      error: null,
      reload: vi.fn(),
    })
  })

  it('applies row background and price color rules', () => {
    render(<InstrumentTable />)

    const rows = screen.getAllByRole('row')
    const bodyRows = rows.slice(1)

    expect(bodyRows[0]).toHaveClass('bg-blue-50')
    expect(bodyRows[1]).toHaveClass('bg-white')
    expect(bodyRows[2]).toHaveClass('bg-emerald-50')

    const [rowOne, rowTwo, rowThree] = bodyRows
    expect(within(rowOne).getByText('$10.00')).toHaveClass('text-blue-600')
    expect(within(rowTwo).getByText('$0.00')).toHaveClass('text-slate-600')
    expect(within(rowThree).getByText('-$5.00')).toHaveClass('text-red-600')
  })
})
