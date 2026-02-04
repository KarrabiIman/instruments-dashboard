import type { Instrument } from '../types'
import { SAMPLE_INSTRUMENTS } from './sampleInstruments'

export interface FetchInstrumentsOptions {
  signal?: AbortSignal
  latencyMs?: number
  shouldFail?: boolean
}

export type FetchInstruments = (options?: FetchInstrumentsOptions) => Promise<Instrument[]>

const DEFAULT_LATENCY_MS = 650

export const fetchInstruments: FetchInstruments = (options) => {
  const { signal, latencyMs = DEFAULT_LATENCY_MS, shouldFail = false } = options ?? {}

  return new Promise<Instrument[]>((resolve, reject) => {
    if (signal?.aborted) {
      reject(new DOMException('Request aborted', 'AbortError'))
      return
    }

    const timer = setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Simulated API failure'))
        return
      }
      resolve([...SAMPLE_INSTRUMENTS])
    }, latencyMs)

    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        reject(new DOMException('Request aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}
