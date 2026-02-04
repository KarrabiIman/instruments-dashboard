import { describe, expect, it, vi } from 'vitest'
import { act, renderHook, waitFor } from '@testing-library/react'
import type { Instrument } from '../features/instruments/types'
import { useInstruments } from '../features/instruments/hooks/useInstruments'

const createDeferred = <T,>() => {
  let resolve!: (value: T) => void
  let reject!: (reason?: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('useInstruments', () => {
  it('applies only the latest request when responses resolve out of order', async () => {
    const first = createDeferred<Instrument[]>()
    const second = createDeferred<Instrument[]>()
    const fetcher = vi
      .fn()
      .mockImplementationOnce(() => first.promise)
      .mockImplementationOnce(() => second.promise)

    const { result } = renderHook(() => useInstruments(fetcher))

    act(() => {
      result.current.reload()
    })

    await act(async () => {
      second.resolve([{ ticker: 'LATEST', price: 1, assetClass: 'Equities' }])
    })

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
      expect(result.current.data[0]?.ticker).toBe('LATEST')
    })

    await act(async () => {
      first.resolve([{ ticker: 'STALE', price: 2, assetClass: 'Macro' }])
    })

    expect(result.current.data[0]?.ticker).toBe('LATEST')
  })
})
