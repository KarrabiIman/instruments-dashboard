type SortDirection = 'asc' | 'desc' | 'other'

export interface SortOption<T> {
  id: string
  label: string
  direction: SortDirection
  comparator: (left: T, right: T) => number
}

import type { ReactNode } from 'react'

export interface TableColumn<T> {
  id: string
  header: string
  cell: (row: T) => ReactNode
  align?: 'left' | 'right' | 'center'
}
