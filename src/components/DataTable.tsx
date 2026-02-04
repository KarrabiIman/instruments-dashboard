import { useMemo } from 'react'
import type { SortOption, TableColumn } from '../types/Table'
import { stableSort } from '../utils/stableSort'

interface DataTableProps<T> {
  data: T[]
  columns: TableColumn<T>[]
  sortOptions: SortOption<T>[]
  activeSortId: string
  onSortChange: (sortId: string) => void
  rowKey: (row: T, index: number) => string
  rowClassName?: (row: T) => string
}

const HeaderCell = <T,>({
  column,
  isActiveSort,
  sortDirection,
}: {
  column: TableColumn<T>
  isActiveSort: boolean
  sortDirection: 'ascending' | 'descending' | 'other' | 'none'
}) => {
  return (
    <th
      scope="col"
      aria-sort={isActiveSort ? sortDirection : 'none'}
      className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 ${
        column.align === 'right'
          ? 'text-right'
          : column.align === 'center'
            ? 'text-center'
            : 'text-left'
      }`}
    >
      <span className="inline-flex items-center gap-2">{column.header}</span>
    </th>
  )
}

const TableRow = <T,>({
  row,
  columns,
  rowClassName,
}: {
  row: T
  columns: TableColumn<T>[]
  rowClassName?: (row: T) => string
}) => {
  return (
    <tr className={rowClassName?.(row)}>
      {columns.map((column) => (
        <td
          key={column.id}
          className={`px-4 py-3 text-sm text-slate-800 ${
            column.align === 'right'
              ? 'text-right'
              : column.align === 'center'
                ? 'text-center'
                : 'text-left'
          }`}
        >
          {column.cell(row)}
        </td>
      ))}
    </tr>
  )
}

const DataTable = <T,>({
  data,
  columns,
  sortOptions,
  activeSortId,
  onSortChange,
  rowKey,
  rowClassName,
}: DataTableProps<T>) => {
  const activeSort = sortOptions.find((option) => option.id === activeSortId) ?? sortOptions[0]

  const sortedData = useMemo(() => {
    if (!activeSort) return data
    return stableSort(data, activeSort.comparator)
  }, [data, activeSort])

  return (
    <div className="card-surface overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50/70 px-4 py-3">
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <span className="font-medium text-slate-700">Sort by</span>
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Sort by">
            {sortOptions.map((option) => {
              const isActive = option.id === activeSortId
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onSortChange(option.id)}
                  role="radio"
                  aria-checked={isActive}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                    isActive
                      ? 'border-slate-900 bg-slate-900 text-white'
                      : 'border-slate-300 bg-white text-slate-600 hover:border-slate-500 hover:text-slate-800'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400`}
                >
                  <span className="inline-flex items-center gap-1">
                    <span>{option.label}</span>
                    {isActive && option.direction !== 'other' ? (
                      <span
                        aria-hidden="true"
                        className="text-[10px] font-semibold leading-none text-current"
                      >
                        {option.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    ) : null}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse text-left">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <HeaderCell
                  key={column.id}
                  column={column}
                  isActiveSort={column.id === activeSort?.id}
                  sortDirection={
                    column.id === activeSort?.id
                      ? activeSort.direction === 'asc'
                        ? 'ascending'
                        : activeSort.direction === 'desc'
                          ? 'descending'
                          : 'other'
                      : 'none'
                  }
                />
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <TableRow
                key={rowKey(row, index)}
                row={row}
                columns={columns}
                rowClassName={rowClassName}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DataTable
