export type AssetClass = 'Equities' | 'Macro' | 'Credit'

export interface Instrument {
  ticker?: string | null
  price?: number | null
  assetClass?: AssetClass | string | null
}
