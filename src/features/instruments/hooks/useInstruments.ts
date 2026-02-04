import { useCallback, useEffect, useRef, useState } from 'react'
import type { Instrument } from '../types'
import type { FetchInstruments } from '../data/instrumentsApi'
import { fetchInstruments } from '../data/instrumentsApi'

interface UseInstrumentsState {
  data: Instrument[]
  loading: boolean
  error: string | null
}

export const useInstruments = (fetcher: FetchInstruments = fetchInstruments) => {
  const [state, setState] = useState<UseInstrumentsState>({
    data: [],
    loading: true,
    error: null,
  })
  const latestRequestId = useRef(0)
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(
    async (options?: { shouldFail?: boolean }) => {
      latestRequestId.current += 1
      const requestId = latestRequestId.current

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const data = await fetcher({ signal: controller.signal, shouldFail: options?.shouldFail })
        if (latestRequestId.current === requestId) {
          setState({ data, loading: false, error: null })
        }
      } catch (error) {
        if (controller.signal.aborted || latestRequestId.current !== requestId) {
          return
        }
        const message = error instanceof Error ? error.message : 'Unknown error'
        setState({ data: [], loading: false, error: message })
      }
    },
    [fetcher],
  )

  useEffect(() => {
    load()
    return () => abortRef.current?.abort()
  }, [load])

  return {
    ...state,
    reload: load,
  }
}
