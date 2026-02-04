import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import InstrumentTable from '../features/instruments/components/InstrumentTable'

const mockUseInstruments = vi.fn()

vi.mock('../features/instruments/hooks/useInstruments', () => ({
  useInstruments: () => mockUseInstruments(),
}))

describe('InstrumentTable states', () => {
  it('renders loading state', () => {
    mockUseInstruments.mockReturnValue({
      data: [],
      loading: true,
      error: null,
      reload: vi.fn(),
    })

    render(<InstrumentTable />)
    expect(screen.getByText('Loading instruments...')).toBeInTheDocument()
  })

  it('renders error state', () => {
    mockUseInstruments.mockReturnValue({
      data: [],
      loading: false,
      error: 'Network error',
      reload: vi.fn(),
    })

    render(<InstrumentTable />)
    expect(screen.getByText('Unable to load instruments')).toBeInTheDocument()
    expect(screen.getByText('Network error')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Retry' })).toBeInTheDocument()
  })

  it('renders empty state', () => {
    mockUseInstruments.mockReturnValue({
      data: [],
      loading: false,
      error: null,
      reload: vi.fn(),
    })

    render(<InstrumentTable />)
    expect(screen.getByText('No instruments available.')).toBeInTheDocument()
  })
})
