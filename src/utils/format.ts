const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
})

export const formatPrice = (value: unknown): string => {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    return '—'
  }
  return priceFormatter.format(value)
}
