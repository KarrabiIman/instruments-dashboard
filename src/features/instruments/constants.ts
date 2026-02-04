import type { AssetClass } from './types'

export const ASSET_CLASS_SORT_ORDER: Record<string, number> = {
  EQUITIES: 0,
  MACRO: 1,
  CREDIT: 2,
}

export const ASSET_CLASS_LABELS: Record<AssetClass, string> = {
  Equities: 'Equities',
  Macro: 'Macro',
  Credit: 'Credit',
}

export const ASSET_CLASS_CANONICAL: Record<string, AssetClass> = {
  EQUITIES: 'Equities',
  MACRO: 'Macro',
  CREDIT: 'Credit',
}

export const ROW_BACKGROUND_BY_ASSET: Record<AssetClass, string> = {
  Macro: 'bg-white',
  Equities: 'bg-blue-50',
  Credit: 'bg-emerald-50',
}

export const PRICE_COLOR = {
  positive: 'text-blue-600',
  negative: 'text-red-600',
  neutral: 'text-slate-600',
} as const

export const SORT_LABELS = {
  assetClass: 'Asset Class (Equities → Macro → Credit)',
  price: 'Price (High to Low)',
  ticker: 'Ticker (A → Z)',
} as const
