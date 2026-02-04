import { ASSET_CLASS_SORT_ORDER } from '../constants'
import type { Instrument } from '../types'

type Comparator<T> = (left: T, right: T) => number

const normalizeString = (value: unknown) =>
  typeof value === 'string' ? value.trim().toUpperCase() : ''

const toNumber = (value: unknown) =>
  typeof value === 'number' && Number.isFinite(value) ? value : null

export const compareTickerAsc: Comparator<Instrument> = (left, right) => {
  const leftValue = normalizeString(left.ticker)
  const rightValue = normalizeString(right.ticker)

  if (!leftValue && !rightValue) return 0
  if (!leftValue) return 1
  if (!rightValue) return -1

  return leftValue.localeCompare(rightValue)
}

export const comparePriceDesc: Comparator<Instrument> = (left, right) => {
  const leftValue = toNumber(left.price)
  const rightValue = toNumber(right.price)

  if (leftValue === null && rightValue === null) return 0
  if (leftValue === null) return 1
  if (rightValue === null) return -1

  return rightValue - leftValue
}

export const compareAssetClass: Comparator<Instrument> = (left, right) => {
  const leftKey = normalizeString(left.assetClass)
  const rightKey = normalizeString(right.assetClass)

  const leftOrder = ASSET_CLASS_SORT_ORDER[leftKey]
  const rightOrder = ASSET_CLASS_SORT_ORDER[rightKey]

  const leftValue = typeof leftOrder === 'number' ? leftOrder : Number.MAX_SAFE_INTEGER
  const rightValue = typeof rightOrder === 'number' ? rightOrder : Number.MAX_SAFE_INTEGER

  return leftValue - rightValue
}
