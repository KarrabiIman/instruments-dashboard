type Comparator<T> = (left: T, right: T) => number

export const stableSort = <T>(items: T[], comparator: Comparator<T>): T[] => {
  return items
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const result = comparator(a.item, b.item)
      return result !== 0 ? result : a.index - b.index
    })
    .map(({ item }) => item)
}
